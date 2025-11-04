import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({
  ticketCode: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    enum: ['emergency', 'consultation', 'medication', 'transport', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  response: {
    type: String,
    default: null
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  }
}, {
  timestamps: true
});

export default mongoose.model('HelpRequest', helpRequestSchema);
