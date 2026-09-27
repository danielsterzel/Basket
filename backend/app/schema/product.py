from decimal import Decimal
from uuid import UUID

from app.schema.configured_schema import ConfiguredSchema


class ProductRead(ConfiguredSchema):
    id: UUID
    name: str
    brand: str
    description: str | None
    variant: str | None
    size: str | None


class ProductWrite(ConfiguredSchema):
    name: str
    brand: str
    description: str | None = None
    variant: str | None = None
    size: str | None = None
