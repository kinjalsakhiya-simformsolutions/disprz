---
name: API Docs Generator
description: Generate comprehensive API documentation with request/response formats, JSON examples, and beginner-friendly markdown formatting
tags:
  - api
  - documentation
  - rest
  - graphql
  - examples
---

# API Docs Generator

Generate professional API documentation quickly with request and response format specifications, real-world JSON examples, and well-organized markdown output.

## When to Use This Skill

Use **API Docs Generator** when you need to:

- **Create API endpoint documentation** - Document REST or GraphQL endpoints with clear descriptions
- **Generate request/response examples** - Produce realistic JSON payloads for request bodies and responses
- **Document API parameters** - List required and optional parameters with types and descriptions
- **Create onboarding docs** - Build beginner-friendly documentation for API consumers
- **Add missing documentation** - Fill gaps in existing API docs with structured examples
- **Standardize API docs** - Ensure consistent formatting across multiple endpoints

### Common Scenarios

```
✓ "Generate docs for my /users endpoint"
✓ "Create API documentation for authentication"
✓ "Add JSON examples to my endpoint docs"
✓ "Document all endpoints in my REST API"
✓ "Create request/response format guide"
```

## How It Works

The skill generates API documentation using this structured approach:

### 1. **Endpoint Information**

- HTTP method (GET, POST, PUT, DELETE, etc.)
- URL path with route parameters
- Clear description of what the endpoint does

### 2. **Request Format**

- Query parameters (for GET requests)
- Path parameters (in URL)
- Request body structure (for POST/PUT)
- Required vs. optional fields
- Data types for each field

### 3. **Response Format**

- Success response structure (HTTP 200)
- Error responses (4xx, 5xx codes)
- Response fields with descriptions
- Data types and field purposes

### 4. **JSON Examples**

- Real-world request examples
- Success response examples
- Error response examples
- Multiple examples showing different scenarios

### 5. **Markdown Formatting**

- Clear headers and sections
- Code blocks for JSON and examples
- Tables for parameter lists
- Beginner-friendly explanations

## Getting Started

### Example: Document a User List Endpoint

**Your Request:**

```
Generate API docs for a GET /api/users endpoint that:
- Returns a paginated list of users
- Accepts limit and offset query parameters
- Returns user objects with id, name, email, and created_at
```

**Generated Documentation:**

````markdown
## Get All Users

Retrieve a paginated list of all users in the system.

### Endpoint

**GET** `/api/users`

### Query Parameters

| Parameter | Type    | Required | Description                                               |
| --------- | ------- | -------- | --------------------------------------------------------- |
| `limit`   | integer | No       | Maximum number of users to return (default: 10, max: 100) |
| `offset`  | integer | No       | Number of records to skip for pagination (default: 0)     |

### Request Example

```bash
curl -X GET "http://api.example.com/api/users?limit=10&offset=0"
```
````

### Response Format

Returns a JSON object with an array of users.

| Field                | Type    | Description                              |
| -------------------- | ------- | ---------------------------------------- |
| `users`              | array   | Array of user objects                    |
| `users[].id`         | string  | Unique user identifier                   |
| `users[].name`       | string  | User's full name                         |
| `users[].email`      | string  | User's email address                     |
| `users[].created_at` | string  | ISO 8601 timestamp when user was created |
| `total`              | integer | Total number of users available          |
| `limit`              | integer | Limit parameter used in request          |
| `offset`             | integer | Offset parameter used in request         |

### Response Example (Success - HTTP 200)

```json
{
  "users": [
    {
      "id": "usr_123456",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-01-15T10:30:00Z"
    },
    {
      "id": "usr_789012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "created_at": "2026-01-16T14:45:00Z"
    }
  ],
  "total": 2,
  "limit": 10,
  "offset": 0
}
```

### Error Responses

**Invalid Query Parameters (HTTP 400)**

```json
{
  "error": "invalid_request",
  "message": "limit must be between 1 and 100",
  "code": "INVALID_LIMIT"
}
```

**Unauthorized (HTTP 401)**

```json
{
  "error": "unauthorized",
  "message": "Authentication required",
  "code": "AUTH_REQUIRED"
}
```

```

```

