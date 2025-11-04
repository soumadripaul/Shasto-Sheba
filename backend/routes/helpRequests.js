import express from 'express';
import HelpRequest from '../models/HelpRequest.js';

const router = express.Router();

/**
 * @openapi
 * /api/help-requests:
 *   get:
 *     summary: Get all help requests
 *     description: Retrieve help requests with optional filtering by status, urgency, and type
 *     tags:
 *       - Help Requests
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, assigned, in-progress, completed, cancelled]
 *         description: Filter by status
 *       - in: query
 *         name: urgency
 *         schema:
 *           type: string
 *           enum: [low, medium, high, critical]
 *         description: Filter by urgency level
 *       - in: query
 *         name: requestType
 *         schema:
 *           type: string
 *           enum: [emergency, consultation, medication, transport, other]
 *         description: Filter by request type
 *     responses:
 *       200:
 *         description: List of help requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HelpRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// Get all help requests
router.get('/', async (req, res) => {
  try {
    const { status, urgency, requestType } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;
    if (requestType) filter.requestType = requestType;
    
    const requests = await HelpRequest.find(filter)
      .populate('assignedWorker')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/help-requests/code/{ticketCode}:
 *   get:
 *     summary: Get help request by ticket code
 *     description: Retrieve a specific help request using its unique ticket code
 *     tags:
 *       - Help Requests
 *     parameters:
 *       - in: path
 *         name: ticketCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket code
 *         example: HELP-2024-001
 *     responses:
 *       200:
 *         description: Help request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HelpRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// Get help request by ticket code
router.get('/code/:ticketCode', async (req, res) => {
  try {
    const request = await HelpRequest.findOne({ ticketCode: req.params.ticketCode })
      .populate('assignedWorker');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single help request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id)
      .populate('assignedWorker');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/help-requests:
 *   post:
 *     summary: Create new help request
 *     description: |
 *       Submit a new anonymous help request. 
 *       A unique ticket code will be generated for tracking.
 *     tags:
 *       - Help Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - location
 *               - requestType
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: রহিম আহমেদ
 *               phone:
 *                 type: string
 *                 example: 01712345678
 *               location:
 *                 type: string
 *                 example: মিরপুর, ঢাকা
 *               requestType:
 *                 type: string
 *                 enum: [emergency, consultation, medication, transport, other]
 *                 example: consultation
 *               description:
 *                 type: string
 *                 example: তীব্র জ্বর এবং মাথা ব্যথা
 *               urgency:
 *                 type: string
 *                 enum: [low, medium, high, critical]
 *                 default: medium
 *     responses:
 *       201:
 *         description: Help request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HelpRequest'
 *                 message:
 *                   type: string
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
// Create new help request
router.post('/', async (req, res) => {
  try {
    const request = new HelpRequest(req.body);
    await request.save();
    res.status(201).json({ 
      success: true, 
      data: request,
      message: 'Help request submitted successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update help request
router.put('/:id', async (req, res) => {
  try {
    const request = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedWorker');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Assign worker to help request
router.patch('/:id/assign', async (req, res) => {
  try {
    const { workerId } = req.body;
    const request = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { 
        assignedWorker: workerId,
        status: 'assigned'
      },
      { new: true }
    ).populate('assignedWorker');
    
    if (!request) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete help request
router.delete('/:id', async (req, res) => {
  try {
    const request = await HelpRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Help request not found' });
    }
    res.json({ success: true, message: 'Help request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
