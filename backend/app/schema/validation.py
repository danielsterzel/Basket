def validate_schema_password(password: str) -> str:
    # match regexp - only alnum thingies. No weird stuff.
    for letter in password:
        if not letter.isalnum():
            raise ValueError("INVALID CHARACTER IN PASSWORD")
    return password
