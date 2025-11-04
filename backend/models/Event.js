import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  services: [{
    type: String
  }],
  organizer: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📅'
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);
