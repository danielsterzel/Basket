from __future__ import annotations

from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.model.cart_item import CartItem


class Product(Base):
    __tablename__ = "products"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    brand: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    variant: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    size: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    cart_items: Mapped[list[CartItem]] = relationship(
        back_populates="product",
        passive_deletes=True,
    )
