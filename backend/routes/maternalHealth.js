import express from 'express';
import MaternalHealth from '../models/MaternalHealth.js';

const router = express.Router();

// Get all maternal health records
router.get('/', async (req, res) => {
  try {
    const records = await MaternalHealth.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single maternal health record
router.get('/:id', async (req, res) => {
  try {
    const record = await MaternalHealth.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new maternal health record
router.post('/', async (req, res) => {
  try {
    const record = new MaternalHealth(req.body);
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update maternal health record
router.put('/:id', async (req, res) => {
  try {
    const record = await MaternalHealth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Add checkup to maternal health record
router.post('/:id/checkup', async (req, res) => {
  try {
    const record = await MaternalHealth.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    
    record.checkupHistory.push(req.body);
    record.lastCheckupDate = req.body.date || new Date();
    await record.save();
    
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete maternal health record
router.delete('/:id', async (req, res) => {
  try {
    const record = await MaternalHealth.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
