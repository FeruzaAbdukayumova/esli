import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

import bcrypt
from jose import jwt

from app.core.config import settings


def hash_password(password: str) -> str:
    # Bcrypt has a 72-byte limit, so we need to truncate if necessary
    # Convert to bytes and truncate to 72 bytes max
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    # Hash the password using bcrypt
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    # Bcrypt has a 72-byte limit, so we need to truncate if necessary
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    # Verify the password
    hash_bytes = password_hash.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hash_bytes)


def create_access_token(subject: str, password_hash: str | None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    # pwf ties the token to the current password: changing it kills old access tokens
    payload: dict[str, Any] = {"sub": subject, "exp": expire, "pwf": _password_fingerprint(password_hash)}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)


def generate_refresh_token() -> str:
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


PASSWORD_RESET_EXPIRE_MINUTES = 60


def _password_fingerprint(password_hash: str | None) -> str:
    # Bound into the reset token so it stops working once the password changes
    # (single-use without storing anything).
    return hashlib.sha256((password_hash or "").encode("utf-8")).hexdigest()[:16]


def create_password_reset_token(user_id: str, password_hash: str | None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=PASSWORD_RESET_EXPIRE_MINUTES)
    payload: dict[str, Any] = {
        "sub": user_id,
        "exp": expire,
        "purpose": "password_reset",
        "pwf": _password_fingerprint(password_hash),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)


def read_password_reset_token(token: str) -> tuple[str, str] | None:
    """Return (user_id, password fingerprint) or None if invalid/expired."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
    except Exception:
        return None
    if payload.get("purpose") != "password_reset" or not payload.get("sub"):
        return None
    return payload["sub"], payload.get("pwf", "")


def password_fingerprint_matches(password_hash: str | None, fingerprint: str) -> bool:
    return secrets.compare_digest(_password_fingerprint(password_hash), fingerprint)


def access_token_matches_password(payload: dict[str, Any], password_hash: str | None) -> bool:
    """False once the password changed after the token was issued.

    Tokens minted before pwf existed have no claim and expire on their own.
    """
    pwf = payload.get("pwf")
    return pwf is None or password_fingerprint_matches(password_hash, pwf)
