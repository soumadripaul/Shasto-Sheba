import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MentalHealth from './models/MentalHealth.js';
import MaternalHealth from './models/MaternalHealth.js';
import HelpRequest from './models/HelpRequest.js';
import SymptomCheck from './models/SymptomCheck.js';

dotenv.config();

const seedTestData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for test data seeding');

    // Clear existing test data
    console.log('\n🗑️  Clearing existing test data...');
    await MentalHealth.deleteMany({});
    await MaternalHealth.deleteMany({});
    await HelpRequest.deleteMany({});
    await SymptomCheck.deleteMany({});
    console.log('✅ Old test data cleared');

    // Mental Health Records (different moods)
    const mentalHealthRecords = [
      { mood: 'খুশি', notes: 'আজ ভালো লাগছে', activities: ['পরিবারের সাথে সময়', 'হাঁটা'] },
      { mood: 'সাধারণ', notes: 'স্বাভাবিক দিন', activities: ['কাজ'] },
      { mood: 'দুঃখিত', notes: 'একটু চিন্তিত', activities: ['বিশ্রাম'] },
      { mood: 'খুশি', notes: 'ভালো খবর পেয়েছি', activities: ['পড়াশোনা'] },
      { mood: 'রাগান্বিত', notes: 'একটু বিরক্ত', activities: ['ব্যায়াম'] },
      { mood: 'উদ্বিগ্ন', notes: 'কাজের চাপ', activities: ['ধ্যান'] },
      { mood: 'খুশি', notes: 'পরিবারের সাথে', activities: ['রান্না', 'খেলা'] },
      { mood: 'সাধারণ', notes: 'সব ঠিক আছে', activities: ['কাজ'] },
      { mood: 'দুঃখিত', notes: 'একাকীত্ব অনুভব', activities: ['বিশ্রাম'] },
      { mood: 'খুশি', notes: 'বন্ধুদের সাথে দেখা', activities: ['ঘুরতে যাওয়া'] },
      // Add some from last week
      { 
        mood: 'সাধারণ', 
        notes: 'গত সপ্তাহের', 
        activities: ['কাজ'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      { 
        mood: 'খুশি', 
        notes: 'গত সপ্তাহের', 
        activities: ['পরিবার'],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      { 
        mood: 'দুঃখিত', 
        notes: 'গত সপ্তাহের', 
        activities: ['বিশ্রাম'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ];

    await MentalHealth.insertMany(mentalHealthRecords);
    console.log(`✅ Inserted ${mentalHealthRecords.length} mental health records`);

    // Maternal Health Records
    const maternalHealthRecords = [
      {
        motherName: 'ফাতিমা খাতুন',
        age: 25,
        phoneNumber: '01712345678',
        village: 'রামপুর',
        lmp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        edd: new Date(Date.now() + 220 * 24 * 60 * 60 * 1000),
        bloodGroup: 'B+',
        previousPregnancies: 0,
        vaccinations: ['TT1'],
        checkups: [
          {
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            weight: 55,
            bloodPressure: '120/80',
            notes: 'সব স্বাভাবিক',
            nextCheckupDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
          }
        ]
      },
      {
        motherName: 'রহিমা বেগম',
        age: 28,
        phoneNumber: '01812345678',
        village: 'শ্যামপুর',
        lmp: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        edd: new Date(Date.now() + 160 * 24 * 60 * 60 * 1000),
        bloodGroup: 'O+',
        previousPregnancies: 1,
        vaccinations: ['TT1', 'TT2'],
        checkups: []
      },
      {
        motherName: 'সালমা আক্তার',
        age: 22,
        phoneNumber: '01912345678',
        village: 'কালিপুর',
        lmp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        edd: new Date(Date.now() + 250 * 24 * 60 * 60 * 1000),
        bloodGroup: 'A+',
        previousPregnancies: 0,
        vaccinations: [],
        checkups: []
      }
    ];

    await MaternalHealth.insertMany(maternalHealthRecords);
    console.log(`✅ Inserted ${maternalHealthRecords.length} maternal health records`);

    // Help Requests
    const helpRequests = [
      {
        name: 'আনোয়ার হোসেন',
        phone: '01712345678',
        location: 'রামপুর',
        requestType: 'consultation',
        description: 'মানসিক চাপ অনুভব করছি',
        urgency: 'high',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'করিম মিয়া',
        phone: '01812345678',
        location: 'শ্যামপুর',
        requestType: 'emergency',
        description: 'জ্বর এবং শ্বাসকষ্ট',
        urgency: 'critical',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'রশিদা বেগম',
        phone: '01912345678',
        location: 'কালিপুর',
        requestType: 'consultation',
        description: 'প্রসবপূর্ব পরীক্ষা দরকার',
        urgency: 'medium',
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'জাহিদ আলম',
        phone: '01612345678',
        location: 'হরিপুর',
        requestType: 'consultation',
        description: 'খাবার সম্পর্কে জানতে চাই',
        urgency: 'low',
        status: 'completed',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'মোকলেস উদ্দিন',
        phone: '01512345678',
        location: 'নতুনপাড়া',
        requestType: 'emergency',
        description: 'দুর্ঘটনা হয়েছে',
        urgency: 'critical',
        status: 'completed',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'সালমা খাতুন',
        phone: '01412345678',
        location: 'পূর্বপাড়া',
        requestType: 'medication',
        description: 'ওষুধ প্রয়োজন',
        urgency: 'medium',
        status: 'assigned',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'হাবিব রহমান',
        phone: '01312345678',
        location: 'দক্ষিণপাড়া',
        requestType: 'transport',
        description: 'হাসপাতালে নিয়ে যেতে হবে',
        urgency: 'high',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ];

    await HelpRequest.insertMany(helpRequests);
    console.log(`✅ Inserted ${helpRequests.length} help requests`);

    // Symptom Checks
    const symptomChecks = [
      {
        symptoms: ['জ্বর', 'মাথাব্যথা'],
        severity: 'medium',
        duration: '2 দিন',
        age: 30,
        result: 'ডাক্তারের পরামর্শ নিন'
      },
      {
        symptoms: ['কাশি', 'শ্বাসকষ্ট'],
        severity: 'high',
        duration: '5 দিন',
        age: 45,
        result: 'জরুরি চিকিৎসা দরকার'
      },
      {
        symptoms: ['পেট ব্যথা'],
        severity: 'low',
        duration: '1 দিন',
        age: 25,
        result: 'বিশ্রাম নিন'
      }
    ];

    await SymptomCheck.insertMany(symptomChecks);
    console.log(`✅ Inserted ${symptomChecks.length} symptom checks`);

    console.log('\n🎉 ========================================');
    console.log('🎉 Test data seeded successfully!');
    console.log('🎉 ========================================\n');

    console.log('📊 Summary:');
    console.log(`   - Mental Health Records: ${mentalHealthRecords.length}`);
    console.log(`   - Maternal Health Records: ${maternalHealthRecords.length}`);
    console.log(`   - Help Requests: ${helpRequests.length}`);
    console.log(`   - Symptom Checks: ${symptomChecks.length}`);
    console.log('\n✅ Your statistics page will now show real data!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding test data:', error);
    process.exit(1);
  }
};

seedTestData();
