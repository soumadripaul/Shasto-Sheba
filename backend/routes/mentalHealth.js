import express from 'express';
import MentalHealth from '../models/MentalHealth.js';

const router = express.Router();

// Get all mental health records
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    
    const records = await MentalHealth.find(filter).sort({ date: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single mental health record
router.get('/:id', async (req, res) => {
  try {
    const record = await MentalHealth.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new mental health record
router.post('/', async (req, res) => {
  try {
    const record = new MentalHealth(req.body);
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update mental health record
router.put('/:id', async (req, res) => {
  try {
    const record = await MentalHealth.findByIdAndUpdate(
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

// Delete mental health record
router.delete('/:id', async (req, res) => {
  try {
    const record = await MentalHealth.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
