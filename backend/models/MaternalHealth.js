import mongoose from 'mongoose';

const maternalHealthSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous'
  },
  trackingType: {
    type: String,
    default: 'pregnancy',
    enum: ['pregnancy', 'child']
  },
  lmpDate: {
    type: Date
  },
  lmp: {  // Alias for lmpDate
    type: Date
  },
  edd: {  // Expected Delivery Date
    type: Date
  },
  birthDate: {
    type: Date
  },
  schedule: [{
    type: {
      type: String,
      required: true
    },
    week: Number,
    date: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  notes: String,
  // Optional fields for more detailed tracking
  motherName: String,
  age: Number,
  phone: String,
  phoneNumber: String,  // Alias
  village: String,
  bloodGroup: String,
  previousPregnancies: Number,
  vaccinations: [String],
  checkups: [{
    date: Date,
    weight: Number,
    bloodPressure: String,
    notes: String,
    nextCheckupDate: Date
  }],
  complications: [String],
  medications: [String]
}, {
  timestamps: true
});

export default mongoose.model('MaternalHealth', maternalHealthSchema);
