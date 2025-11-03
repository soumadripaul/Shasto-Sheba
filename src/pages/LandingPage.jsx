import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const missions = [
    {
      icon: '😊',
      title: 'মানসিক স্বাস্থ্য পরীক্ষা',
      description: 'আপনার দৈনিক মুড ট্র্যাক করুন সম্পূর্ণ গোপনীয়তায়',
      link: '/mental-health'
    },
    {
      icon: '🏥',
      title: 'স্বাস্থ্য সেবা কেন্দ্র',
      description: 'নিকটস্থ হাসপাতাল ও ক্লিনিকের তথ্য',
      link: '/health-map'
    },
    {
      icon: '🆘',
      title: 'সাহায্য চাই',
      description: 'বেনামে সাহায্য চাইতে পারবেন',
      link: '/help-request'
    },
    {
      icon: '💡',
      title: 'স্বাস্থ্য টিপস',
      description: 'ঋতু অনুযায়ী স্বাস্থ্য পরামর্শ',
      link: '/health-tips'
    },
    {
      icon: '👶',
      title: 'মা ও শিশু স্বাস্থ্য',
      description: 'টিকা ও চেকআপের রিমাইন্ডার',
      link: '/maternal-health'
    },
    {
      icon: '🩺',
      title: 'লক্ষণ পরীক্ষা',
      description: 'বিপদজনক লক্ষণ শনাক্ত করুন',
      link: '/symptom-checker'
    },
    {
      icon: '📅',
      title: 'স্বাস্থ্য শিবির',
      description: 'আসন্ন স্বাস্থ্য ক্যাম্পের তথ্য',
      link: '/health-events'
    },
    {
      icon: '👨‍⚕️',
      title: 'স্বাস্থ্যকর্মী তালিকা',
      description: 'প্রশিক্ষিত স্বাস্থ্যকর্মীদের খুঁজুন',
      link: '/health-workers'
    },
    {
      icon: '🎤',
      title: 'ভয়েস সহায়ক',
      description: 'কথা বলে তথ্য জানুন',
      link: '/voice-assistant'
    }
  ];

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🌱</span>
            মন বন্ধু
          </h1>
          <p className="hero-subtitle">
            গ্রামীণ বাংলাদেশের জন্য স্বাস্থ্য সেবা
          </p>
          <div className="hero-features">
            <div className="feature-badge">
              <span>📴</span>
              <span>অফলাইনে কাজ করে</span>
            </div>
            <div className="feature-badge">
              <span>🔒</span>
              <span>সম্পূর্ণ গোপনীয়</span>
            </div>
            <div className="feature-badge">
              <span>🎤</span>
              <span>কথা বলে ব্যবহার করুন</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <h2>মন বন্ধু কি?</h2>
          <p>
            মন বন্ধু একটি বিশেষ স্বাস্থ্য সেবা অ্যাপ যা গ্রামীণ বাংলাদেশের মানুষের জন্য তৈরি। 
            এই অ্যাপটি ইন্টারনেট ছাড়াই কাজ করে এবং আপনার সকল তথ্য আপনার ফোনেই নিরাপদ থাকে।
          </p>
          <div className="about-points">
            <div className="point">
              <span className="point-icon">✓</span>
              <span>২জি নেটওয়ার্কেও কাজ করে</span>
            </div>
            <div className="point">
              <span className="point-icon">✓</span>
              <span>কোনো লগইন লাগবে না</span>
            </div>
            <div className="point">
              <span className="point-icon">✓</span>
              <span>সহজ বাংলায় সব তথ্য</span>
            </div>
            <div className="point">
              <span className="point-icon">✓</span>
              <span>ছবি ও আইকন দিয়ে বোঝা সহজ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="missions">
        <h2 className="missions-title">আমাদের সেবাসমূহ</h2>
        <div className="missions-grid">
          {missions.map((mission, index) => (
            <Link to={mission.link} key={index} className="mission-card">
              <div className="mission-icon">{mission.icon}</div>
              <h3 className="mission-title">{mission.title}</h3>
              <p className="mission-description">{mission.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>এখনই শুরু করুন</h2>
          <p>আপনার স্বাস্থ্য সেবার যাত্রা শুরু করুন আজই</p>
          <Link to="/mental-health" className="cta-button">
            শুরু করুন →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
