from jinja2 import Environment, FileSystemLoader
from pathlib import Path

TEMPLATES_DIR = Path(__file__).resolve().parent.parent / "templates"

env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


def get_confirm_email_template(
    user_name: str,
    expiration_minutes: int,
    confirmation_url: str,
) -> str:
    template = env.get_template("confirm_email.html")

    return template.render(
        user_name=user_name,
        expiration_minutes=expiration_minutes,
        confirmation_url=confirmation_url,
    )
