from datetime import datetime, timedelta, timezone
from typing import Literal
from app.core.settings import settings
import jwt
from uuid import UUID


def create_token(user_id: UUID, token_type: Literal["access", "refresh"]) -> str:

    ttl = timedelta(minutes=15) if token_type == "access" else timedelta(days=30)

    payload = {
        "sub": str(user_id),
        "type": token_type,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + ttl,
    }

    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return token
