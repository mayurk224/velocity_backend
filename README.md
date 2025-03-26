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

---

# • User Profile Endpoint Documentation

## Endpoint
**GET /users/profile**

## Description
This endpoint is used to retrieve the authenticated user's profile details. It performs the following steps:
- Validates the authentication token in the request header.
- Extracts the user's ID from the token.
- Fetches the user details from the database.
- Returns the user's profile data.

## Request Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

## Response
The endpoint returns the authenticated user's profile information.

### Example Response (Successful Profile Fetch)
```json
{
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "example@domain.com",
    "_id": "67e395e19304063306d0e979",
    "createdAt": "2024-03-25T12:34:56.789Z"
  }
}
```

### Example Response (Unauthorized Access)
```json
{
  "error": "Unauthorized. Token missing or invalid."
}
```

---

# • User Logout Endpoint Documentation

## Endpoint
**GET /users/logout**

## Description
This endpoint is used to log out a user by invalidating their authentication token. It performs the following steps:
- Validates the authentication token in the request header.
- Removes or invalidates the token from the server or client-side storage.
- Confirms successful logout to the client.

## Request Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

## Response
Returns a success message upon logout.

### Example Response (Successful Logout)
```json
{
  "message": "User successfully logged out."
}
```

### Example Response (Unauthorized Request)
```json
{
  "error": "Unauthorized. Token missing or invalid."
}
```

# Captain Registration Endpoint Documentation

## Endpoint
**POST /captain/register**

## Description
This endpoint is used to register a new captain in the system. It performs the following steps:
- Validates the incoming request data using express-validator.
- Ensures all required fields are provided.
- Verifies that the email has not been used by another captain.
- Hashes the input password.
- Saves the new captain's details in the database.
- Generates an authentication token for the newly created captain.

## Request Headers
- `Content-Type: application/json`

## Request Body
The endpoint expects a JSON payload with the following fields:

| Field                    | Type     | Description                                     | Required | Constraints                                 |
|--------------------------|----------|-------------------------------------------------|----------|---------------------------------------------|
| `fullname.firstname`     | String   | The first name of the captain                  | Yes      | Minimum length of 3 characters             |
| `fullname.lastname`      | String   | The last name of the captain                   | Yes      | Minimum length of 3 characters             |
| `email`                 | String   | The email address of the captain               | Yes      | Must be a valid email address              |
| `password`              | String   | The password for the account                   | Yes      | Minimum length of 6 characters             |
| `vehicle.color`         | String   | The color of the captain's vehicle             | Yes      | Cannot be empty                            |
| `vehicle.plate`         | String   | The license plate number of the vehicle        | Yes      | Must be unique                             |
| `vehicle.capacity`      | Number   | The seating capacity of the vehicle            | Yes      | Must be a positive integer                 |
| `vehicle.vehicleType`   | String   | The type of vehicle (e.g., car, bike, etc.)    | Yes      | Must be a valid vehicle type               |

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "test123@gmail.com",
  "password": "test@123",
  "vehicle": {
    "color": "Red",
    "plate": "AB123CD",
    "capacity": 2,
    "vehicleType": "car"
  }
}
```

## Response
The endpoint returns the newly created captain's details along with an authentication token.

### Example Response (Successful Registration)
```json
{
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "test123@gmail.com",
        "password": "$2b$10$XQmOCov1/atBB631Hf3mgur49fLytQivzUOssZ49zNfTA31Q6fblG",
        "status": "inactive",
        "vehicle": {
            "color": "Red",
            "plate": "AB123CD",
            "capacity": 2,
            "vehicleType": "car"
        },
        "_id": "67e40f924419bb1168300272",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2U0MGY5MjQ0MTliYjExNjgzMDAyNzIiLCJpYXQiOjE3NDI5OTk0NDIsImV4cCI6MTc0MzA4NTg0Mn0.7zuRQdVtyYJyetgWYz50PcYpj8NmjbmGuN-yuTtUez4"
}
```

### Example Response (Email Already Exists)
```json
{
  "error": "Email is already in use."
}
```

# Captain Login Endpoint Documentation

## Endpoint
**POST /captain/login**

## Description
This endpoint is used to authenticate a captain and generate an authentication token. It performs the following steps:
- Validates the incoming request data using express-validator.
- Checks that both email and password are provided.
- Verifies that the captain exists in the database.
- Compares the provided password with the stored hashed password.
- Generates and returns an authentication token upon successful login.
- Stores the token in cookies for session management.

## Request Headers
- `Content-Type: application/json`

## Request Body
The endpoint expects a JSON payload with the following fields:

| Field     | Type   | Description                      | Required | Constraints |
|-----------|--------|----------------------------------|----------|-------------|
| `email`   | String | The email address of the captain | Yes      | Must be a valid email address |
| `password` | String | The password for the account   | Yes      | Minimum length of 6 characters |

### Example Request Body
```json
{
  "email": "test123@gmail.com",
  "password": "test@123"
}
```

### Example Response (Successful Login)
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "test123@gmail.com",
    "_id": "67e40f924419bb1168300272"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2U0MGY5MjQ0MTliYjExNjgzMDAyNzIiLCJpYXQiOjE3NDI5OTk0NDIsImV4cCI6MTc0MzA4NTg0Mn0.7zuRQdVtyYJyetgWYz50PcYpj8NmjbmGuN-yuTtUez4"
}
```

### Example Response (Invalid Credentials)
```json
{
  "error": "Invalid email or password."
}
```

---

# Captain Profile Endpoint Documentation

## Endpoint
**GET /captain/profile**

## Description
This endpoint is used to retrieve the authenticated captain's profile details. It performs the following steps:
- Validates the authentication token from cookies or request headers.
- Extracts the captain's ID from the token.
- Fetches the captain's details from the database.
- Returns the captain's profile data.

## Request Headers (Alternative Authentication Method)
- `Authorization: Bearer <token>` (if not using cookies)

## Response
The endpoint returns the authenticated captain's profile information.

### Example Response (Successful Profile Fetch)
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "test123@gmail.com",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 2,
      "vehicleType": "car"
    },
    "_id": "67e40f924419bb1168300272",
    "createdAt": "2024-03-25T12:34:56.789Z"
  }
}
```

### Example Response (Unauthorized Access)
```json
{
  "error": "Unauthorized. Token missing or invalid."
}
```

---

# Captain Logout Endpoint Documentation

## Endpoint
**POST /captain/logout**

## Description
This endpoint is used to log out a captain by clearing their authentication token from cookies. It performs the following steps:
- Checks if the authentication token exists in cookies.
- Clears the token from the cookie storage.
- Returns a success message confirming logout.

## Response
Returns a success message upon logout.

### Example Response (Successful Logout)
```json
{
  "message": "Captain successfully logged out."
}
```

### Example Response (Unauthorized Request)
```json
{
  "error": "Unauthorized. No active session found."
}
```