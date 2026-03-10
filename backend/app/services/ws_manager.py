import json
import uuid
import logging

from fastapi import WebSocket

logger = logging.getLogger(__name__)


class ConnectionManager:
    """Manages WebSocket connections grouped by conversation_id."""

    def __init__(self):
        self.active_connections: dict[uuid.UUID, set[WebSocket]] = {}

    async def connect(self, conversation_id: uuid.UUID, websocket: WebSocket):
        await websocket.accept()
        if conversation_id not in self.active_connections:
            self.active_connections[conversation_id] = set()
        self.active_connections[conversation_id].add(websocket)

    def disconnect(self, conversation_id: uuid.UUID, websocket: WebSocket):
        if conversation_id in self.active_connections:
            self.active_connections[conversation_id].discard(websocket)
            if not self.active_connections[conversation_id]:
                del self.active_connections[conversation_id]

    async def broadcast(self, conversation_id: uuid.UUID, message):
        """Broadcast a ChatMessage to all clients on this conversation."""
        if conversation_id not in self.active_connections:
            return
        data = json.dumps({
            "id": str(message.id),
            "conversation_id": str(message.conversation_id),
            "role": message.role,
            "content": message.content,
            "created_at": message.created_at.isoformat(),
        })
        dead = []
        for ws in self.active_connections[conversation_id]:
            try:
                await ws.send_text(data)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.active_connections[conversation_id].discard(ws)


ws_manager = ConnectionManager()
