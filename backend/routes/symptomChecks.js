import express from 'express';
import SymptomCheck from '../models/SymptomCheck.js';

const router = express.Router();

// Get all symptom checks
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const checks = await SymptomCheck.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: checks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new symptom check
router.post('/', async (req, res) => {
  try {
    const check = new SymptomCheck(req.body);
    await check.save();
    res.status(201).json({ success: true, data: check });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get single symptom check
router.get('/:id', async (req, res) => {
  try {
    const check = await SymptomCheck.findById(req.params.id);
    if (!check) {
      return res.status(404).json({ success: false, message: 'Check not found' });
    }
    res.json({ success: true, data: check });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete symptom check
router.delete('/:id', async (req, res) => {
  try {
    const check = await SymptomCheck.findByIdAndDelete(req.params.id);
    if (!check) {
      return res.status(404).json({ success: false, message: 'Check not found' });
    }
    res.json({ success: true, message: 'Check deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
