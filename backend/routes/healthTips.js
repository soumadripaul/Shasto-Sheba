import express from 'express';
import HealthTip from '../models/HealthTip.js';

const router = express.Router();

// Get all health tips
router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (language) filter.language = language;
    
    const tips = await HealthTip.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single health tip
router.get('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findById(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new health tip
router.post('/', async (req, res) => {
  try {
    const tip = new HealthTip(req.body);
    await tip.save();
    res.status(201).json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update health tip
router.put('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete health tip
router.delete('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findByIdAndDelete(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, message: 'Health tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
