import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
class TestAuthRegister:
    """Tests for POST /api/v1/auth/register endpoint."""
    
    async def test_register_creates_user_and_returns_token(self, async_client: AsyncClient):
        """Test that registration creates a user and returns an access token."""
        response = await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "test@example.com",
                "password": "testpassword123",
                "username": "user1"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert isinstance(data["access_token"], str)
        assert len(data["access_token"]) > 0
    
    async def test_register_duplicate_email_returns_409(self, async_client: AsyncClient):
        """Test that registering with a duplicate email returns 409."""
        # First registration
        await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "duplicate@example.com",
                "password": "testpassword123",
                "username": "user2"
            }
        )
        
        # Second registration with same email
        response = await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "duplicate@example.com",
                "password": "anotherpassword123",
                "username": "user3"
            }
        )
        
        assert response.status_code == 409
        data = response.json()
        assert "detail" in data
        assert "already registered" in data["detail"].lower()


@pytest.mark.asyncio
class TestAuthLogin:
    """Tests for POST /api/v1/auth/login endpoint."""
    
    async def test_login_correct_credentials_returns_token(self, async_client: AsyncClient):
        """Test that login with correct credentials returns a token."""
        # First register a user
        await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "login@example.com",
                "password": "correctpassword123",
                "username": "user4"
            }
        )
        
        # Then login
        response = await async_client.post(
            "/api/v1/auth/login",
            json={
                "email": "login@example.com",
                "password": "correctpassword123"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert isinstance(data["access_token"], str)
        assert len(data["access_token"]) > 0
    
    async def test_login_wrong_password_returns_401(self, async_client: AsyncClient):
        """Test that login with wrong password returns 401."""
        # First register a user
        await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "wrongpass@example.com",
                "password": "correctpassword123",
                "username": "user5"
            }
        )
        
        # Then login with wrong password
        response = await async_client.post(
            "/api/v1/auth/login",
            json={
                "email": "wrongpass@example.com",
                "password": "wrongpassword123"
            }
        )
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert "invalid" in data["detail"].lower() or "credential" in data["detail"].lower()
    
    async def test_login_nonexistent_user_returns_401(self, async_client: AsyncClient):
        """Test that login with non-existent user returns 401."""
        response = await async_client.post(
            "/api/v1/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "somepassword123"
            }
        )
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert "invalid" in data["detail"].lower() or "credential" in data["detail"].lower()


@pytest.mark.asyncio
class TestAuthMe:
    """Tests for GET /api/v1/auth/me endpoint."""
    
    async def test_me_valid_token_returns_user_public_fields(self, async_client: AsyncClient):
        """Test that /me endpoint with valid token returns user public fields."""
        # Register and get token
        register_response = await async_client.post(
            "/api/v1/auth/register",
            json={
                "email": "me@example.com",
                "password": "testpassword123",
                "username": "user6"
            }
        )
        token = register_response.json()["access_token"]
        
        # Call /me endpoint
        response = await async_client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Check that public fields are present
        assert "id" in data
        assert "email" in data
        assert data["email"] == "me@example.com"
        assert "auth_provider" in data
        assert "created_at" in data
        
        # Check that password_hash is NOT exposed
        assert "password_hash" not in data
        assert "password" not in data
    
    async def test_me_missing_token_returns_401(self, async_client: AsyncClient):
        """Test that /me endpoint without token returns 401."""
        response = await async_client.get("/api/v1/auth/me")
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
    
    async def test_me_invalid_token_returns_401(self, async_client: AsyncClient):
        """Test that /me endpoint with invalid token returns 401."""
        response = await async_client.get(
            "/api/v1/auth/me",
            headers={"Authorization": "Bearer invalid_token_12345"}
        )
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert "invalid" in data["detail"].lower() or "expired" in data["detail"].lower()
    
