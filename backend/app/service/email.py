import aiosmtplib.errors
from aiosmtplib import SMTP
from email.message import EmailMessage
from datetime import datetime, timedelta, timezone
import secrets
from urllib.parse import urlencode

from sqlalchemy.ext.asyncio import AsyncSession

from core.settings import settings
from db.enities.email import VerificationEmailRepository
from app.model.email import VerificationEmail
from service.jinja_template_renderer import get_confirm_email_template
from uuid import UUID

from url.hash_url import hash_email_confirmation_token

EMAIL_EXPIRATION_MINUTES = 30


async def send_verification_email(
    recipient: str,
    username: str,
    user_id: UUID,
    db: AsyncSession,
):
    expiration_minutes = EMAIL_EXPIRATION_MINUTES

    token = await create_verification_email_entity(user_id=user_id, db=db)

    confirmation_url = (
        f"{settings.frontend_url}/confirm-email?{urlencode({'token': token})}"
    )
    template = get_confirm_email_template(
        username, expiration_minutes, confirmation_url
    )

    message = EmailMessage()
    message["To"] = recipient
    message["Subject"] = (
        "Great to see you join us! Please confirm your email to ensure the best shopping experience twin✌️"
    )
    message["From"] = settings.smtp_email
    message.set_content(
        "Your email provider does not support html 😞 tough luck buddy you ain't gonna get nothin'🥀"
    )
    message.add_alternative(template, subtype="html")

    smtp_client = SMTP(
        hostname=settings.smtp_host, port=settings.smtp_port, start_tls=True
    )
    await smtp_client.connect()
    try:
        await smtp_client.login(settings.smtp_email, settings.smtp_password)
    except aiosmtplib.errors.SMTPAuthenticationError:
        print(f"LOGIN ERROR ON SMTP. Email: {settings.smtp_email}")
        raise

    try:
        await smtp_client.send_message(message)
    except aiosmtplib.errors.SMTPRecipientRefused:
        print(f"smth happen idk twin🥀")
        raise


async def create_verification_email_entity(user_id: UUID, db: AsyncSession) -> str:

    token = secrets.token_urlsafe(32)
    repository = VerificationEmailRepository(db)

    token_hash = hash_email_confirmation_token(token)
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=EMAIL_EXPIRATION_MINUTES
    )

    new_verification_email = VerificationEmail(
        token_hash=token_hash, user_id=user_id, expires_at=expires_at
    )
    await repository.insert_verification_email(
        verification_email=new_verification_email
    )
    await db.commit()
    return token
