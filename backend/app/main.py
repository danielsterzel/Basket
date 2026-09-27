from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.dependency import get_db
from app.core.settings import settings
import logging
from fastapi.responses import JSONResponse
from fastapi.exceptions import  RequestValidationError

from app.api.user import router as user_router

app = FastAPI()

logger = logging.getLogger("uvicorn.error")
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    body = await request.body()

    logger.error(
        "Validation error on %s %s\nBody: %s\nErrors: %s",
        request.method,
        request.url,
        body.decode("utf-8"),
        exc.errors()
    )

    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):
    logger.exception(
        "Unhandled exception on %s %s",
        request.method,
        request.url,
    )

    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal Server Error"
        }
    )

# dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"]
)

app.include_router(user_router)

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
