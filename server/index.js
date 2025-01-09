const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

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
      'https://neomacapital.com',
      'https://api.neomacapital.com'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
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
  maxAge: 86400 // CORS preflight cache for 24 hours
}));

// Add headers for better error handling
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.use(express.json());

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

// Root endpoint with deployment info
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    deployment: process.env.VERCEL_URL ? 'Vercel' : 'Local',
    version: '1.0.0'
  });
});

// Health check endpoint with detailed status
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
        'https://neoma-two.vercel.app'
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

// Import routes
const blogRoutes = require('./routes/blogs')(supabase);
const financialsRoutes = require('./routes/financials')(supabase);

// Add logging middleware for routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Mount routes
app.use('/api/blog-posts', (req, res, next) => {
  console.log('Blog route hit:', req.path);
  next();
}, blogRoutes);

app.use('/api/financial-documents', (req, res, next) => {
  console.log('Financials route hit:', req.path);
  next();
}, financialsRoutes);

// API status endpoint
app.get('/api/status', (req, res) => {
  const routes = {
    health: '/api/health',
    system: '/api/system',
    blogs: '/api/blog-posts',
    financials: '/api/financial-documents'
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