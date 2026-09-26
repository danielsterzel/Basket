from pydantic_settings import SettingsConfigDict, BaseSettings


class Settings(BaseSettings):
    app_name: str
    database_url: str

    jwt_algorithm: str
    jwt_secret: str
    smtp_email: str
    smtp_password: str
    frontend_url: str

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
