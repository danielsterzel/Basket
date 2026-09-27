from pydantic import Field, field_validator
from pydantic_core import PydanticCustomError

from app.misc.allowed_email_domains import ALLOWED_EMAIL_DOMAINS
from app.schema.ConfiguredSchema import ConfiguredSchema
from datetime import datetime
from typing import Literal
from app.model.user import OAuthAccount
from uuid import UUID


def email_validate(email: str) -> str:
    if "@" not in email:
        raise PydanticCustomError(
            "invalid_email",
            "Provided email is invalid"
        )

    email = email.strip().lower()
    split = email.split("@")

    domain = split.pop().lower()
    if domain not in ALLOWED_EMAIL_DOMAINS:

        raise PydanticCustomError(
            "email_domain_not_allowed",
            "Email domain is not allowed",
            {
                "allowed_domains": sorted(ALLOWED_EMAIL_DOMAINS)
            }
        )

    return email
def validate_schema_password(password: str) -> str:
    if len(password) < 8:
        raise PydanticCustomError(
            "invalid_password",
            "Password must be at least 8 characters long"
        )

    if not any(char.islower() for char in password):
        raise PydanticCustomError(
            "invalid_password",
            "Password must contain at least one lowercase letter"
        )

    if not any(char.isupper() for char in password):
        raise PydanticCustomError(
            "invalid_password",
            "Password must contain at least one uppercase letter"
        )

    if not any(char.isdigit() for char in password):
        raise PydanticCustomError(
            "invalid_password",
            "Password must contain at least one digit"
        )

    if not any(not char.isalnum() for char in password):
        raise PydanticCustomError(
            "invalid_password",
            "Password must contain at least one special character"
        )

    return password


class UserRead(ConfiguredSchema):
    id: UUID = Field(...)
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
    def validate_password_field(cls, password: str) -> str:
        return validate_schema_password(password)
    @field_validator("email")
    @classmethod
    def validate_email_field(cls, email: str)->str:
        return email_validate(email)



class UserLogin(ConfiguredSchema):
    email: str = Field(max_length=255, min_length=3)
    password: str = Field(max_length=255, min_length=8)

    @field_validator("email")
    @classmethod
    def validate_email_field(cls, email: str) -> str:
        return email_validate(email)


    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str) -> str:
        return validate_schema_password(password)


class UserRegisterSuccess(ConfiguredSchema):
    msg: str
    success: bool


class UserLoginSuccess(ConfiguredSchema):
    user: UserRead
    msg: str
    access_token: str
    token_type: Literal["bearer"]


class UserConfirmEmailRequest(ConfiguredSchema):
    token: str


class UserConfirmEmailResponse(ConfiguredSchema):
    msg: str
    email_verified: bool

class UserResendEmailRequest(ConfiguredSchema):
    email: str

class UserResendEmailResponse(ConfiguredSchema):
    msg: str
    success: bool