## What Makes Good API Documentation

### ✅ DO Include

- **Clear descriptions** - Explain what each endpoint does in simple terms
- **All parameters** - List every query parameter, path parameter, and request body field
- **Data types** - Specify if fields are strings, integers, arrays, objects, booleans, etc.
- **Required fields** - Mark which fields are mandatory vs. optional
- **Real examples** - Show actual JSON with realistic data, not placeholder values
- **Error cases** - Document common errors users might encounter
- **Status codes** - Include HTTP response codes (200, 400, 401, 404, 500, etc.)
- **Field descriptions** - Explain the purpose and format of each field

### ❌ DON'T Forget

- Don't use technical jargon without explanation
- Don't omit error responses
- Don't use unrealistic placeholder data
- Don't forget nested objects and arrays
- Don't skip edge cases (empty results, missing fields, etc.)

## Documentation Structure Template

Use this structure for consistency:

```markdown
## Endpoint Name

[Brief description of what it does]

### Endpoint

**METHOD** `/path`

### Parameters/Headers/Body

[Tables or descriptions]

### Request Example

[curl or code example]

### Response Format

[Table describing response fields]

### Success Response

[JSON example with HTTP 200]

### Error Responses

[JSON examples for 4xx/5xx codes]

### Notes

[Any additional information]
```

## Tips for Better Documentation

### 1. Use Consistent Naming

- Use consistent parameter names across all endpoints
- Match response field names to request field names when possible
- Use camelCase or snake_case consistently

### 2. Show Real Data

- Use realistic IDs, emails, and names
- Include timezone information (use ISO 8601 format)
- Show both success and failure scenarios

### 3. Explain Like You're Teaching

- Assume the reader is new to APIs
- Explain what pagination is before using it
- Define acronyms and technical terms
- Link to related endpoints

### 4. Include Edge Cases

- What happens if no results are found?
- What's the maximum length for string fields?
- What happens with special characters?

### 5. Make It Scannable

- Use headers and subheaders
- Put important info in tables
- Use code blocks for JSON
- Use bullet points for lists

## Examples by API Type

### Example 1: POST Endpoint (Create Resource)

````markdown
## Create User

Create a new user account in the system.

### Endpoint

**POST** `/api/users`

### Request Body

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `name`     | string | Yes      | User's full name (2-100 characters)            |
| `email`    | string | Yes      | User's email (must be unique)                  |
| `password` | string | Yes      | Password (minimum 8 characters)                |
| `role`     | string | No       | User role: "user" or "admin" (default: "user") |

### Request Example

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "secure_password_123",
  "role": "user"
}
```
````

### Response Example (HTTP 201)

```json
{
  "id": "usr_999888",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "user",
  "created_at": "2026-05-14T09:22:00Z"
}
```

### Error Example (HTTP 409 - Email Exists)

```json
{
  "error": "conflict",
  "message": "Email already in use",
  "code": "EMAIL_EXISTS"
}
```

````

### Example 2: DELETE Endpoint

```markdown
## Delete User

Permanently delete a user account. This action cannot be undone.

### Endpoint
**DELETE** `/api/users/{user_id}`

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | string | The ID of the user to delete |

### Request Example

