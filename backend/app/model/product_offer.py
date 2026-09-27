from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from uuid import UUID
from sqlalchemy.dialects.postgresql import UUID as PG_UUID

class ProductOffer(Base):

    __tablename__ = "product_offers"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True)
