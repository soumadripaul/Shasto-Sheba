import mongoose from 'mongoose';

const symptomCheckSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous'
  },
  symptom: {
    type: String
  },
  symptoms: [{
    type: String
  }],
  severity: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  duration: String,
  age: Number,
  subQuestion: String,
  answer: String,
  result: {
    severity: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    message: String,
    icon: String
  },
  checkDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('SymptomCheck', symptomCheckSchema);
