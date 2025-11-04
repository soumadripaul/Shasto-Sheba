import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  role: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  trained_by: {
    type: String
  },
  specialties: [{
    type: String
  }],
  // Optional fields
  email: {
    type: String
  },
  location: {
    lat: Number,
    lng: Number
  },
  availability: {
    type: String,
    default: 'Available'
  }
}, {
  timestamps: true
});

export default mongoose.model('Worker', workerSchema);
