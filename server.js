const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { generateUser, generateUsers } = require('./utils/userGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Fake User Data API',
    version: '1.0.0',
    endpoints: {
      'GET /user': 'Generate 1 fake user',
      'GET /users?count=10': 'Generate multiple fake users (default: 10, max: 100)',
      'GET /health': 'Health check'
    },
    example: {
      single: '/user',
      multiple: '/users?count=5'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Generate single user
app.get('/user', (req, res) => {
  try {
    const user = generateUser();
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate user data',
      message: error.message
    });
  }
});

// Generate multiple users
app.get('/users', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    
    // Validate count parameter
    if (count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid count parameter',
        message: 'Count must be between 1 and 100'
      });
    }

    const users = generateUsers(count);
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate users data',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.originalUrl} does not exist`,
    availableEndpoints: ['GET /', 'GET /health', 'GET /user', 'GET /users']
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Fake User Data API running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}`);
  console.log(`🔗 Try: http://localhost:${PORT}/user`);
  console.log(`🔗 Try: http://localhost:${PORT}/users?count=5`);
});

module.exports = app; 