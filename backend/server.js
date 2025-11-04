import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
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
import chatbotRoutes from './routes/chatbot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
/**
 * @openapi
 * /:
 *   get:
 *     summary: API Root Endpoint
 *     description: Returns API information and available endpoints
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 endpoints:
 *                   type: object
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mon Bondhu API Documentation'
}));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mon Bondhu API Server is running!',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      healthTips: '/api/health-tips',
      healthCenters: '/api/health-centers',
      events: '/api/events',
      workers: '/api/workers',
      helpRequests: '/api/help-requests',
      mentalHealth: '/api/mental-health',
      maternalHealth: '/api/maternal-health',
      symptomChecks: '/api/symptom-checks',
      statistics: '/api/statistics',
      chatbot: '/api/chatbot'
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
app.use('/api/chatbot', chatbotRoutes);

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
