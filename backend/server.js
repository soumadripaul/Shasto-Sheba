import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import healthTipsRoutes from './routes/healthTips.js';
import healthCentersRoutes from './routes/healthCenters.js';
import eventsRoutes from './routes/events.js';
import workersRoutes from './routes/workers.js';
import helpRequestsRoutes from './routes/helpRequests.js';
import mentalHealthRoutes from './routes/mentalHealth.js';
import maternalHealthRoutes from './routes/maternalHealth.js';
import symptomChecksRoutes from './routes/symptomChecks.js';
import statisticsRoutes from './routes/statistics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mon Bondhu API Server is running!',
    version: '1.0.0',
    endpoints: {
      healthTips: '/api/health-tips',
      healthCenters: '/api/health-centers',
      events: '/api/events',
      workers: '/api/workers',
      helpRequests: '/api/help-requests',
      mentalHealth: '/api/mental-health',
      maternalHealth: '/api/maternal-health',
      symptomChecks: '/api/symptom-checks',
      statistics: '/api/statistics'
    }
  });
});

app.use('/api/health-tips', healthTipsRoutes);
app.use('/api/health-centers', healthCentersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/workers', workersRoutes);
app.use('/api/help-requests', helpRequestsRoutes);
app.use('/api/mental-health', mentalHealthRoutes);
app.use('/api/maternal-health', maternalHealthRoutes);
app.use('/api/symptom-checks', symptomChecksRoutes);
app.use('/api/statistics', statisticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
