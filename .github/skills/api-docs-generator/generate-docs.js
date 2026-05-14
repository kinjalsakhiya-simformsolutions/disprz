#!/usr/bin/env node

/**
 * API Documentation Generator
 *
 * Generates a comprehensive API_DOCS.md file with sample API endpoints,
 * including request/response formats, parameters, and JSON examples.
 *
 * Usage: node generate-docs.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoints configuration
const endpoints = [
  {
    method: "GET",
    path: "/api/users",
    name: "Get All Users",
    description: "Retrieve a paginated list of all users in the system.",
    parameters: [
      {
        name: "limit",
        type: "integer",
        required: false,
        description:
          "Maximum number of users to return (default: 10, max: 100)",
      },
      {
        name: "offset",
        type: "integer",
        required: false,
        description: "Number of records to skip for pagination (default: 0)",
      },
      {
        name: "role",
        type: "string",
        required: false,
        description: "Filter by user role (admin, user)",
      },
    ],
    requestExample: "GET /api/users?limit=10&offset=0",
    responseFields: [
      { name: "users", type: "array", description: "Array of user objects" },
      {
        name: "users[].id",
        type: "string",
        description: "Unique user identifier",
      },
      { name: "users[].name", type: "string", description: "User full name" },
      {
        name: "users[].email",
        type: "string",
        description: "User email address",
      },
      {
        name: "users[].role",
        type: "string",
        description: "User role (admin or user)",
      },
      {
        name: "users[].created_at",
        type: "string",
        description: "ISO 8601 timestamp when user was created",
      },
      {
        name: "total",
        type: "integer",
        description: "Total number of users available",
      },
      {
        name: "limit",
        type: "integer",
        description: "Limit parameter used in request",
      },
      {
        name: "offset",
        type: "integer",
        description: "Offset parameter used in request",
      },
    ],
    successResponse: {
      users: [
        {
          id: "usr_123456",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          created_at: "2026-01-15T10:30:00Z",
        },
        {
          id: "usr_789012",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "admin",
          created_at: "2026-01-16T14:45:00Z",
        },
      ],
      total: 2,
      limit: 10,
      offset: 0,
    },
    errorResponses: [
      {
        status: 400,
        error: "bad_request",
        message: "Invalid query parameters",
        example: {
          error: "bad_request",
          message: "limit must be between 1 and 100",
          code: "INVALID_LIMIT",
        },
      },
      {
        status: 401,
        error: "unauthorized",
        message: "Authentication required",
        example: {
          error: "unauthorized",
          message: "Authentication required",
          code: "AUTH_REQUIRED",
        },
      },
    ],
  },
  {
    method: "POST",
    path: "/api/users",
    name: "Create User",
    description: "Create a new user account in the system.",
    parameters: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "User full name (2-100 characters)",
      },
      {
        name: "email",
        type: "string",
        required: true,
        description: "User email address (must be unique)",
      },
      {
        name: "password",
        type: "string",
        required: true,
        description: "Password (minimum 8 characters)",
      },
      {
        name: "role",
        type: "string",
        required: false,
        description: "User role: admin or user (default: user)",
      },
    ],
    requestExample: {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "secure_password_123",
      role: "user",
    },
    responseFields: [
      { name: "id", type: "string", description: "Unique user identifier" },
      { name: "name", type: "string", description: "User full name" },
      { name: "email", type: "string", description: "User email address" },
      { name: "role", type: "string", description: "User role" },
      {
        name: "created_at",
        type: "string",
        description: "ISO 8601 timestamp when user was created",
      },
    ],
    successResponse: {
      id: "usr_999888",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "user",
      created_at: "2026-05-14T09:22:00Z",
    },
    errorResponses: [
      {
        status: 400,
        error: "bad_request",
        message: "Missing required fields",
        example: {
          error: "bad_request",
          message: "name is required",
          code: "MISSING_FIELD",
        },
      },
      {
        status: 409,
        error: "conflict",
        message: "Email already exists",
        example: {
          error: "conflict",
          message: "Email already in use",
          code: "EMAIL_EXISTS",
        },
      },
    ],
  },
  {
    method: "GET",
    path: "/api/users/{user_id}",
    name: "Get User by ID",
    description: "Retrieve detailed information about a specific user.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The ID of the user to retrieve",
      },
    ],
    requestExample: "GET /api/users/usr_123456",
    responseFields: [
      { name: "id", type: "string", description: "Unique user identifier" },
      { name: "name", type: "string", description: "User full name" },
      { name: "email", type: "string", description: "User email address" },
      { name: "role", type: "string", description: "User role" },
      {
        name: "created_at",
        type: "string",
        description: "ISO 8601 timestamp when user was created",
      },
      {
        name: "updated_at",
        type: "string",
        description: "ISO 8601 timestamp when user was last updated",
      },
    ],
    successResponse: {
      id: "usr_123456",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      created_at: "2026-01-15T10:30:00Z",
      updated_at: "2026-05-14T15:20:00Z",
    },
    errorResponses: [
      {
        status: 404,
        error: "not_found",
        message: "User not found",
        example: {
          error: "not_found",
          message: "User not found",
          code: "USER_NOT_FOUND",
        },
      },
    ],
  },
  {
    method: "PUT",
    path: "/api/users/{user_id}",
    name: "Update User",
    description:
      "Update user information. Only the fields provided will be updated.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The ID of the user to update",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "Updated user name",
      },
      {
        name: "email",
        type: "string",
        required: false,
        description: "Updated email address",
      },
      {
        name: "role",
        type: "string",
        required: false,
        description: "Updated user role",
      },
    ],
    requestExample: {
      name: "John Smith",
      role: "admin",
    },
    responseFields: [
      { name: "id", type: "string", description: "Unique user identifier" },
      { name: "name", type: "string", description: "User full name" },
      { name: "email", type: "string", description: "User email address" },
      { name: "role", type: "string", description: "User role" },
      {
        name: "updated_at",
        type: "string",
        description: "ISO 8601 timestamp when user was last updated",
      },
    ],
    successResponse: {
      id: "usr_123456",
      name: "John Smith",
      email: "john@example.com",
      role: "admin",
      updated_at: "2026-05-14T15:20:00Z",
    },
    errorResponses: [
      {
        status: 400,
        error: "bad_request",
        message: "Invalid update data",
        example: {
          error: "bad_request",
          message: "role must be admin or user",
          code: "INVALID_ROLE",
        },
      },
      {
        status: 404,
        error: "not_found",
        message: "User not found",
        example: {
          error: "not_found",
          message: "User not found",
          code: "USER_NOT_FOUND",
        },
      },
    ],
  },
  {
    method: "DELETE",
    path: "/api/users/{user_id}",
    name: "Delete User",
    description:
      "Permanently delete a user account. This action cannot be undone.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The ID of the user to delete",
      },
    ],
    requestExample: "DELETE /api/users/usr_123456",
    responseFields: [
      { name: "message", type: "string", description: "Confirmation message" },
    ],
    successResponse: {
      message: "User deleted successfully",
    },
    errorResponses: [
      {
        status: 404,
        error: "not_found",
        message: "User not found",
        example: {
          error: "not_found",
          message: "User not found",
          code: "USER_NOT_FOUND",
        },
      },
    ],
  },
];

/**
 * Generate parameter table for an endpoint
 */
