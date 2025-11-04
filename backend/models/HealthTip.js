import mongoose from 'mongoose';

const healthTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  season: {
    type: String,
    default: 'সারা বছর'
  },
  icon: {
    type: String,
    default: '💡'
  },
  language: {
    type: String,
    enum: ['bn', 'en'],
    default: 'bn'
  }
}, {
  timestamps: true
});

export default mongoose.model('HealthTip', healthTipSchema);
