from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError


class PasswordService:
    def __init__(self):
        self.password_hasher = PasswordHasher()

    def hash_password(self, password: str) -> str:
        return self.password_hasher.hash(password)

    def validate_login_password(self, password: str, password_hash: str) -> bool:
        try:
            return self.password_hasher.verify(password_hash, password)
        except VerifyMismatchError:
            return False
