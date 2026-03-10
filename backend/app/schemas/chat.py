import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class ChatConversationCreate(BaseModel):
    guest_id: str | None = Field(None, max_length=36)


class ChatMessageSend(BaseModel):
    content: str = Field(min_length=1, max_length=5000)
    guest_id: str | None = Field(None, max_length=36)


class ChatConversationUpdate(BaseModel):
    status: str = Field(pattern=r"^(open|closed)$")


class ChatMessageResponse(BaseModel):
    id: uuid.UUID
    conversation_id: uuid.UUID
    role: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatConversationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID | None
    guest_id: str | None
    type: str
    status: str
    created_at: datetime
    updated_at: datetime
    last_message: ChatMessageResponse | None = None

    model_config = {"from_attributes": True}
