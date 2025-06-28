# Fake User Data API Documentation

## Overview

The Fake User Data API generates realistic fake user profiles for testing, development, and demo purposes. Each user includes complete profile information including names, emails, addresses, phone numbers, employment details, and profile photos.

## Base URL

```
https://fake-user-data-api-wuds.onrender.com
```

## Authentication

No authentication required. This API is free to use for development and testing purposes.

## Endpoints

### 1. Get API Information

**GET** `/`

Returns API documentation and available endpoints.

**Response:**
```json
{
  "message": "Fake User Data API",
  "version": "1.0.0",
  "description": "An API that generates realistic fake user data for testing and development",
  "endpoints": {
    "GET /user": "Generate 1 fake user",
    "GET /users?count=10": "Generate multiple fake users (default: 10, max: 100)",
    "GET /health": "Health check",
    "GET /ping": "Simple health check for monitoring"
  },
  "example": {
    "single": "/user",
    "multiple": "/users?count=5"
  }
}
```

### 2. Generate Single User

**GET** `/user`

Generates a single fake user with complete profile data.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "fb80075f-0973-474e-939c-0f2c877d0ff7",
    "name": {
      "first": "John",
      "last": "Doe",
      "full": "John Doe"
    },
    "email": "john.doe@email.com",
    "phone": "+1-555-123-4567",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "postalCode": "10001",
      "full": "123 Main St, New York, NY, United States 10001"
    },
    "profile": {
      "photo": "https://randomuser.me/api/portraits/men/45.jpg",
      "age": 28,
      "gender": "male",
      "birthday": "1995-03-15"
    },
    "employment": {
      "company": "Tech Corp",
      "jobTitle": "Software Engineer",
      "department": "Technology"
    },
    "location": {
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.0060
      }
    },
    "createdAt": "2023-01-15T10:30:00.000Z",
    "updatedAt": "2023-12-01T14:20:00.000Z"
  }
}
```

### 3. Generate Multiple Users

**GET** `/users`

Generates multiple fake users.

**Query Parameters:**
- `count` (optional): Number of users to generate (1-100, default: 10)

**Example Request:**
```
GET /users?count=5
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "uuid-1",
      "name": {
        "first": "Jane",
        "last": "Smith",
        "full": "Jane Smith"
      },
      "email": "jane.smith@email.com",
      "phone": "+1-555-987-6543",
      "address": {
        "street": "456 Oak Ave",
        "city": "Los Angeles",
        "state": "CA",
        "country": "United States",
        "postalCode": "90210",
        "full": "456 Oak Ave, Los Angeles, CA, United States 90210"
      },
      "profile": {
        "photo": "https://randomuser.me/api/portraits/women/32.jpg",
        "age": 25,
        "gender": "female",
        "birthday": "1998-07-22"
      },
      "employment": {
        "company": "Design Studio",
        "jobTitle": "UX Designer",
        "department": "Design"
      },
      "location": {
        "coordinates": {
          "latitude": 34.0522,
          "longitude": -118.2437
        }
      }
    }
    // ... more users
  ]
}
```

### 4. Health Check

**GET** `/health`

Returns detailed health status of the API.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T14:20:00.000Z",
  "uptime": 3600.5,
  "version": "1.0.0",
  "service": "Fake User Data API"
}
```

### 5. Simple Health Check

**GET** `/ping`

Returns a simple health check response for monitoring.

**Response:**
```json
{
  "status": "OK",
  "message": "pong",
  "timestamp": "2023-12-01T14:20:00.000Z"
}
```

## Data Structure

### User Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique UUID identifier |
| `name` | object | User's name information |
| `name.first` | string | First name |
| `name.last` | string | Last name |
| `name.full` | string | Full name |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `address` | object | Complete address information |
| `address.street` | string | Street address |
| `address.city` | string | City |
| `address.state` | string | State/Province |
| `address.country` | string | Country |
| `address.postalCode` | string | Postal/ZIP code |
| `address.full` | string | Complete formatted address |
| `profile` | object | Profile information |
| `profile.photo` | string | Profile photo URL |
| `profile.age` | number | Age (18-65) |
| `profile.gender` | string | Gender (male/female) |
| `profile.birthday` | string | Birthday (YYYY-MM-DD) |
| `employment` | object | Employment information |
| `employment.company` | string | Company name |
| `employment.jobTitle` | string | Job title |
| `employment.department` | string | Department |
| `location` | object | Geographic location |
| `location.coordinates` | object | Latitude and longitude |
| `createdAt` | string | Account creation date |
| `updatedAt` | string | Last update date |

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid count parameter",
  "message": "Count must be between 1 and 100"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Endpoint not found",
  "message": "Route /invalid does not exist",
  "availableEndpoints": ["GET /", "GET /health", "GET /ping", "GET /user", "GET /users"]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to generate user data"
}
```

## Usage Examples

### JavaScript (Fetch)
```javascript
// Get single user
fetch('https://fake-user-data-api-wuds.onrender.com/user')
  .then(response => response.json())
  .then(data => console.log(data.data));

// Get multiple users
fetch('https://fake-user-data-api-wuds.onrender.com/users?count=5')
  .then(response => response.json())
  .then(data => console.log(data.data));
```

### cURL
```bash
# Get single user
curl https://fake-user-data-api-wuds.onrender.com/user

# Get 5 users
curl https://fake-user-data-api-wuds.onrender.com/users?count=5

# Health check
curl https://fake-user-data-api-wuds.onrender.com/ping
```

### Python (requests)
```python
import requests

# Get single user
response = requests.get('https://fake-user-data-api-wuds.onrender.com/user')
user = response.json()['data']

# Get multiple users
response = requests.get('https://fake-user-data-api-wuds.onrender.com/users?count=3')
users = response.json()['data']
```

## Rate Limits

Currently, there are no rate limits imposed. However, please use responsibly for development and testing purposes.

## Terms of Use

- Use for development and testing only
- Not for production use with real user data
- No guarantee of data accuracy or consistency
- Service availability may vary

## Support

For issues or questions, please refer to the API documentation or contact the developer.

---

**Happy coding! 🚀** 