# Backend API Documentation

This document describes the API endpoints available in the backend and details the data requirements, responses, and validations.

---

## 1. User Registration Endpoint

### URL
`/user/register`

### HTTP Method
`POST`

### Description
This endpoint registers a new user. It validates the input data, hashes the provided password, creates a user in the database, and generates a JSON Web Token (JWT) for authentication.

### Request Body
The request must be sent in JSON format. The following fields are required:

| Field                      | Type   | Requirements                                                         | Description                                         |
|----------------------------|--------|----------------------------------------------------------------------|-----------------------------------------------------|
| `email`                    | String | Must be a valid email format                                         | The user's email address.                           |
| `fullname.firstname`       | String | Must be at least 3 characters long                                   | The user's first name.                              |
| `password`                 | String | Must be at least 6 characters long                                   | The user's password which will be hashed before storage. |

> **Note:**  
> Although the model supports `fullname.lastname`, only `fullname.firstname` is validated via the route. Ensure that when registering, if a last name is required by your business logic, it is provided correctly.

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John"
  },
  "password": "yourStrongPassword"
}
```

### Response

#### Success Response
- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"  // optional if provided
      },
      "email": "john.doe@example.com"
      // ...additional user properties...
    }
  }
  ```

#### Error Responses

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Internal Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Description:** The server encountered an error while processing the registration (e.g., during password hashing or database operations).

### Endpoint Flow Summary
1. **Input Validation:**  
   Uses `express-validator` to ensure:
   - `email` is a valid email.
   - `fullname.firstname` has a minimum length of 3 characters.
   - `password` has a minimum length of 6 characters.

2. **Processing:**
   - On valid input, the password is hashed.
   - A new user is created with the hashed password.
   - A JWT is generated using the user's ID.

3. **Response:**
   - On success, returns a `201 Created` along with a JWT token and user data.
   - On failure, returns an appropriate error message and status code.



## General Notes

- **Password Security:**  
  Passwords are hashed using bcrypt before being stored in the database.

- **Error Handling:**  
  Validation issues result in a `400 Bad Request`, while unexpected server errors result in a `500 Internal Server Error`.

- **JWT Generation:**  
  A JWT is generated for the user session upon successful registration.

---

This documentation provides an overview of the `/user/register` endpoint. Ensure that your client applications adhere to these data requirements and handle responses appropriately.

## 2. User Login Endpoint

### URL
`/user/login`

### HTTP Method
`POST`

### Description
This endpoint authenticates an existing user. It validates the input credentials, compares the provided password with the stored hashed password, and returns a JSON Web Token (JWT) along with user details if successful.

### Request Body
The request must be in JSON format with the following fields:

| Field      | Type   | Requirements                             | Description                                  |
|------------|--------|------------------------------------------|----------------------------------------------|
| `email`    | String | Must be a valid email format             | The user's email address.                    |
| `password` | String | Minimum length: 6 characters             | The user's password.                         |

#### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "yourStrongPassword"
}
```

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "jwttoken": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...additional user properties...
    }
  }
  ```

#### Error Responses

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Authentication Failure**
  - **Status Code:** `401 Unauthorized`
  - **Response Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Internal Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Description:** An error occurred during the login process.

---

## General Notes

- **Password Security:**  
  Passwords are hashed using bcrypt before being stored in the database.

- **JWT Generation:**  
  A JWT is generated upon successful registration or login for session management.

- **Input Validation:**  
  Input data is validated using `express-validator`. All endpoints enforce the required format for each field.

This documentation covers the essential aspects of the `/user/register` and `/user/login` endpoints. Ensure that all client applications adhere to these requirements for a successful integration.

## 3. User Logout Endpoint

### URL
`/user/logout`

### HTTP Method
`GET`

### Description
This endpoint logs out the user by clearing the authentication cookie and blacklisting the token to ensure it cannot be used in subsequent requests.

### Authentication
Requires a valid JWT token provided in the cookie or the Authorization header.

