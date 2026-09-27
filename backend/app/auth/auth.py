from typing import Annotated

import jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from db.dependency import get_db
from core.settings import settings
from db.enities.user import UserRepository
from app.model.user import User
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[AsyncSession, Depends(get_db)])-> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        repository = UserRepository(db=db)
        user = await repository.get_user_by_id(user_id=user_id)

        if user is None:
            raise credentials_exception

        if not user.email_verified:
            raise credentials_exception

        return user

    except jwt.InvalidTokenError:
        raise credentials_exception