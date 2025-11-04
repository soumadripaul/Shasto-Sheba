import mongoose from 'mongoose';

const mentalHealthSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous' // Make it optional with default value
  },
  mood: {
    type: String,
    enum: ['খুশি', 'সাধারণ', 'দুঃখিত', 'রাগান্বিত', 'উদ্বিগ্ন', 'ভীত']
  },
  moodLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  activities: [{
    type: String
  }],
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('MentalHealth', mentalHealthSchema);
