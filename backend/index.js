const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

// Route Imports
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const complaintRoutes = require('./routes/complaints');
const technicianRoutes = require('./routes/technician');
const amcRoutes = require('./routes/amc');
const invoiceRoutes = require('./routes/invoices');
const publicRoutes = require('./routes/publicData');
const liftRoutes = require('./routes/lifts');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for development; narrow this down for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logger Middleware
app.use(morgan('dev'));

// Parse JSON request payloads up to 10MB (needed for base64 file uploads like reports/signatures)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', apiLimiter);

// Health Check API
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'RK TRINITY LIFTS Backend API is healthy and running.',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/technician', technicianRoutes);
app.use('/api/amc', amcRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/lifts', liftRoutes);

// Fallback Route for Undefined Endpoints
app.use('*', (req, res, next) => {
  const error = new Error(`Cannot find ${req.originalUrl} on this server.`);
  error.statusCode = 404;
  next(error);
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  Server is running in ${process.env.NODE_ENV || 'development'} mode on PORT ${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});
