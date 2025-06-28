const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { generateUser, generateUsers } = require('./utils/userGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting for monetization
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Rate limit exceeded',
    message: 'Too many requests, please upgrade to premium plan',
    upgradeUrl: 'https://rapidapi.com/your-api-premium'
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Fake User Data API',
    version: '1.0.0',
    description: 'An API that generates realistic fake user data for testing and development',
    pricing: {
      basic: '$0.00/month - 100 requests',
      pro: '$10.00/month - 1,000 requests',
      ultra: '$25.00/month - 10,000 requests'
    },
    endpoints: {
      'GET /user': 'Generate 1 fake user',
      'GET /users?count=10': 'Generate multiple fake users (default: 10, max: 100)',
      'GET /users/csv?count=10': 'Generate users in CSV format (PRO/ULTRA)',
      'GET /users/xml?count=10': 'Generate users in XML format (PRO/ULTRA)',
      'GET /health': 'Health check',
      'GET /ping': 'Simple health check for monitoring'
    },
    example: {
      single: '/user',
      multiple: '/users?count=5',
      premium: '/users/csv?count=10'
    },
    documentation: 'https://rapidapi.com/hub/fake-user-data-api'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    service: 'Fake User Data API'
  });
});

// Simple ping endpoint for monitoring
app.get('/ping', (req, res) => {
  res.json({
    status: 'OK',
    message: 'pong',
    timestamp: new Date().toISOString()
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

// Premium: Generate users in CSV format
app.get('/users/csv', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    
    if (count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid count parameter',
        message: 'Count must be between 1 and 100'
      });
    }

    const users = generateUsers(count);
    
    // Convert to CSV
    const csvHeader = 'id,first_name,last_name,full_name,email,phone,street,city,state,country,postal_code,age,gender,birthday,company,job_title,department\n';
    const csvRows = users.map(user => 
      `${user.id},${user.name.first},${user.name.last},${user.name.full},${user.email},${user.phone},${user.address.street},${user.address.city},${user.address.state},${user.address.country},${user.address.postalCode},${user.profile.age},${user.profile.gender},${user.profile.birthday},${user.employment.company},${user.employment.jobTitle},${user.employment.department}`
    ).join('\n');
    
    const csv = csvHeader + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate CSV data',
      message: error.message
    });
  }
});

// Premium: Generate users in XML format
app.get('/users/xml', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    
    if (count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid count parameter',
        message: 'Count must be between 1 and 100'
      });
    }

    const users = generateUsers(count);
    
    // Convert to XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';
    users.forEach(user => {
      xml += `  <user id="${user.id}">\n`;
      xml += `    <name>\n`;
      xml += `      <first>${user.name.first}</first>\n`;
      xml += `      <last>${user.name.last}</last>\n`;
      xml += `      <full>${user.name.full}</full>\n`;
      xml += `    </name>\n`;
      xml += `    <email>${user.email}</email>\n`;
      xml += `    <phone>${user.phone}</phone>\n`;
      xml += `    <address>\n`;
      xml += `      <street>${user.address.street}</street>\n`;
      xml += `      <city>${user.address.city}</city>\n`;
      xml += `      <state>${user.address.state}</state>\n`;
      xml += `      <country>${user.address.country}</country>\n`;
      xml += `      <postalCode>${user.address.postalCode}</postalCode>\n`;
      xml += `    </address>\n`;
      xml += `    <profile>\n`;
      xml += `      <photo>${user.profile.photo}</photo>\n`;
      xml += `      <age>${user.profile.age}</age>\n`;
      xml += `      <gender>${user.profile.gender}</gender>\n`;
      xml += `      <birthday>${user.profile.birthday}</birthday>\n`;
      xml += `    </profile>\n`;
      xml += `    <employment>\n`;
      xml += `      <company>${user.employment.company}</company>\n`;
      xml += `      <jobTitle>${user.employment.jobTitle}</jobTitle>\n`;
      xml += `      <department>${user.employment.department}</department>\n`;
      xml += `    </employment>\n`;
      xml += `  </user>\n`;
    });
    xml += '</users>';
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xml');
    res.send(xml);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate XML data',
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
    availableEndpoints: ['GET /', 'GET /health', 'GET /ping', 'GET /user', 'GET /users', 'GET /users/csv', 'GET /users/xml']
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
  console.log(`🏥 Health Check: http://localhost:${PORT}/ping`);
  console.log(`💰 Premium: http://localhost:${PORT}/users/csv?count=10`);
});

module.exports = app; 