# Fake User Data API Documentation

## Overview

The Fake User Data API generates realistic fake user profiles for testing, development, and demo purposes. Each user includes complete profile information including names, emails, addresses, phone numbers, employment details, and profile photos.

## Base URL

```
https://fake-user-data-api-wuds.onrender.com
```

## Authentication

No authentication required. This API is free to use for development and testing purposes.

## Pricing

| Plan | Price | Requests/Month | Features |
|------|-------|----------------|----------|
| **BASIC** | $0.00 | 100 | JSON responses, basic endpoints |
| **PRO** | $10.00 | 1,000 | CSV/XML export, higher limits |
| **ULTRA** | $25.00 | 10,000 | Priority support, custom formats |

---

## 🔍 **1. API Information**
```
GET /
```
**Description:** Get API documentation and available endpoints  
**Response:** API info, pricing, and endpoint list

---

## 👤 **2. Generate Single User**
```
GET /user
```
**Description:** Generate one fake user with complete profile  
**Response:** Single user object with all data

---

## 👥 **3. Generate Multiple Users**
```
GET /users
```
**Query Parameters:**
- `count` (optional): Number of users (1-100, default: 10)

**Examples:**
```
GET /users
GET /users?count=5
GET /users?count=50
```

---

## 📊 **4. Generate Users in CSV Format** *(PRO/ULTRA)*
```
GET /users/csv
```
**Query Parameters:**
- `count` (optional): Number of users (1-100, default: 10)

**Examples:**
```
GET /users/csv
GET /users/csv?count=20
```

**Response:** CSV file download

---

## 📄 **5. Generate Users in XML Format** *(PRO/ULTRA)*
```
GET /users/xml
```
**Query Parameters:**
- `count` (optional): Number of users (1-100, default: 10)

**Examples:**
```
GET /users/xml
GET /users/xml?count=15
```

**Response:** XML file download

---

## 🏥 **6. Health Check (Detailed)**
```
GET /health
```
**Description:** Detailed health status with uptime and version  
**Response:** Service status, uptime, version info

---

## 🏥 **7. Health Check (Simple)**
```
GET /ping
```
**Description:** Simple health check for monitoring  
**Response:** Basic status with timestamp

---

## 📝 **Complete cURL Examples**

```bash
# Get API info
curl https://fake-user-data-api-wuds.onrender.com/

# Get single user
curl https://fake-user-data-api-wuds.onrender.com/user

# Get 5 users
curl https://fake-user-data-api-wuds.onrender.com/users?count=5

# Get 20 users in CSV format (PRO/ULTRA)
curl https://fake-user-data-api-wuds.onrender.com/users/csv?count=20

# Get 10 users in XML format (PRO/ULTRA)
curl https://fake-user-data-api-wuds.onrender.com/users/xml?count=10

# Health check
curl https://fake-user-data-api-wuds.onrender.com/health

# Simple ping
curl https://fake-user-data-api-wuds.onrender.com/ping
```

## 🎯 **Response Examples**

### **Single User Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
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
    }
  }
}
```

### **Multiple Users Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    // Array of user objects
  ]
}
```

### **CSV Response:**
```csv
id,first_name,last_name,full_name,email,phone,street,city,state,country,postal_code,age,gender,birthday,company,job_title,department
uuid,John,Doe,John Doe,john.doe@email.com,+1-555-123-4567,123 Main St,New York,NY,United States,10001,28,male,1995-03-15,Tech Corp,Software Engineer,Technology
```

### **XML Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="uuid">
    <name>
      <first>John</first>
      <last>Doe</last>
      <full>John Doe</full>
    </name>
    <email>john.doe@email.com</email>
    <!-- ... more fields -->
  </user>
</users>
```

## 🚨 **Error Responses**

### **400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid count parameter",
  "message": "Count must be between 1 and 100"
}
```

### **404 Not Found:**
```json
{
  "success": false,
  "error": "Endpoint not found",
  "message": "Route /invalid does not exist",
  "availableEndpoints": ["GET /", "GET /health", "GET /ping", "GET /user", "GET /users", "GET /users/csv", "GET /users/xml"]
}
```

### **429 Rate Limit Exceeded:**
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Too many requests, please upgrade to PRO or ULTRA plan",
  "upgradeUrl": "https://rapidapi.com/your-api-premium"
}
```

## 📊 **Summary**

| Endpoint | Method | Description | Plan Required |
|----------|--------|-------------|---------------|
| `/` | GET | API info & docs | BASIC |
| `/user` | GET | Single user | BASIC |
| `/users` | GET | Multiple users | BASIC |
| `/users/csv` | GET | CSV export | PRO/ULTRA |
| `/users/xml` | GET | XML export | PRO/ULTRA |
| `/health` | GET | Detailed health | BASIC |
| `/ping` | GET | Simple health | BASIC |

**Total: 7 REST API endpoints** 🎉

## 💡 **Usage Tips**

- **Start with BASIC plan** for testing and development
- **Upgrade to PRO** for CSV/XML exports and higher limits
- **Choose ULTRA** for enterprise usage and priority support
- All endpoints return consistent JSON responses
- Rate limits apply based on your subscription plan

---

**Ready to generate realistic test data with ease! 🚀** 