function generateParameterTable(parameters) {
  if (!parameters || parameters.length === 0) return "";

  let table = "\n| Parameter | Type | Required | Description |\n";
  table += "|-----------|------|----------|-------------|\n";

  parameters.forEach((param) => {
    const required = param.required ? "Yes" : "No";
    table += `| \`${param.name}\` | ${param.type} | ${required} | ${param.description} |\n`;
  });

  return table;
}

/**
 * Generate response fields table
 */
function generateResponseTable(fields) {
  if (!fields || fields.length === 0) return "";

  let table = "\n| Field | Type | Description |\n";
  table += "|-------|------|-------------|\n";

  fields.forEach((field) => {
    table += `| \`${field.name}\` | ${field.type} | ${field.description} |\n`;
  });

  return table;
}

/**
 * Generate documentation for a single endpoint
 */
function generateEndpointDoc(endpoint) {
  let doc = `## ${endpoint.method} ${endpoint.path}\n\n`;
  doc += `**${endpoint.name}**\n\n`;
  doc += `${endpoint.description}\n\n`;

  // Endpoint info
  doc += `### Endpoint\n\n`;
  doc += `\`\`\`\n${endpoint.method} ${endpoint.path}\n\`\`\`\n\n`;

  // Parameters
  if (endpoint.parameters && endpoint.parameters.length > 0) {
    doc += `### Parameters\n`;
    doc += generateParameterTable(endpoint.parameters);
    doc += "\n";
  }

  // Request example
  doc += `### Request Example\n\n`;
  if (typeof endpoint.requestExample === "string") {
    doc += `\`\`\`bash\ncurl -X ${endpoint.method} "http://api.example.com${endpoint.requestExample}"\n\`\`\`\n\n`;
  } else {
    doc += `\`\`\`bash\ncurl -X ${endpoint.method} "http://api.example.com${endpoint.path}" \\\n`;
    doc += `  -H "Content-Type: application/json" \\\n`;
    doc += `  -d '${JSON.stringify(endpoint.requestExample)}'\n\`\`\`\n\n`;
  }

  // Response format
  doc += `### Response Format\n`;
  doc += generateResponseTable(endpoint.responseFields);
  doc += "\n";

  // Success response
  doc += `### Success Response (HTTP 200)\n\n`;
  doc += `\`\`\`json\n${JSON.stringify(endpoint.successResponse, null, 2)}\n\`\`\`\n\n`;

  // Error responses
  if (endpoint.errorResponses && endpoint.errorResponses.length > 0) {
    doc += `### Error Responses\n\n`;
    endpoint.errorResponses.forEach((error) => {
      doc += `**HTTP ${error.status} - ${error.message}**\n\n`;
      doc += `\`\`\`json\n${JSON.stringify(error.example, null, 2)}\n\`\`\`\n\n`;
    });
  }

  return doc;
}

