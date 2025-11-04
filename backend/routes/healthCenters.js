import express from 'express';
import HealthCenter from '../models/HealthCenter.js';

const router = express.Router();

// Get all health centers
router.get('/', async (req, res) => {
  try {
    const { type, isEmergency } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (isEmergency !== undefined) filter.isEmergency = isEmergency === 'true';
    
    const centers = await HealthCenter.find(filter);
    res.json({ success: true, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single health center
router.get('/:id', async (req, res) => {
  try {
    const center = await HealthCenter.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Health center not found' });
    }
    res.json({ success: true, data: center });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new health center
router.post('/', async (req, res) => {
  try {
    const center = new HealthCenter(req.body);
    await center.save();
    res.status(201).json({ success: true, data: center });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update health center
router.put('/:id', async (req, res) => {
  try {
    const center = await HealthCenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!center) {
      return res.status(404).json({ success: false, message: 'Health center not found' });
    }
    res.json({ success: true, data: center });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete health center
router.delete('/:id', async (req, res) => {
  try {
    const center = await HealthCenter.findByIdAndDelete(req.params.id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Health center not found' });
    }
    res.json({ success: true, message: 'Health center deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get nearby health centers
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const maxDistance = req.query.distance || 5000; // 5km default
    
    const centers = await HealthCenter.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: maxDistance
        }
      }
    });
    
    res.json({ success: true, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
