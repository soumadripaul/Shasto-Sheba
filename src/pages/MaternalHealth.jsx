import React, { useState } from 'react';
import '../styles/MaternalHealth.css';

const MaternalHealth = () => {
  const [trackingType, setTrackingType] = useState(''); // pregnancy or child
  const [lmpDate, setLmpDate] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [reminders, setReminders] = useState([]);

  const calculatePregnancySchedule = (lmp) => {
    const lmpDate = new Date(lmp);
    const schedule = [];
    
    // ANC visits
    schedule.push({
      type: 'ANC',
      week: 16,
      date: new Date(lmpDate.getTime() + 16 * 7 * 24 * 60 * 60 * 1000),
      title: 'প্রথম এএনসি চেকআপ',
      description: 'রক্তচাপ, ওজন, রক্ত পরীক্ষা'
    });
    schedule.push({
      type: 'ANC',
      week: 24,
      date: new Date(lmpDate.getTime() + 24 * 7 * 24 * 60 * 60 * 1000),
      title: 'দ্বিতীয় এএনসি চেকআপ',
      description: 'আলট্রাসাউন্ড, রক্তচাপ পরীক্ষা'
    });
    schedule.push({
      type: 'ANC',
      week: 32,
      date: new Date(lmpDate.getTime() + 32 * 7 * 24 * 60 * 60 * 1000),
      title: 'তৃতীয় এএনসি চেকআপ',
      description: 'শিশুর অবস্থান পরীক্ষা'
    });
    
    return schedule;
  };

  const calculateChildVaccineSchedule = (birth) => {
    const birthDate = new Date(birth);
    const schedule = [];
    
    const vaccines = [
      { days: 0, name: 'BCG ও পোলিও (জন্মের সময়)' },
      { days: 42, name: 'পেন্টা-১, পোলিও-১' },
      { days: 70, name: 'পেন্টা-২, পোলিও-২' },
      { days: 98, name: 'পেন্টা-৩, পোলিও-৩' },
      { days: 270, name: 'এমআর-১' },
      { days: 450, name: 'এমআর-২' }
    ];

    vaccines.forEach(vaccine => {
      schedule.push({
        type: 'টিকা',
        date: new Date(birthDate.getTime() + vaccine.days * 24 * 60 * 60 * 1000),
        title: vaccine.name,
        description: 'নিকটস্থ টিকাদান কেন্দ্রে যান'
      });
    });

    return schedule;
  };

  const handleSetReminders = () => {
    if (trackingType === 'pregnancy' && lmpDate) {
      const schedule = calculatePregnancySchedule(lmpDate);
      setReminders(schedule);
      localStorage.setItem('maternalReminders', JSON.stringify({ type: 'pregnancy', lmpDate, schedule }));
    } else if (trackingType === 'child' && birthDate) {
      const schedule = calculateChildVaccineSchedule(birthDate);
      setReminders(schedule);
      localStorage.setItem('maternalReminders', JSON.stringify({ type: 'child', birthDate, schedule }));
    }
  };

  return (
    <div className="maternal-health-container">
      <div className="maternal-health-content">
        <h1 className="page-title">
          <span className="title-icon">👶</span>
          মা ও শিশু স্বাস্থ্য
        </h1>
        <p className="page-subtitle">
          গর্ভকালীন চেকআপ ও শিশুর টিকার রিমাইন্ডার
        </p>

        <div className="tracking-selector">
          <button
            className={`tracking-option ${trackingType === 'pregnancy' ? 'selected' : ''}`}
            onClick={() => setTrackingType('pregnancy')}
          >
            <span className="option-icon">🤰</span>
            <span>গর্ভকালীন যত্ন</span>
          </button>
          <button
            className={`tracking-option ${trackingType === 'child' ? 'selected' : ''}`}
            onClick={() => setTrackingType('child')}
          >
            <span className="option-icon">👶</span>
            <span>শিশুর টিকা</span>
          </button>
        </div>

        {trackingType === 'pregnancy' && (
          <div className="input-section">
            <h3>শেষ মাসিকের তারিখ (LMP)</h3>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="date-input"
            />
            <button className="set-reminder-button" onClick={handleSetReminders}>
              রিমাইন্ডার সেট করুন
            </button>
          </div>
        )}

        {trackingType === 'child' && (
          <div className="input-section">
            <h3>শিশুর জন্মতারিখ</h3>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="date-input"
            />
            <button className="set-reminder-button" onClick={handleSetReminders}>
              রিমাইন্ডার সেট করুন
            </button>
          </div>
        )}

        {reminders.length > 0 && (
          <div className="reminders-section">
            <h2>আপনার রিমাইন্ডার তালিকা</h2>
            <div className="reminders-list">
              {reminders.map((reminder, index) => (
                <div key={index} className="reminder-card">
                  <div className="reminder-date">
                    {reminder.date.toLocaleDateString('bn-BD')}
                  </div>
                  <div className="reminder-content">
                    <h4>{reminder.title}</h4>
                    <p>{reminder.description}</p>
                  </div>
                  <div className="reminder-type">
                    {reminder.type === 'ANC' ? '🏥' : '💉'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-notice">
          <h3>📱 রিমাইন্ডার সম্পর্কে:</h3>
          <ul>
            <li>সব রিমাইন্ডার আপনার ফোনে সংরক্ষিত থাকবে</li>
            <li>সময় হলে ফোনে নোটিফিকেশন পাবেন</li>
            <li>ইন্টারনেট ছাড়াই কাজ করবে</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaternalHealth;
