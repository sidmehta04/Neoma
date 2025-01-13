const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Environment check logging
console.log('Environment check:', {
  port: port,
  supabaseUrl: process.env.SUPABASE_URL,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY,
  nodeEnv: process.env.NODE_ENV
});

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://neoma-tsta.vercel.app',
      'https://neoma-two.vercel.app',
      'https://www.neomacapital.com',
      'https://api.neomacapital.com',
      'https://ipapi.co/json/'
    ];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 86400
}));

// Basic middleware setup
app.use(express.json());
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Initialize Supabase client
let supabase;
try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
    timestamp: new Date().toISOString()
  }
});

// Import routes
const blogRoutes = require('./routes/blogs')(supabase);
const financialsRoutes = require('./routes/financials')(supabase);
const contactRoutes = require('./routes/contact')(supabase);
const sharesRoutes = require('./routes/shares')(supabase);
const contactFormRoutes = require('./routes/contact-form')(supabase);
const shareDetailRoutes = require('./routes/shares-detail')(supabase);
const companiesRoutes = require('./routes/companies')(supabase);
const visitorTrackingRoutes = require('./routes/tracker')(supabase);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    deployment: process.env.VERCEL_URL ? 'Vercel' : 'Local',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const status = {
    service: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    supabase: !!supabase ? 'connected' : 'not connected',
    deployment: {
      platform: process.env.VERCEL_URL ? 'Vercel' : 'Local',
      url: process.env.VERCEL_URL || `http://localhost:${port}`,
      region: process.env.VERCEL_REGION || 'local'
    },
    cors: {
      enabled: true,
      allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://neoma-tsta.vercel.app',
        'https://neoma-two.vercel.app',
        'https://www.neomacapital.com',
        'https://api.neomacapital.com',
        'https://ipapi.co/json/'
      ]
    }
  };
  
  res.json(status);
});

// System info endpoint
app.get('/api/system', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    pid: process.pid,
    uptime: process.uptime()
  });
});

// Mount routes with logging
app.use('/api/analytics', (req, res, next) => {
  console.log('Analytics route hit:', req.path);
  next();
}, visitorTrackingRoutes);

app.use('/api/companies', (req, res, next) => {
  console.log('Companies route hit:', req.path);
  next();
}, companiesRoutes);

app.use('/api/blog-posts', (req, res, next) => {
  console.log('Blog route hit:', req.path);
  next();
}, blogRoutes);

app.use('/api/financial-documents', (req, res, next) => {
  console.log('Financials route hit:', req.path);
  next();
}, financialsRoutes);

app.use('/api/contact', (req, res, next) => {
  console.log('Contact route hit:', req.path);
  next();
}, limiter, contactRoutes);

app.use('/api/shares', (req, res, next) => {
  console.log('Shares route hit:', req.path);
  next();
}, sharesRoutes);

app.use('/api/shares-detail', (req, res, next) => {
  console.log('Shares detail route hit:', req.path);
  next();
}, shareDetailRoutes);

app.use('/api/contact-form', (req, res, next) => {
  console.log('Contact form route hit:', req.path);
  next();
}, contactFormRoutes);

// API status endpoint with all routes
app.get('/api/status', (req, res) => {
  const routes = {
    health: '/api/health',
    system: '/api/system',
    blogs: '/api/blog-posts',
    financials: '/api/financial-documents',
    contact: '/api/contact',
    shares: '/api/shares',
    sharesDetail: '/api/shares-detail',
    contactForm: '/api/contact-form',
    companies: '/api/companies',
    analytics: {
      track: '/api/analytics/track',
      stats: '/api/analytics/stats',
      unique: '/api/analytics/unique'
    }
  };
  
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    availableRoutes: routes,
    environment: process.env.NODE_ENV,
    deployment: {
      url: process.env.VERCEL_URL || `http://localhost:${port}`,
      type: process.env.VERCEL_URL ? 'production' : 'development'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════╗
║         Backend Server Started          ║
╠════════════════════════════════════════╣
║                                        ║
║  Health: http://localhost:${port}/api/health   ║
║  Status: http://localhost:${port}/api/status   ║
║                                        ║
║  Environment: ${process.env.NODE_ENV || 'development'}                ║
║  Supabase: ${!!supabase ? 'Connected' : 'Not Connected'}                    ║
║                                        ║
╚════════════════════════════════════════╝
  `);
});

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;