from schema.configured_schema import ConfiguredSchema
from uuid import UUID


class SearchRead(ConfiguredSchema):
    id: UUID
