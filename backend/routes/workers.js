import express from 'express';
import Worker from '../models/Worker.js';

const router = express.Router();

// Get all workers
router.get('/', async (req, res) => {
  try {
    const { area, specialization, availability } = req.query;
    const filter = {};
    
    if (area) filter.area = new RegExp(area, 'i');
    if (specialization) filter.specialization = new RegExp(specialization, 'i');
    if (availability) filter.availability = availability;
    
    const workers = await Worker.find(filter);
    res.json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single worker
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new worker
router.post('/', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update worker
router.put('/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete worker
router.delete('/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
