import express from 'express';
import MentalHealth from '../models/MentalHealth.js';
import MaternalHealth from '../models/MaternalHealth.js';
import HealthCenter from '../models/HealthCenter.js';
import HelpRequest from '../models/HelpRequest.js';
import Event from '../models/Event.js';
import Worker from '../models/Worker.js';

const router = express.Router();

// Get statistics for dashboard
router.get('/', async (req, res) => {
  try {
    // Get current date and date from 7 days ago
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Count mental health check-ins this week
    const mentalHealthCheckins = await MentalHealth.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    // Count maternal health check-ins this week
    const maternalHealthCheckins = await MaternalHealth.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    // Total check-ins this week
    const totalCheckinsThisWeek = mentalHealthCheckins + maternalHealthCheckins;

    // Total health centers
    const totalHealthCenters = await HealthCenter.countDocuments();

    // Total help requests
    const totalHelpRequests = await HelpRequest.countDocuments();

    // Help requests this week
    const helpRequestsThisWeek = await HelpRequest.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    // Total events (health camps)
    const totalEvents = await Event.countDocuments();

    // Upcoming events
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: today }
    });

    // Total workers
    const totalWorkers = await Worker.countDocuments();

    // Get help requests by status
    const helpRequestsByStatus = await HelpRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get mental health mood distribution
    const moodDistribution = await MentalHealth.aggregate([
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalCheckinsThisWeek,
        mentalHealthCheckins,
        maternalHealthCheckins,
        totalHealthCenters,
        totalHelpRequests,
        helpRequestsThisWeek,
        totalEvents,
        upcomingEvents,
        totalWorkers,
        helpRequestsByStatus,
        moodDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

export default router;