/**
 * Generate complete API documentation
 */
function generateDocumentation() {
  let doc = `# API Documentation

Complete API reference with all available endpoints, parameters, and examples.

**Base URL:** \`http://api.example.com\`

**Authentication:** Include your API token in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

---

## Table of Contents

`;

  // Generate TOC
  endpoints.forEach((endpoint) => {
    doc += `- [${endpoint.method} ${endpoint.path}](#${endpoint.method.toLowerCase()}-${endpoint.path.replace(/\//g, "").replace(/{|}/g, "")})\n`;
  });

  doc += "\n---\n\n";

  // Generate endpoint documentation
  endpoints.forEach((endpoint) => {
    doc += generateEndpointDoc(endpoint);
    doc += "---\n\n";
  });

  // Add footer
  doc += `## Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success - Request completed successfully |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters or missing required fields |
| 401 | Unauthorized - Authentication required or invalid token |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error - Server encountered an error |

## Error Response Format

All error responses follow this format:

\`\`\`json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "code": "ERROR_CODE"
}
\`\`\`

## Rate Limiting

API requests are limited to 1000 requests per hour per API token. Responses include rate limit information in headers:

- \`X-RateLimit-Limit\`: Maximum requests per hour
- \`X-RateLimit-Remaining\`: Requests remaining in current window
- \`X-RateLimit-Reset\`: Unix timestamp when limit resets

## Pagination

List endpoints support pagination with \`limit\` and \`offset\` parameters:

- \`limit\`: Number of results per page (default: 10, max: 100)
- \`offset\`: Number of results to skip (default: 0)

Example: \`GET /api/users?limit=20&offset=40\` returns results 40-59.

## Date Format

All timestamps are in ISO 8601 format:

\`\`\`
2026-05-14T09:22:00Z
\`\`\`

## Support

For questions or issues with the API, contact: support@example.com

---

**Generated:** ${new Date().toISOString()}
`;

  return doc;
}

/**
 * Write documentation to file
 */
function writeDocs(content) {
  const outputPath = path.join(process.cwd(), "API_DOCS.md");

  try {
    fs.writeFileSync(outputPath, content, "utf8");
    console.log(`✅ API documentation generated: ${outputPath}`);
    console.log(`📄 Total endpoints documented: ${endpoints.length}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing documentation:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log("🚀 Generating API documentation...\n");

  const documentation = generateDocumentation();
  const success = writeDocs(documentation);

  if (success) {
    console.log("\n✨ Documentation generation complete!");
    process.exit(0);
  } else {
    console.error("\n❌ Documentation generation failed!");
    process.exit(1);
  }
}

// Run the script
main();

export { generateDocumentation, endpoints };
