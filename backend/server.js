// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const parentRoutes = require('./routes/parentRoutes');
// const vetRoutes = require('./routes/vetRoutes');
// const resortRoutes = require('./routes/resortRoutes');
// const { errorHandler } = require('./middleware/errorHandler');

// const app = express();

// // Enable trust proxy for Vercel deployment
// app.set('trust proxy', 1);

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });
// app.use(limiter);

// // Allowed origins
// // const allowedOrigins = [
// //   process.env.FRONTENDAPP_URL,
// //   process.env.FRONTENDWEB_URL,
// //   'http://localhost:8081',
// //   'http://localhost:5173'
// // ].filter(Boolean);

// // // CORS
// // app.use(cors({
// //   origin: allowedOrigins,
// //   credentials: true,
// // }));
// app.use(cors({
//   origin: true,   // Reflects the request origin
//   credentials: true,
// }));

// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expo-auth-app')
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch((error) => {
//   console.error('❌ MongoDB connection error:', error);
//   process.exit(1);
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/parents', parentRoutes);
// app.use('/api/vets', vetRoutes);
// app.use('/api/resorts', resortRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

// // Root endpoint
// app.get('/', (req, res) => {
//   res.send("Hello World!!");
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// // Error handler
// app.use(errorHandler);

// /**
//  * 🚨 IMPORTANT:
//  * On Vercel, you must NOT call app.listen()
//  * because Vercel provides its own server runtime.
//  * So we comment this out:
// */
 
//  const PORT = process.env.PORT || 3000;
//  app.listen(PORT, () => {
//    console.log(`🚀 Server running on port ${PORT}`);
//    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8081'}`);
//    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
//  });

// // Export for Vercel
// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// IMPORT YOUR ROUTES
const authRoutes = require('./routes/auth');

const app = express();

/* =========================
   Middleware
========================= */
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:8081',       // Web frontend
  'http://localhost:8082',                                   // Optional: React Native Web (local)
  process.env.NGROK_URL || 'https://abcd-1234-5678.ngrok-free.app' // Ngrok mobile
];

app.use(helmet());

app.use(cors({
  origin: function(origin, callback) {
    // Mobile apps / Postman etc. may send no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   MongoDB Connection
========================= */
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI missing in .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    console.log('📦 Database:', mongoose.connection.name);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed');
    console.error(error.message);
    process.exit(1);
  });

/* =========================
   API Routes
========================= */
app.use('/api/auth', authRoutes);

/* =========================
   Test Route
========================= */
app.get('/api/test-db', async (req, res) => {
  try {
    const Test = mongoose.models.Test || mongoose.model('Test', new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now },
    }));

    const doc = await Test.create({ name: 'MongoDB Connected Successfully' });

    res.json({
      success: true,
      message: 'Data inserted into MongoDB',
      data: doc,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   Health Check
========================= */
app.get('/', (req, res) => {
  res.send('🚀 Server is running & DB connected');
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('---------------------------------------------');
  console.log(`🚀 Server is officially live!`);
  console.log(`🏠 Local:   http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${getLocalIP()}:${PORT}`); // Phone access
  console.log('---------------------------------------------');
});

/* =========================
   Utility: Get local IP
========================= */
function getLocalIP() {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  for (let dev in ifaces) {
    for (let details of ifaces[dev]) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return 'localhost';
}
