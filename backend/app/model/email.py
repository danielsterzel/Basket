from sqlalchemy import String, Index, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from app.db.base import Base
from uuid import UUID, uuid4
from datetime import datetime


class VerificationEmail(Base):
    __tablename__ = "verification_emails"

    __table_args__ = (Index("idx_verification_email_user_id", "user_id"), )

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )

    token_hash: Mapped[str] = mapped_column(String(64), unique=True)

    user_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )
