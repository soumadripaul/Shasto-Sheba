import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SymptomCheck from './models/SymptomCheck.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/monbondhu';

// Sample symptom check data based on the decision tree
const symptomCheckData = [
  // জ্বর - ১-২ দিন
  {
    userId: 'sample_user_1',
    symptom: 'জ্বর',
    subQuestion: 'জ্বর কত দিন ধরে?',
    answer: '১-২ দিন',
    result: {
      severity: 'low',
      message: 'বিশ্রাম নিন ও পানি পান করুন। প্যারাসিটামল খেতে পারেন।',
      icon: '💊'
    },
    checkDate: new Date('2025-11-01T10:00:00.000Z')
  },
  // জ্বর - ৩ দিনের বেশি
  {
    userId: 'sample_user_2',
    symptom: 'জ্বর',
    subQuestion: 'জ্বর কত দিন ধরে?',
    answer: '৩ দিনের বেশি',
    result: {
      severity: 'high',
      message: 'ডেঞ্জার সাইন! অবিলম্বে ডাক্তার দেখান।',
      icon: '🚨'
    },
    checkDate: new Date('2025-11-02T14:30:00.000Z')
  },
  // ডায়রিয়া - রক্ত যাচ্ছে
  {
    userId: 'sample_user_3',
    symptom: 'ডায়রিয়া',
    subQuestion: 'মলের সাথে রক্ত যাচ্ছে?',
    answer: 'হ্যাঁ',
    result: {
      severity: 'high',
      message: 'ডেঞ্জার সাইন! ওআরএস খান এবং অবিলম্বে হাসপাতালে যান।',
      icon: '🏥'
    },
    checkDate: new Date('2025-11-02T16:00:00.000Z')
  },
  // ডায়রিয়া - রক্ত যাচ্ছে না
  {
    userId: 'sample_user_4',
    symptom: 'ডায়রিয়া',
    subQuestion: 'মলের সাথে রক্ত যাচ্ছে?',
    answer: 'না',
    result: {
      severity: 'medium',
      message: 'ওআরএস বানিয়ে পান করুন। ভাজাপোড়া ও মসলা এড়িয়ে চলুন।',
      icon: '🥤'
    },
    checkDate: new Date('2025-11-03T09:15:00.000Z')
  },
  // কাশি - শ্বাসকষ্ট আছে
  {
    userId: 'sample_user_5',
    symptom: 'কাশি',
    subQuestion: 'শ্বাস নিতে কষ্ট হচ্ছে?',
    answer: 'হ্যাঁ',
    result: {
      severity: 'high',
      message: 'ডেঞ্জার সাইন! নিউমোনিয়া হতে পারে। তাড়াতাড়ি ডাক্তার দেখান।',
      icon: '🏥'
    },
    checkDate: new Date('2025-11-03T11:45:00.000Z')
  },
  // কাশি - শ্বাসকষ্ট নেই
  {
    userId: 'sample_user_6',
    symptom: 'কাশি',
    subQuestion: 'শ্বাস নিতে কষ্ট হচ্ছে?',
    answer: 'না',
    result: {
      severity: 'low',
      message: 'গরম পানি পান করুন। বিশ্রাম নিন। ২ সপ্তাহের বেশি হলে ডাক্তার দেখান।',
      icon: '☕'
    },
    checkDate: new Date('2025-11-03T15:20:00.000Z')
  },
  // পেট ব্যথা - খুব তীব্র
  {
    userId: 'sample_user_7',
    symptom: 'পেট ব্যথা',
    subQuestion: 'ব্যথা কতটা তীব্র?',
    answer: 'খুব তীব্র, সহ্য করতে পারছি না',
    result: {
      severity: 'high',
      message: 'ডেঞ্জার সাইন! অবিলম্বে হাসপাতালে যান। অ্যাপেন্ডিসাইটিস হতে পারে।',
      icon: '🏥'
    },
    checkDate: new Date('2025-11-04T08:00:00.000Z')
  },
  // পেট ব্যথা - মাঝারি
  {
    userId: 'sample_user_8',
    symptom: 'পেট ব্যথা',
    subQuestion: 'ব্যথা কতটা তীব্র?',
    answer: 'মাঝারি, সহ্য করতে পারছি',
    result: {
      severity: 'medium',
      message: 'হালকা খাবার খান। গ্যাসের সমস্যা হতে পারে। ভালো না হলে ডাক্তার দেখান।',
      icon: '🍵'
    },
    checkDate: new Date('2025-11-04T10:30:00.000Z')
  }
];

// Sample maternal health records
const maternalHealthData = [
  // Pregnancy tracking
  {
    userId: 'sample_mother_1',
    trackingType: 'pregnancy',
    lmpDate: new Date('2025-08-01'),
    schedule: [
      {
        type: 'ANC',
        week: 16,
        date: new Date('2025-11-15'),
        title: 'প্রথম এএনসি চেকআপ',
        description: 'রক্তচাপ, ওজন, রক্ত পরীক্ষা',
        completed: false
      },
      {
        type: 'ANC',
        week: 24,
        date: new Date('2026-01-10'),
        title: 'দ্বিতীয় এএনসি চেকআপ',
        description: 'আলট্রাসাউন্ড, রক্তচাপ পরীক্ষা',
        completed: false
      },
      {
        type: 'ANC',
        week: 32,
        date: new Date('2026-03-07'),
        title: 'তৃতীয় এএনসি চেকআপ',
        description: 'শিশুর অবস্থান পরীক্ষা',
        completed: false
      }
    ],
    notes: 'নিয়মিত চেকআপ করতে হবে'
  },
  // Child vaccination tracking
  {
    userId: 'sample_mother_2',
    trackingType: 'child',
    birthDate: new Date('2025-10-01'),
    schedule: [
      {
        type: 'টিকা',
        date: new Date('2025-10-01'),
        title: 'BCG ও পোলিও (জন্মের সময়)',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: true
      },
      {
        type: 'টিকা',
        date: new Date('2025-11-12'),
        title: 'পেন্টা-১, পোলিও-১',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: false
      },
      {
        type: 'টিকা',
        date: new Date('2025-12-10'),
        title: 'পেন্টা-২, পোলিও-২',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: false
      },
      {
        type: 'টিকা',
        date: new Date('2026-01-07'),
        title: 'পেন্টা-৩, পোলিও-৩',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: false
      },
      {
        type: 'টিকা',
        date: new Date('2026-06-28'),
        title: 'এমআর-১',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: false
      },
      {
        type: 'টিকা',
        date: new Date('2026-11-24'),
        title: 'এমআর-২',
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান',
        completed: false
      }
    ],
    notes: 'টিকার সময়সূচী মেনে চলুন'
  },
  // Another pregnancy example
  {
    userId: 'sample_mother_3',
    trackingType: 'pregnancy',
    lmpDate: new Date('2025-09-15'),
    schedule: [
      {
        type: 'ANC',
        week: 16,
        date: new Date('2025-12-30'),
        title: 'প্রথম এএনসি চেকআপ',
        description: 'রক্তচাপ, ওজন, রক্ত পরীক্ষা',
        completed: false
      }
    ],
    notes: 'প্রথম গর্ভধারণ'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📊 Connected to MongoDB');

    // Import MaternalHealth model dynamically to avoid circular dependency
    const MaternalHealth = (await import('./models/MaternalHealth.js')).default;

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await SymptomCheck.deleteMany({});
    await MaternalHealth.deleteMany({});

    // Insert symptom checks
    console.log('\n📝 Inserting symptom checks...');
    const insertedSymptoms = await SymptomCheck.insertMany(symptomCheckData);
    console.log(`✅ Inserted ${insertedSymptoms.length} symptom checks`);

    // Insert maternal health records
    console.log('\n👶 Inserting maternal health records...');
    const insertedMaternal = await MaternalHealth.insertMany(maternalHealthData);
    console.log(`✅ Inserted ${insertedMaternal.length} maternal health records`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Symptom Checks: ${insertedSymptoms.length}`);
    console.log(`   Maternal Health Records: ${insertedMaternal.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
