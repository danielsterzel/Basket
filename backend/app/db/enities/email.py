from model.email import VerificationEmail
from uuid import UUID
from sqlalchemy import select, delete


class VerificationEmailRepository:
    def __init__(self, db):
        self.db = db

    async def insert_verification_email(
        self, verification_email: VerificationEmail
    ) -> None:

        self.db.add(verification_email)
        await self.db.flush()

    async def get_verification_email_by_user_id(
        self, user_id: UUID
    ) -> VerificationEmail | None:

        query = select(VerificationEmail).where(VerificationEmail.user_id == user_id)

        resp = await self.db.execute(query)

        return resp.scalar_one_or_none()

    async def delete_verification_email(self, verification_id: UUID) -> None:

        await self.db.execute(
            delete(VerificationEmail).where(VerificationEmail.id == verification_id)
        )
