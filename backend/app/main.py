from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.dependency import get_db
from app.core.settings import settings

app = FastAPI()


@app.get("/")
async def hello():
    return {"msg": "hello"}


@app.get("/testdb")
async def testdb(
    db: AsyncSession = Depends(get_db),
):
    print(repr(settings.database_url))
    try:
        result = await db.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "result": result.scalar_one(),
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {e}",
        )
