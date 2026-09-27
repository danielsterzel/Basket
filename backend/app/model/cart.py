from __future__ import annotations

from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.model.optimization_run import OptimizationType

if TYPE_CHECKING:
    from app.model.cart_item import CartItem
    from app.model.user import User


class CartStatus(str, Enum):
    DRAFT = "draft"
    OPTIMIZED = "optimized"
    PURCHASED = "purchased"


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        default=Decimal("0.00"),
    )
    delivery_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        default=Decimal("0.00"),
    )
    product_prices: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        default=Decimal("0.00"),
    )

    optimization_type: Mapped[OptimizationType] = mapped_column(
        SQLEnum(
            OptimizationType,
            values_callable=lambda enum: [member.value for member in enum],
        ),
        default=OptimizationType.LOWEST_PRICE,
        nullable=False,
    )

    status: Mapped[CartStatus] = mapped_column(
        SQLEnum(
            CartStatus,
            values_callable=lambda enum: [member.value for member in enum],
        ),
        default=CartStatus.DRAFT,
        nullable=False,
    )

    items: Mapped[list[CartItem]] = relationship(
        back_populates="cart",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    user: Mapped[User] = relationship(
        back_populates="carts",
    )
