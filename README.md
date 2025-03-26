# Backend API Documentation


# User Registration Endpoint Documentation

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
