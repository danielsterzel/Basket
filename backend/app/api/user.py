from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.dependency import get_db

from typing import Annotated

from app.auth.auth_token import create_token
from app.db.enities.email import VerificationEmailRepository
from app.db.enities.user import UserRepository
from app.schema.user import (
    UserRegister,
    UserRead,
    UserLogin,
    UserLoginSuccess,
    UserRegisterSuccess,
    UserConfirmEmailRequest,
    UserConfirmEmailResponse,
    UserResendEmailRequest,
    UserResendEmailResponse
)

from service.email import send_verification_email
from service.password import PasswordService
from app.model.user import User
from datetime import datetime, timezone
from app.auth.auth import get_current_user

from url.hash_url import verify_email_confirmation_token, hash_email_confirmation_token

router = APIRouter(prefix="/user")


@router.post("/register", response_model=UserRegisterSuccess)
async def register(
    register_request: UserRegister, db: Annotated[AsyncSession, Depends(get_db)]
) -> UserRegisterSuccess:
    password_service = PasswordService()
    repository = UserRepository(db)

    password_hash = password_service.hash_password(register_request.password)

    user = User(
        name=register_request.name,
        last_name=register_request.last_name,
        email=register_request.email,
        password_hash=password_hash,
    )

    try:
        await repository.insert_user(user)
    except SQLAlchemyError:
        return UserRegisterSuccess(msg="Failure", success=False)

    await db.commit()

    await send_verification_email(
        recipient=user.email, username=user.name, user_id=user.id, db=db
    )

    return UserRegisterSuccess(msg="Success", success=True)


@router.post("/login", response_model=UserLoginSuccess)
async def login(
    login_request: UserLogin, db: Annotated[AsyncSession, Depends(get_db)]
) -> UserLoginSuccess:

    password_service = PasswordService()
    repository = UserRepository(db)

    login_email = login_request.email

    user = await repository.get_user_by_email(email=login_email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect Values in login form",
        )
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified",
        )

    saved_hash = await repository.get_password_hash_using_email(email=login_email)

    if not saved_hash:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect Values in login form",
        )

    validated = password_service.validate_login_password(
        login_request.password, saved_hash
    )
    if not validated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect Values in login form",
        )

    access_token = create_token(user.id, token_type="access")
    refresh_token = create_token(user.id, token_type="refresh")

    user_read = UserRead.model_validate(user)

    success = UserLoginSuccess(
        user=user_read,
        msg="Success",
        access_token=access_token,
        token_type="bearer",
    )
    return success


@router.post("/confirm_email", response_model=UserConfirmEmailResponse)
async def confirm_email(
    verify_email_request: UserConfirmEmailRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):

    verification_email_repository = VerificationEmailRepository(db)
    user_repository = UserRepository(db)

    token_hash = hash_email_confirmation_token(verify_email_request.token)

    verification_email = (
        await verification_email_repository.get_verification_email_by_token_hash(
            token_hash
        )
    )
    if not verification_email:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid verification email"
        )

    user = await user_repository.get_user_by_id(
        verification_email.user_id
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Unauthorized confirm user email request",
        )
    if user.email_verified:
        return UserConfirmEmailResponse(
            msg="Email already confirmed", email_verified=True
        )

    if verification_email.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Expired verification Link"
        )
    check_token_validity = verify_email_confirmation_token(
        hashed_token=verification_email.token_hash, token=verify_email_request.token
    )

    if not check_token_validity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect token"
        )

    await user_repository.update_email_verification(user_id=user.id)

    await verification_email_repository.delete_verification_email(
        verification_id=verification_email.id
    )

    await db.commit()
    return UserConfirmEmailResponse(
        msg="Thank you! you have confirmed your email ;)", email_verified=True
    )

@router.post("/resend_email", response_model=UserResendEmailResponse)
async def resend_email(resend_request: UserResendEmailRequest,
                       db:Annotated[AsyncSession, Depends(get_db)]):
    user_repository = UserRepository(db)
    verification_email_repository = VerificationEmailRepository(db)

    user = await user_repository.get_user_by_email(resend_request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Something went wrong with resending email",
        )
    if user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified",
        )
    old_verification_email = (
        await verification_email_repository.get_verification_email_by_user_id(
            user_id=user.id
        )
    )
    if old_verification_email:
        await verification_email_repository.delete_verification_email(
            verification_id=old_verification_email.id
        )
    await db.commit()

    await send_verification_email(
        recipient=user.email,
        username=user.name,
        user_id=user.id,
        db=db,
    )
    return UserResendEmailResponse(
        msg="Verification email sent",
        success=True
    )

@router.get("/me", response_model=UserRead)
async def get_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user