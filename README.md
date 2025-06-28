# Fake User Data API 🚀

API to generate dummy user data with random names, emails, addresses, and profile photos from around the world. Similar to randomuser.me, very useful for UI/UX testing and development.

## ✨ Features

- ✅ Generate 1 fake user or multiple users
- ✅ Complete data: name, email, address, profile photo
- ✅ **Data from all countries** (global, not just specific regions)
- ✅ Profile photos from various services (pravatar.cc, randomuser.me, picsum)
- ✅ Additional data: age, gender, employment, location
- ✅ CORS enabled for frontend development
- ✅ Security headers and input validation
- ✅ Health check endpoint

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Run Production Server
```bash
npm start
```

Server will run on `http://localhost:3000`

## 📖 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Get Single User
```http
GET /user
```

**Response:**
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
    },
    "createdAt": "2023-01-15T10:30:00.000Z",
    "updatedAt": "2023-12-01T14:20:00.000Z"
  }
}
```

### 2. Get Multiple Users
```http
GET /users?count=10
```

**Parameters:**
- `count` (optional): Number of users to generate (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    // Array of user objects from various countries
  ]
}
```

### 3. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T14:20:00.000Z",
  "uptime": 3600.5
}
```

### 4. API Documentation
```http
GET /
```

**Response:**
```json
{
  "message": "Fake User Data API",
  "version": "1.0.0",
  "endpoints": {
    "GET /user": "Generate 1 fake user",
    "GET /users?count=10": "Generate multiple fake users (default: 10, max: 100)",
    "GET /health": "Health check"
  },
  "example": {
    "single": "/user",
    "multiple": "/users?count=5"
  }
}
```

## 🌍 Global Data

This API generates user data from **around the world**, not just specific regions:
- **Names**: Various names from different cultures
- **Addresses**: Cities, countries, and postal codes from around the world
- **Phone**: International phone number formats
- **Location**: Global geographic coordinates

## 🔧 Usage Examples

### Frontend (JavaScript)
```javascript
// Get single user
fetch('http://localhost:3000/user')
  .then(response => response.json())
  .then(data => console.log(data.data));

// Get multiple users
fetch('http://localhost:3000/users?count=5')
  .then(response => response.json())
  .then(data => console.log(data.data));
```

### Frontend (React)
```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users?count=10')
      .then(res => res.json())
      .then(data => setUsers(data.data));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.profile.photo} alt={user.name.full} />
          <h3>{user.name.full}</h3>
          <p>{user.email}</p>
          <p>{user.address.full}</p>
          <p>Country: {user.address.country}</p>
        </div>
      ))}
    </div>
  );
}
```

### Backend (Node.js)
```javascript
const axios = require('axios');

// Get single user
const getUser = async () => {
  const response = await axios.get('http://localhost:3000/user');
  return response.data.data;
};

// Get multiple users
const getUsers = async (count = 10) => {
  const response = await axios.get(`http://localhost:3000/users?count=${count}`);
  return response.data.data;
};
```

### cURL Examples
```bash
# Get single user
curl http://localhost:3000/user

# Get 5 users
curl http://localhost:3000/users?count=5

# Health check
curl http://localhost:3000/health
```

## 🧪 Testing

### API Testing
```bash
# Test single user
curl -s http://localhost:3000/user | jq

# Test multiple users
curl -s http://localhost:3000/users?count=3 | jq

# Test health check
curl -s http://localhost:3000/health | jq
```

## 🛠️ Development

### Project Structure
```
Fake-User-Data-API/
├── server.js              # Main server file
├── utils/
│   └── userGenerator.js   # User data generation logic
├── package.json
└── README.md
```

### Available Scripts
- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm test` - Run tests (coming soon)

### Environment Variables
- `PORT` - Server port (default: 3000)

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Parameter validation
- **Error handling** - Comprehensive error responses

## 📊 Data Sources

### Profile Photos
- [pravatar.cc](https://pravatar.cc/) - High-quality avatars
- [randomuser.me](https://randomuser.me/) - Realistic user photos
- [picsum.photos](https://picsum.photos/) - Random images

### Address Data
- **Global cities and countries** via Faker.js
- Realistic street addresses worldwide
- Valid postal codes for various countries

## 🌟 Example Data from Various Countries

This API will generate data like:
- **USA**: John Smith from New York, USA
- **UK**: Emma Wilson from London, UK  
- **Japan**: Yuki Tanaka from Tokyo, Japan
- **Germany**: Hans Mueller from Berlin, Germany
- **Brazil**: Maria Silva from Sao Paulo, Brazil
- **Australia**: James Brown from Sydney, Australia

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [randomuser.me](https://randomuser.me/)
- Built with [Express.js](https://expressjs.com/)
- Data generation with [@faker-js/faker](https://fakerjs.dev/)

---

**Happy Coding! 🎉**
