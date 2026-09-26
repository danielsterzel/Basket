from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.dependency import get_db

from typing import Annotated

from db.enities.user import UserRepository
from schema.user import UserRegister, UserRead, UserLogin, UserLoginSuccess, UserRegisterSuccess
from service.auth import create_token
from service.password import PasswordService
from app.model.user import User

router = APIRouter(prefix="/user")


@router.post("register", response_model=UserRead)
async def register(register_request: UserRegister, db: Annotated[AsyncSession, Depends(get_db)])->UserRegisterSuccess
    password_service = PasswordService()
    repository = UserRepository(db)

    password_hash = password_service.hash_password(register_request.password)

    user = User(
        name=register_request.name,
        last_name=register_request.last_name,
        email=register_request.email,
        password_hash=password_hash
    )

    try:
        await repository.insert_user(user)
    except SQLAlchemyError:
        return UserRegisterSuccess(msg="Failure")

    await db.commit()

    return UserRegisterSuccess(msg="Success")

@router.post("/login", response_model=UserRead)
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
        refresh_token=refresh_token,
        token_type="bearer"
    )
    return success

@router.post("/confirm_email")
async def confirm_email():
    ...