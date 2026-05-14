# API Documentation

Complete API reference with all available endpoints, parameters, and examples.

**Base URL:** `http://api.example.com`

**Authentication:** Include your API token in the Authorization header:

```
Authorization: Bearer YOUR_API_TOKEN
```

---

## Table of Contents

- [GET /api/users](#get-apiusers)
- [POST /api/users](#post-apiusers)
- [GET /api/users/{user_id}](#get-apiusersuser_id)
- [PUT /api/users/{user_id}](#put-apiusersuser_id)
- [DELETE /api/users/{user_id}](#delete-apiusersuser_id)

---

## GET /api/users

**Get All Users**

Retrieve a paginated list of all users in the system.

### Endpoint

```
GET /api/users
```

### Parameters

| Parameter | Type    | Required | Description                                               |
| --------- | ------- | -------- | --------------------------------------------------------- |
| `limit`   | integer | No       | Maximum number of users to return (default: 10, max: 100) |
| `offset`  | integer | No       | Number of records to skip for pagination (default: 0)     |
| `role`    | string  | No       | Filter by user role (admin, user)                         |

### Request Example

```bash
curl -X GET "http://api.example.comGET /api/users?limit=10&offset=0"
```

### Response Format

| Field                | Type    | Description                              |
| -------------------- | ------- | ---------------------------------------- |
| `users`              | array   | Array of user objects                    |
| `users[].id`         | string  | Unique user identifier                   |
| `users[].name`       | string  | User full name                           |
| `users[].email`      | string  | User email address                       |
| `users[].role`       | string  | User role (admin or user)                |
| `users[].created_at` | string  | ISO 8601 timestamp when user was created |
| `total`              | integer | Total number of users available          |
| `limit`              | integer | Limit parameter used in request          |
| `offset`             | integer | Offset parameter used in request         |

### Success Response (HTTP 200)

```json
{
  "users": [
    {
      "id": "usr_123456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2026-01-15T10:30:00Z"
    },
    {
      "id": "usr_789012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin",
      "created_at": "2026-01-16T14:45:00Z"
    }
  ],
  "total": 2,
  "limit": 10,
  "offset": 0
}
```

### Error Responses

**HTTP 400 - Invalid query parameters**

```json
{
  "error": "bad_request",
  "message": "limit must be between 1 and 100",
  "code": "INVALID_LIMIT"
}
```

**HTTP 401 - Authentication required**

```json
{
  "error": "unauthorized",
  "message": "Authentication required",
  "code": "AUTH_REQUIRED"
}
```

---

## POST /api/users

**Create User**

Create a new user account in the system.

### Endpoint

```
POST /api/users
```

### Parameters

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `name`     | string | Yes      | User full name (2-100 characters)        |
| `email`    | string | Yes      | User email address (must be unique)      |
| `password` | string | Yes      | Password (minimum 8 characters)          |
| `role`     | string | No       | User role: admin or user (default: user) |

### Request Example

```bash
curl -X POST "http://api.example.com/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","password":"secure_password_123","role":"user"}'
```

### Response Format

| Field        | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `id`         | string | Unique user identifier                   |
| `name`       | string | User full name                           |
| `email`      | string | User email address                       |
| `role`       | string | User role                                |
| `created_at` | string | ISO 8601 timestamp when user was created |

### Success Response (HTTP 200)

```json
{
  "id": "usr_999888",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "user",
  "created_at": "2026-05-14T09:22:00Z"
}
```

### Error Responses

**HTTP 400 - Missing required fields**

```json
{
  "error": "bad_request",
  "message": "name is required",
  "code": "MISSING_FIELD"
}
```

**HTTP 409 - Email already exists**

```json
{
  "error": "conflict",
  "message": "Email already in use",
  "code": "EMAIL_EXISTS"
}
```

---

## GET /api/users/{user_id}

**Get User by ID**

Retrieve detailed information about a specific user.

### Endpoint

```
GET /api/users/{user_id}
```

### Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `user_id` | string | Yes      | The ID of the user to retrieve |

### Request Example

```bash
curl -X GET "http://api.example.comGET /api/users/usr_123456"
```

### Response Format

| Field        | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| `id`         | string | Unique user identifier                        |
| `name`       | string | User full name                                |
| `email`      | string | User email address                            |
| `role`       | string | User role                                     |
| `created_at` | string | ISO 8601 timestamp when user was created      |
| `updated_at` | string | ISO 8601 timestamp when user was last updated |

### Success Response (HTTP 200)

```json
{
  "id": "usr_123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-05-14T15:20:00Z"
}
```

### Error Responses

**HTTP 404 - User not found**

```json
{
  "error": "not_found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

---

## PUT /api/users/{user_id}

**Update User**

Update user information. Only the fields provided will be updated.

### Endpoint

```
PUT /api/users/{user_id}
```

### Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `user_id` | string | Yes      | The ID of the user to update |
| `name`    | string | No       | Updated user name            |
| `email`   | string | No       | Updated email address        |
| `role`    | string | No       | Updated user role            |

### Request Example

```bash
curl -X PUT "http://api.example.com/api/users/{user_id}" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","role":"admin"}'
```

### Response Format

| Field        | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| `id`         | string | Unique user identifier                        |
| `name`       | string | User full name                                |
| `email`      | string | User email address                            |
| `role`       | string | User role                                     |
| `updated_at` | string | ISO 8601 timestamp when user was last updated |

### Success Response (HTTP 200)

```json
{
  "id": "usr_123456",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "admin",
  "updated_at": "2026-05-14T15:20:00Z"
}
```

### Error Responses

**HTTP 400 - Invalid update data**

```json
{
  "error": "bad_request",
  "message": "role must be admin or user",
  "code": "INVALID_ROLE"
}
```

**HTTP 404 - User not found**

```json
{
  "error": "not_found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

---

## DELETE /api/users/{user_id}

**Delete User**

Permanently delete a user account. This action cannot be undone.

### Endpoint

```
DELETE /api/users/{user_id}
```

### Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `user_id` | string | Yes      | The ID of the user to delete |

### Request Example

```bash
curl -X DELETE "http://api.example.comDELETE /api/users/usr_123456"
```

### Response Format

| Field     | Type   | Description          |
| --------- | ------ | -------------------- |
| `message` | string | Confirmation message |

### Success Response (HTTP 200)

```json
{
  "message": "User deleted successfully"
}
```

### Error Responses

**HTTP 404 - User not found**

```json
{
  "error": "not_found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

---

## Common Response Codes

| Code | Description                                                 |
| ---- | ----------------------------------------------------------- |
| 200  | Success - Request completed successfully                    |
| 201  | Created - Resource created successfully                     |
| 400  | Bad Request - Invalid parameters or missing required fields |
| 401  | Unauthorized - Authentication required or invalid token     |
| 404  | Not Found - Resource not found                              |
| 409  | Conflict - Resource already exists (e.g., duplicate email)  |
| 500  | Internal Server Error - Server encountered an error         |

## Error Response Format

All error responses follow this format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per API token. Responses include rate limit information in headers:

- `X-RateLimit-Limit`: Maximum requests per hour
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## Pagination

List endpoints support pagination with `limit` and `offset` parameters:

- `limit`: Number of results per page (default: 10, max: 100)
- `offset`: Number of results to skip (default: 0)

Example: `GET /api/users?limit=20&offset=40` returns results 40-59.

## Date Format

All timestamps are in ISO 8601 format:

```
2026-05-14T09:22:00Z
```

## Support

For questions or issues with the API, contact: support@example.com

---

**Generated:** 2026-05-14T09:07:36.542Z
