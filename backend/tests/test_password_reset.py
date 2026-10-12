import asyncio
from urllib.parse import parse_qs, urlparse

import pytest
from httpx import AsyncClient

from app.api.v1.routes import auth as auth_routes


@pytest.fixture
def sent_emails(monkeypatch):
    """Capture reset emails instead of sending them."""
    sent: list[tuple[str, str]] = []

    async def fake_send(to: str, reset_url: str) -> bool:
        sent.append((to, reset_url))
        return True

    monkeypatch.setattr(auth_routes, "send_password_reset_email", fake_send)
    auth_routes._last_reset_email.clear()
    return sent


async def _register(client: AsyncClient, email: str, username: str, password: str = "oldpassword123"):
    resp = await client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": password, "username": username},
    )
    assert resp.status_code == 200


async def _request_token(client: AsyncClient, email: str, sent: list) -> str:
    resp = await client.post("/api/v1/auth/forgot-password", json={"email": email})
    assert resp.status_code == 204
    await asyncio.sleep(0)  # let the fire-and-forget send run
    assert sent, "no reset email captured"
    return parse_qs(urlparse(sent[-1][1]).query)["token"][0]


@pytest.mark.asyncio
class TestPasswordReset:
    async def test_full_reset_flow(self, async_client: AsyncClient, sent_emails):
        await _register(async_client, "reset@example.com", "resetuser")
        token = await _request_token(async_client, "reset@example.com", sent_emails)
        assert sent_emails[-1][0] == "reset@example.com"

        resp = await async_client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": "newpassword456"},
        )
        assert resp.status_code == 200
        assert resp.json()["access_token"]

        old = await async_client.post(
            "/api/v1/auth/login", json={"email": "reset@example.com", "password": "oldpassword123"}
        )
        assert old.status_code == 401
        new = await async_client.post(
            "/api/v1/auth/login", json={"email": "reset@example.com", "password": "newpassword456"}
        )
        assert new.status_code == 200

    async def test_token_is_single_use(self, async_client: AsyncClient, sent_emails):
        await _register(async_client, "once@example.com", "onceuser")
        token = await _request_token(async_client, "once@example.com", sent_emails)
        first = await async_client.post(
            "/api/v1/auth/reset-password", json={"token": token, "new_password": "firstnew123"}
        )
        assert first.status_code == 200
        second = await async_client.post(
            "/api/v1/auth/reset-password", json={"token": token, "new_password": "secondnew123"}
        )
        assert second.status_code == 400

    async def test_unknown_email_still_returns_204_and_sends_nothing(self, async_client: AsyncClient, sent_emails):
        resp = await async_client.post("/api/v1/auth/forgot-password", json={"email": "nobody@example.com"})
        assert resp.status_code == 204
        await asyncio.sleep(0)
        assert sent_emails == []

    async def test_garbage_token_rejected(self, async_client: AsyncClient, sent_emails):
        resp = await async_client.post(
            "/api/v1/auth/reset-password", json={"token": "not-a-token", "new_password": "whatever123"}
        )
        assert resp.status_code == 400

    async def test_reset_token_is_not_an_access_token(self, async_client: AsyncClient, sent_emails):
        await _register(async_client, "scope@example.com", "scopeuser")
        token = await _request_token(async_client, "scope@example.com", sent_emails)
        resp = await async_client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert resp.status_code == 401

    async def test_short_password_rejected(self, async_client: AsyncClient, sent_emails):
        await _register(async_client, "short@example.com", "shortuser")
        token = await _request_token(async_client, "short@example.com", sent_emails)
        resp = await async_client.post(
            "/api/v1/auth/reset-password", json={"token": token, "new_password": "short"}
        )
        assert resp.status_code == 422


@pytest.mark.asyncio
class TestGuestRateLimitIp:
    async def test_uses_cloudflare_client_ip(self):
        from starlette.requests import Request

        from app.api.v1.routes.ai import _client_ip

        def make(headers: dict[str, str]) -> Request:
            return Request({
                "type": "http",
                "headers": [(k.encode(), v.encode()) for k, v in headers.items()],
                "client": ("10.0.0.1", 1234),
            })

        # Via Cloudflare: Railway's proxy appended a Cloudflare IP, so trust CF-Connecting-IP
        assert _client_ip(make({"cf-connecting-ip": "1.2.3.4", "x-forwarded-for": "162.158.1.1"})) == "1.2.3.4"
        # Direct hit on the Railway domain with a forged CF header: use the real peer
        assert _client_ip(make({"cf-connecting-ip": "1.2.3.4", "x-forwarded-for": "5.6.7.8"})) == "5.6.7.8"
        # Forged left-most X-Forwarded-For entries are ignored
        assert _client_ip(make({"x-forwarded-for": "1.1.1.1, 2.2.2.2, 5.6.7.8"})) == "5.6.7.8"
        assert _client_ip(make({})) == "10.0.0.1"
