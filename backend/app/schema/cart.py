from schema.configured_schema import ConfiguredSchema
from uuid import UUID


class CartRead(ConfiguredSchema):
    id: UUID