```bash
curl -X DELETE "http://api.example.com/api/users/usr_123456" \
  -H "Authorization: Bearer YOUR_TOKEN"
````

### Response Example (HTTP 204 - No Content)

When successful, the endpoint returns an empty response with status 204.

### Error Example (HTTP 404 - Not Found)

```json
{
  "error": "not_found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

```

## Using This Skill Effectively

### Step 1: Describe Your Endpoint
Provide details about what your endpoint does:
```

Generate docs for POST /api/posts endpoint that creates a blog post

```

### Step 2: Specify Parameters
Tell which parameters/fields it accepts:
```

It takes title (required), content (required), and tags (optional array)

```

### Step 3: Describe Response
Explain what the response looks like:
```

Returns the created post with id, title, content, tags, and created_at

```

### Step 4: Get Formatted Docs
Receive well-formatted markdown documentation with JSON examples

### Step 5: Integrate Into Your Project
Copy the generated markdown into your README or documentation site

## Common Questions

**Q: How detailed should my API docs be?**
A: Include enough detail that someone unfamiliar with your code could use the API. Every parameter, error code, and field should be documented.

**Q: Should I document every error code?**
A: Document common errors (400, 401, 404, 500). You don't need every edge case, but mention what errors users might encounter.

**Q: How often should I update docs?**
A: Update API docs when you add endpoints, change parameters, or modify response formats. Keep them in sync with your code.

**Q: Can I use this for GraphQL?**
A: Yes! Describe your GraphQL query/mutation, and this skill will help format it with examples.

**Q: What's the best way to show nested objects?**
A: Use nested bullet points or create a hierarchy in your parameter table. Show structure clearly in JSON examples.

## Supporting Scripts

Enhance your API documentation workflow with these helpful scripts and tools:

### 1. API Documentation Validator Script

Validate your API documentation for completeness:

```bash
#!/bin/bash
# validate-api-docs.sh
# Checks API documentation for required sections

for file in docs/api/*.md; do
  echo "Checking $file..."
  
  if ! grep -q "## " "$file"; then
    echo "❌ Missing endpoint name"
  fi
  
  if ! grep -q "### Endpoint" "$file"; then
    echo "❌ Missing endpoint specification"
  fi
  
  if ! grep -q "### Request" "$file"; then
    echo "❌ Missing request documentation"
  fi
  
  if ! grep -q "### Response" "$file"; then
    echo "❌ Missing response documentation"
  fi
  
  if ! grep -q "\`\`\`json" "$file"; then
    echo "❌ Missing JSON examples"
  fi
  
  echo "✅ $file validated"
done
```

### 2. JSON Example Generator Script

Generate sample JSON responses from your API:

```javascript
// generate-json-examples.js
// Creates realistic JSON examples for documentation

const fs = require('fs');

function generateExample(endpoint) {
  const examples = {
    'GET /users': {
      users: [
        { id: 'usr_123', name: 'John Doe', email: 'john@example.com', created_at: new Date().toISOString() },
        { id: 'usr_456', name: 'Jane Smith', email: 'jane@example.com', created_at: new Date().toISOString() }
      ],
      total: 2
    },
    'POST /users': {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: 'New User',
      email: 'newuser@example.com',
      created_at: new Date().toISOString()
    },
    'DELETE /users/:id': {
      message: 'User deleted successfully'
    }
  };
  
  return examples[endpoint] || {};
}

// Usage: node generate-json-examples.js "GET /users"
const endpoint = process.argv[2];
console.log(JSON.stringify(generateExample(endpoint), null, 2));
```

### 3. Documentation Template Generator

Quick-start template for new endpoints:

```bash
#!/bin/bash
# generate-doc-template.sh
# Creates a documentation template for a new endpoint

METHOD=${1:-GET}
ENDPOINT=${2:-/api/resource}
DESCRIPTION=${3:-"Describe your endpoint here"}

cat > "docs/api/${METHOD}-${ENDPOINT//\//-}.md" << EOF
## ${METHOD} ${ENDPOINT}

${DESCRIPTION}

### Endpoint

**${METHOD}** \`${ENDPOINT}\`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| | | | |

### Request Example

\`\`\`bash
curl -X ${METHOD} "http://api.example.com${ENDPOINT}"
\`\`\`

### Response Format

| Field | Type | Description |
|-------|------|-------------|
| | | |

### Response Example (HTTP 200)

\`\`\`json
{
  
}
\`\`\`

### Error Responses

**HTTP 400 - Bad Request**

\`\`\`json
{
  "error": "bad_request",
  "message": "Invalid parameters"
}
\`\`\`

EOF

echo "✅ Template created: docs/api/${METHOD}-${ENDPOINT//\//-}.md"
```

Usage:
```bash
./generate-doc-template.sh POST /api/users "Create a new user"
```

### 4. API Docs to OpenAPI Converter

Convert markdown docs to OpenAPI/Swagger format:

```javascript
// markdown-to-openapi.js
// Converts API documentation to OpenAPI format

function convertToOpenAPI(docs) {
  const openapi = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0'
    },
    paths: {}
  };

  docs.forEach(doc => {
    const path = doc.endpoint;
    const method = doc.method.toLowerCase();
    
    openapi.paths[path] = openapi.paths[path] || {};
    openapi.paths[path][method] = {
      summary: doc.description,
      parameters: doc.parameters || [],
      requestBody: doc.requestBody || {},
      responses: doc.responses || {}
    };
  });

  return openapi;
}

module.exports = { convertToOpenAPI };
```

### 5. Link Checker for Documentation

Verify all links in your API docs are valid:

```bash
#!/bin/bash
# check-doc-links.sh
# Validates all links in documentation

echo "Checking links in API documentation..."

for file in docs/api/*.md; do
  echo "📄 Checking $file..."
  
  # Extract all URLs
  grep -oE 'https?://[^\s)]+' "$file" | while read url; do
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "404"; then
      echo "❌ Broken link: $url"
    else
      echo "✅ Valid link: $url"
    fi
  done
done

echo "✓ Link check complete"
```

### 6. Example Request/Response Formatter

Format and validate JSON examples:

```javascript
// format-examples.js
// Ensures all JSON examples are properly formatted

const fs = require('fs');

function formatJSONInMarkdown(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all JSON code blocks
  const jsonRegex = /```json\n([\s\S]*?)```/g;
  
  content = content.replace(jsonRegex, (match, json) => {
    try {
      const formatted = JSON.stringify(JSON.parse(json), null, 2);
      return '```json\n' + formatted + '\n```';
    } catch (e) {
      console.error('Invalid JSON in', filePath, ':', e.message);
      return match;
    }
  });
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Formatted:', filePath);
}

// Usage: node format-examples.js docs/api/users.md
if (process.argv[2]) {
  formatJSONInMarkdown(process.argv[2]);
}
```

### 7. Automated Documentation Build Script

Generate a complete API documentation index:

```bash
#!/bin/bash
# build-docs.sh
# Generates complete API documentation index

OUTPUT_FILE="docs/API.md"

echo "# API Documentation" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Complete API reference with all endpoints, parameters, and examples." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "## Table of Contents" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Generate TOC from individual docs
for file in docs/api/*.md; do
  endpoint=$(grep "^## " "$file" | head -1 | sed 's/## //')
  echo "- [$endpoint]($file)" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"

# Concatenate all docs
for file in docs/api/*.md; do
  echo "" >> "$OUTPUT_FILE"
  cat "$file" >> "$OUTPUT_FILE"
done

echo "✅ Documentation built: $OUTPUT_FILE"
```

### 8. Pre-commit Hook for Docs Validation

Prevent incomplete documentation from being committed:

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Validates API docs before commit

echo "🔍 Validating API documentation..."

ERRORS=0

for file in docs/api/*.md; do
  if ! grep -q "### Response Example" "$file"; then
    echo "❌ Missing Response Example in $file"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -gt 0 ]; then
  echo "❌ Documentation validation failed"
  exit 1
fi

echo "✅ All documentation validated"
exit 0
```

Setup:
```bash
chmod +x .git/hooks/pre-commit
```

### Running Scripts in Your Project

1. **Create a scripts directory:**
   ```bash
   mkdir -p scripts/docs
   ```

2. **Place scripts in the directory:**
   ```bash
   cp *.sh scripts/docs/
   cp *.js scripts/docs/
   ```

3. **Add to package.json:**
   ```json
   {
     "scripts": {
       "docs:validate": "bash scripts/docs/validate-api-docs.sh",
       "docs:generate": "node scripts/docs/generate-json-examples.js",
       "docs:build": "bash scripts/docs/build-docs.sh",
       "docs:format": "node scripts/docs/format-examples.js"
     }
   }
   ```

4. **Run scripts:**
   ```bash
   npm run docs:validate    # Validate documentation
   npm run docs:build       # Build complete docs
   npm run docs:format      # Format JSON examples
   ```

## See Also

- [REST API Best Practices](https://restfulapi.net/)
- [Markdown Syntax Guide](https://www.markdownguide.org/)
- [JSON Format Reference](https://www.json.org/)
- [OpenAPI/Swagger Specification](https://swagger.io/)

---

**Pro Tip:** Generate documentation as you code, not after. It helps catch design issues early and keeps docs in sync with implementation.
```
