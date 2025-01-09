const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5001;

// Security Configurations
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware Setup
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan('combined')); // Logging
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Environment check logging
console.log('Environment check:', {
  port: port,
  supabaseUrl: process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing',
  hasServiceKey: process.env.SUPABASE_SERVICE_KEY ? '✓ Set' : '✗ Missing',
  nodeEnv: process.env.NODE_ENV || 'development'
});

// CORS Configuration
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://neomacapital.com',
      'https://www.neomacapital.com',
      'https://api.neomacapital.com'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Initialize Supabase with retry mechanism
let supabase;
const initSupabase = async (retries = 3) => {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      {
        auth: { autoRefreshToken: true, persistSession: true }
      }
    );
    console.log('Supabase client initialized successfully');
    return supabase;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying Supabase initialization. Attempts left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return initSupabase(retries - 1);
    }
    console.error('Failed to initialize Supabase client:', error);
    throw error;
  }
};

// API Routes
// Health Check
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
    memory: process.memoryUsage(),
    cors: {
      enabled: true,
      allowedOrigins: corsOptions.origin
    }
  };
  res.json(status);
});

// Import route modules
const blogRoutes = require('./routes/blogs')(supabase);
const financialsRoutes = require('./routes/financials')(supabase);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Mount routes with error handling
app.use('/api/blog-posts', async (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    console.log(`Blog route accessed: ${req.method} ${req.path}`);
    await blogRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/financial-documents', async (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    console.log(`Financials route accessed: ${req.method} ${req.path}`);
    await financialsRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

// API Documentation route
app.get('/api/docs', (req, res) => {
  const apiDocs = {
    version: '1.0.0',
    endpoints: {
      health: {
        path: '/api/health',
        method: 'GET',
        description: 'Service health check'
      },
      blogs: {
        path: '/api/blog-posts',
        methods: ['GET', 'POST'],
        description: 'Blog posts management'
      },
      financials: {
        path: '/api/financial-documents',
        methods: ['GET', 'POST'],
        description: 'Financial documents management'
      }
    }
  };
  res.json(apiDocs);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Send appropriate error response
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : err.message,
      status: status,
      path: req.path,
      timestamp: new Date().toISOString()
    }
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Server Startup
const startServer = async () => {
  try {
    await initSupabase();
    
    app.listen(port, () => {
      console.log(`
╔════════════════════════════════════════╗
║         Neoma Capital API Server       ║
╠════════════════════════════════════════╣
║                                        ║
║  Production: api.neomacapital.com      ║
║  Environment: ${process.env.NODE_ENV || 'development'}                ║
║  Supabase: Connected                   ║
║  Port: ${port}                         ║
║                                        ║
║  Health: /api/health                   ║
║  Docs: /api/docs                       ║
║                                        ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Graceful shutdown
  process.exit(1);
});

// Start the server
startServer();