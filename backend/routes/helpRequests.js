import express from 'express';
import HelpRequest from '../models/HelpRequest.js';

const router = express.Router();

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
