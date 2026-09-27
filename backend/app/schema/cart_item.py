from uuid import UUID

from app.schema.configured_schema import ConfiguredSchema


class CartItemRead(ConfiguredSchema):
    id: UUID
    cart_id: UUID
    product_id: UUID
    quantity: int


class CartItemWrite(ConfiguredSchema):
    product_id: UUID
    quantity: int