### Request
- No request body is required.
- The JWT token must be sent in the request cookie (`token`) or in the Authorization header.

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logout successfully"
  }
  ```

#### Error Responses

- **Unauthorized**
  - **Status Code:** `401 Unauthorized`
  - **Response Body:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
    or
    ```json
    {
      "message": "Already Blacklisted"
    }
    ```

### Notes
- The provided token is added to a blacklist (using `blacklistTokenModel`) to prevent its future use.
- The endpoint clears the `token` cookie from the client.

---

## 3. Captain Endpoints

### 3.1 Captain Registration Endpoint

**URL:** `/captain/register`  
**HTTP Method:** `POST`

**Description:**  
Registers a new captain. This endpoint validates the standard fields (email, fullname, and password) as well as captain-specific vehicle details. On success, a new captain is created in the database, and a JSON Web Token (JWT) is generated and returned along with the captain details.

**Request Body:**

| Field                     | Type    | Requirements                                                         | Description                                            |
|---------------------------|---------|----------------------------------------------------------------------|--------------------------------------------------------|
| `email`                   | String  | Valid email format                                                   | The captain's email address.                           |
| `fullname.firstname`      | String  | Minimum length: 3 characters                                         | The captain's first name.                              |
| `fullname.lastname`       | String  | Required                                                             | The captain's last name.                               |
| `password`                | String  | Minimum length: 6 characters                                         | The captain's password.                                |
| `vechile.color`           | String  | Minimum length: 3 characters                                         | The color of the vehicle.                              |
| `vechile.plate`           | String  | Minimum length: 3 characters                                         | The vehicle's plate number.                            |
| `vechile.capacity`        | Number  | Must be an integer with a minimum value of 1                         | The capacity of the vehicle.                           |
| `vechile.vechileType`     | String  | Must be one of: `bike`, `car`, or `auto`                             | The type of the vehicle.                               |

**Example Request:**
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Alex",
    "lastname": "Smith"
  },
  "password": "securePassword",
  "vechile": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vechileType": "car"
  }
}
```

**Success Response:**

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alex",
        "lastname": "Smith"
      },
      "email": "captain@example.com",
      "vechile": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vechileType": "car"
      }
      // ...additional captain properties...
    }
  }
  ```

**Error Responses:**

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vechile.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vechile.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be a number",
          "param": "vechile.capacity",
          "location": "body"
        },
        {
          "msg": "Invalid vehicle type",
          "param": "vechile.vechileType",
          "location": "body"
        }
      ]
    }
    ```
  
- **Already Exists Error**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "message": "Captain Already Exist"
    }
    ```

- **Internal Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Description:** An error occurred during the registration process.

---

### 3.2 Captain Login Endpoint

**URL:** `/captain/login`  
**HTTP Method:** `POST`

**Description:**  
Logs in an existing captain by validating the credentials. Upon successful authentication, a JWT token is generated and returned along with the captain's details.

**Request Body:**

| Field      | Type   | Requirements                             | Description                              |
|------------|--------|------------------------------------------|------------------------------------------|
| `email`    | String | Valid email format                       | The captain's email address.             |
| `password` | String | Minimum length: 6 characters             | The captain's password.                  |

**Example Request:**
```json
{
  "email": "captain@example.com",
  "password": "securePassword"
}
```

**Success Response:**

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "jwttoken": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alex",
        "lastname": "Smith"
      },
      "email": "captain@example.com",
      "vechile": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vechileType": "car"
      }
      // ...additional captain properties...
    }
  }
  ```

**Error Responses:**

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Authentication Failure**
  - **Status Code:** `401 Unauthorized`
  - **Response Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Internal Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Description:** An error occurred during the login process.

---

### 3.3 Captain Profile Endpoint

**URL:** `/captain/profile`  
**HTTP Method:** `GET`

**Description:**  
Retrieves the profile details of the authenticated captain.

**Authentication:**  
Requires a valid JWT token provided in the cookie or the Authorization header. Uses the `authCaptain` middleware.

**Success Response:**

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "captain": {
      // Captain's profile information...
    }
  }
  ```

**Error Responses:**  
If the token is invalid or not provided, a `401 Unauthorized` error is returned.

---

### 3.4 Captain Logout Endpoint

**URL:** `/captain/logout`  
**HTTP Method:** `GET`

**Description:**  
Logs out the captain by clearing the authentication cookie and blacklisting the token to prevent future use.

**Authentication:**  
Requires a valid JWT token provided in the cookie or Authorization header.

**Success Response:**

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logout successfully"
  }
  ```

**Error Responses:**  
If the token is missing, invalid, or already blacklisted, a `401 Unauthorized` response is returned.

---
