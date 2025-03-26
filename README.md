# Backend API Documentation


# • User Registration Endpoint Documentation

## Endpoint
**POST /users/register**

## Description
This endpoint is used to create a new user in the system. It performs the following steps:
- Validates the incoming request data using express-validator.
- Checks that all required fields are provided.
- Verifies that the email hasn't been used by another user.
- Hashes the input password.
- Saves the new user to the database.
- Generates an authentication token for the newly created user.

## Request Headers
- `Content-Type: application/json`

## Request Body
The endpoint expects a JSON payload with the following fields:

| Field                      | Type     | Description                                          | Required | Constraints                                      |
|----------------------------|----------|------------------------------------------------------|----------|--------------------------------------------------|
| `email`                    | String   | The email address of the user                        | Yes      | Must be a valid email address                    |
| `fullname.firstname`       | String   | The first name of the user                           | Yes      | Minimum length of 3 characters                   |
| `fullname.lastname`        | String   | The last name of the user                            | Yes      | Minimum length of 3 characters                   |
| `password`                 | String   | The password for the account                         | Yes      | Minimum length of 6 characters                   |

### Example Request Body
```json
{
  "email": "example@domain.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePassword123"
}
```

### Example Response
```json
{
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "example@domain.com",
    "password": "$2b$10$YBBhxH8.Fo9PFeV.yEXrB.0WLHm.4KlUKMa5SnKHJDYQHVuEQV1Lq",
    "_id": "67e395e19304063306d0e979",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTM5NWUxOTMwNDA2MzMwNmQwZTk3OSIsImlhdCI6MTc0Mjk2ODI4OSwiZXhwIjoxNzQzNTczMDg5fQ.5X6QdhdVFF2IvKEOyuU5nhekB2YYvBAeH7qir1ESUPI"
}
```

# • User Login Endpoint Documentation

## Endpoint
**POST /users/login**

## Description
This endpoint is used to authenticate a user and generate an authentication token. It performs the following steps:
- Validates the incoming request data using express-validator.
- Checks that both email and password are provided.
- Verifies that the user exists in the database.
- Compares the provided password with the stored hashed password.
- Generates and returns an authentication token upon successful login.

## Request Headers
- `Content-Type: application/json`

## Request Body
The endpoint expects a JSON payload with the following fields:

| Field     | Type   | Description                      | Required | Constraints |
|-----------|--------|----------------------------------|----------|-------------|
| `email`   | String | The email address of the user   | Yes      | Must be a valid email address |
| `password` | String | The password for the account   | Yes      | Minimum length of 6 characters |

### Example Request Body
```json
{
  "email": "example@domain.com",
  "password": "securePassword123"
}
```

### Example Response (Successful Login)
```json
{
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "example@domain.com",
    "_id": "67e395e19304063306d0e979"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTM5NWUxOTMwNDA2MzMwNmQwZTk3OSIsImlhdCI6MTc0Mjk2ODI4OSwiZXhwIjoxNzQzNTczMDg5fQ.5X6QdhdVFF2IvKEOyuU5nhekB2YYvBAeH7qir1ESUPI"
}
```

### Example Response (Invalid Credentials)
```json
{
  "error": "Invalid email or password."
}
```

