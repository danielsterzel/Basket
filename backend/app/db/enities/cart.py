from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from uuid import UUID
from app.model.cart import Cart


class CartRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def insert_cart(self, cart: Cart) -> None:
        self.db.add(cart)
        await self.db.flush([cart])

    async def get_cart_for_user(self, user_id: UUID, cart_id: UUID) -> Cart | None:

        query = select(Cart).where(Cart.user_id == user_id, Cart.id == cart_id)
        resp = await self.db.execute(query)

        return resp.scalar_one_or_none()

    async def delete(self, user_id: UUID, cart_id: UUID) -> None:

        operation = delete(Cart).where(Cart.user_id == user_id, Cart.id == cart_id)

        await self.db.execute(operation)
