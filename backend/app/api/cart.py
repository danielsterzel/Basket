from typing import Annotated

from fastapi import HTTPException, APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.auth import get_current_user
from app.db.dependency import get_db
from app.model.user import User
from uuid import UUID

from db.enities.cart import CartRepository
from schema.cart import CartRead, CartWrite

router = APIRouter(prefix="/cart")


@router.get("/get/{cart_id}", response_model=CartRead)
async def get_cart(
    user: Annotated[User, Depends(get_current_user)],
    cart_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
):

    repository = CartRepository(db)
    cart = await repository.get_cart_for_user(user.id, cart_id=cart_id)

    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Couldn't process get cart request",
        )

    return CartRead.model_validate(cart)


@router.post("/create", response_model=CartRead)
async def create_cart(
    cart_create_request: CartWrite,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
):

    repository = CartRepository(db)

    #     call cart optimization
    ...
