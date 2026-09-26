from pydantic import Field, field_validator

from misc.allowed_email_domains import ALLOWED_EMAIL_DOMAINS
from app.schema.validation import validate_schema_password
from app.schema.ConfiguredSchema import ConfiguredSchema
from datetime import datetime
from typing import Literal
from model.user import OAuthAccount, User


class UserRead(ConfiguredSchema):
    email: str = Field(max_length=255, min_length=3)
    name: str = Field(max_length=100, min_length=1)
    last_name: str = Field(max_length=100, min_length=1)
    created_at: datetime = Field(...)
    updated_at: datetime = Field(...)
    oauth_accounts: list["OAuthAccount"] = Field(default=[])
    carts: list["Cart"] = Field(default=[])
    searches: list["Search"] = Field(default=[])
    optimization_runs: list["OptimizationRun"] = Field(default=[])


class UserRegister(ConfiguredSchema):
    name: str = Field(max_length=100, min_length=1)
    last_name: str = Field(max_length=100, min_length=1)
    email: str = Field(max_length=255, min_length=3)
    password: str = Field(max_length=255, min_length=8)

    @field_validator("password")
    @classmethod
    def validate(cls, password: str) -> str:
        return validate_schema_password(password)


class UserLogin(ConfiguredSchema):
    email: str = Field(max_length=255, min_length=3)
    password: str = Field(max_length=255, min_length=8)

    @field_validator("email")
    @classmethod
    def validate(cls, email: str) -> str:

        if "@" not in email:
            raise ValueError("PROVIDED EMAIL DOES NOT EXIST")

        split = email.split("@")

        domain = split.pop()
        if domain not in ALLOWED_EMAIL_DOMAINS:
            raise ValueError("EMAIL VERIFICATION FAILURE INVALID DOMAIN")

        return email

    @field_validator("password")
    @classmethod
    def validate(cls, password: str) -> str:
        return validate_schema_password(password)

class UserRegisterSuccess(ConfiguredSchema):

    msg: str



class UserLoginSuccess(ConfiguredSchema):
    user: UserRead
    msg: str
    access_token: str
    refresh_token: str
    token_type: Literal["bearer"]
