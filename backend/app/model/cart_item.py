from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.model.cart import Cart
    from app.model.product import Product


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    cart_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("carts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    product_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("products.id"),
        nullable=False,
        index=True,
    )

    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    cart: Mapped[Cart] = relationship(back_populates="items")
    product: Mapped[Product] = relationship(back_populates="cart_items")
