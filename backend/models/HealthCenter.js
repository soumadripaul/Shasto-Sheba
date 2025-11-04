import mongoose from 'mongoose';

const healthCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  upazila: {
    type: String,
    required: true
  },
  location_description: {
    type: String,
    required: true
  },
  services: [{
    type: String
  }],
  timing: {
    type: String,
    default: '২৪ ঘণ্টা'
  },
  contact: {
    type: String
  },
  // Optional location coordinates for map
  location: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('HealthCenter', healthCenterSchema);
