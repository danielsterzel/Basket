from decimal import Decimal

from model.cart import CartStatus
from model.optimization_run import OptimizationType
from schema.configured_schema import ConfiguredSchema
from uuid import UUID
from app.schema.cart_item import CartItemRead, CartItemWrite


class CartRead(ConfiguredSchema):
    id: UUID
    user_id: UUID
    total_price: Decimal
    delivery_price: Decimal
    product_prices: Decimal
    optimization_type: OptimizationType
    status: CartStatus
    items: list[CartItemRead]


class CartWrite(ConfiguredSchema):
    optimization_type: OptimizationType
    items: list[CartItemWrite]
