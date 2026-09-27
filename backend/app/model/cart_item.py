from sqlalchemy import ForeignKey, String, Integer, Text

from app.db.base import Base

from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from uuid import UUID


class CartItem(Base):
    __tablename__ = "cart_items"

    # __table_args__ = (1,)

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True)

    cart_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("carts.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    product_name: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    brand: Mapped[str] = mapped_column(String(255), nullable=True)

    # this is for pasting external links to products
    product_url: Mapped[str] = mapped_column(String(2048), nullable=True)

    cart: Mapped["Cart"] = relationship(back_populates="items")

