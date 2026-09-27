from schema.configured_schema import ConfiguredSchema
from uuid import UUID


class OptimizationRunRead(ConfiguredSchema):
    id: UUID
