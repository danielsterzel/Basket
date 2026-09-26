import hashlib


def hash_email_confirmation_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def verify_email_confirmation_token(token: str, hashed_token: str) -> bool:

    return hash_email_confirmation_token(token) == hashed_token
