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