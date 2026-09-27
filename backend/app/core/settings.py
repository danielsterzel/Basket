from pydantic_settings import SettingsConfigDict, BaseSettings
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / ".env"


class Settings(BaseSettings):
    app_name: str
    database_url: str

    jwt_algorithm: str
    jwt_secret: str
    smtp_email: str
    smtp_password: str
    smtp_host: str
    smtp_port: int
    frontend_url: str

    model_config = SettingsConfigDict(
        env_file=ENV_FILE, env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
