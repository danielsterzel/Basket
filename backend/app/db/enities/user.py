from sqlalchemy.ext.asyncio import AsyncSession

from app.model.user import User
from sqlalchemy import select

from uuid import UUID


class UserRepository:
    def __init__(self, db):
        self.db: AsyncSession = db

    async def get_user_by_email(self, email: str) -> User | None:

        query = select(User.password_hash).where(User.email == email)

        resp = await self.db.execute(query)

        return resp.scalar_one_or_none()

    async def get_user_by_id(self, user_id: UUID) -> User: ...
    async def get_password_hash_using_email(self, email: str) -> str | None:

        query = select(User.password_hash).where(User.email == email)

        resp = await self.db.execute(query)

        return resp.scalar_one_or_none()

    async def insert_user(self, user: User)-> None:
        self.db.add(user)
        await self.db.flush([user])

