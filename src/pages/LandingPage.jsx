import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await apiService.getStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

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
                    <span className="heron">🩺মনবন্ধু</span>
                </h1>
                <p className="hero-subtitle">
                    গ্রামীণ বাংলাদেশের জন্য স্বাস্থ্য সেবা
                </p>
                <div className="hero-features">
                    <div className="feature-badge">
                        <span>📴</span>
                        <span>জরুরি মুড রিপোর্ট</span>
                    </div>
                    <div className="feature-badge">
                        <span>🔒</span>
                        <span>গোপনীয় ও নিরাপদ</span>
                    </div>
                    <div className="feature-badge">
                        <span>🎤</span>
                        <span>ভয়েসে জরুরি সহায়তা</span>
                    </div>
                </div>
            </div>
        </section>

        <section className="about">
            <div className="about-content">
                <h2>মনবন্ধু কি?</h2>
                <p>
                    মনবন্ধু একটি বিশেষ স্বাস্থ্য সেবা অ্যাপ যা গ্রামীণ বাংলাদেশের মানুষের জন্য তৈরি। 
                    এই অ্যাপটি ইন্টারনেট ছাড়াই কাজ করে এবং আপনার সকল তথ্য আপনার ফোনেই নিরাপদ থাকে।
                </p>
                <div className="about-points">
                    <div className="point">
                        <span className="point-icon">✓</span>
                        <span>অফলাইনে জরুরি সেবা</span>
                    </div>
                    <div className="point">
                        <span className="point-icon">✓</span>
                        <span>কোনো লগইন ছাড়াই দ্রুত প্রবেশ</span>
                    </div>
                    <div className="point">
                        <span className="point-icon">✓</span>
                        <span>জরুরি নির্দেশ সহজ বাংলায়</span>
                    </div>
                    <div className="point">
                        <span className="point-icon">✓</span>
                        <span>চিত্র ও আইকনে দ্রুত চিহ্নিত করুন</span>
                    </div>
                </div>
            </div>
        </section>

        <section className="missions">
            <h2 className="missions-title">আমাদের সেবাসমূহ</h2>
            <div className="missions-grid">
                {missions.map((mission, index) => {
                    // Special handling for health workers to redirect to workers tab
                    if (mission.title === 'স্বাস্থ্যকর্মী তালিকা') {
                        return (
                            <Link 
                                to="/health-events" 
                                state={{ tab: 'workers' }}
                                key={index} 
                                className="mission-card"
                            >
                                <div className="mission-icon">{mission.icon}</div>
                                <h3 className="mission-title">{mission.title}</h3>
                                <p className="mission-description">{mission.description}</p>
                            </Link>
                        );
                    }
                    return (
                        <Link to={mission.link} key={index} className="mission-card">
                            <div className="mission-icon">{mission.icon}</div>
                            <h3 className="mission-title">{mission.title}</h3>
                            <p className="mission-description">{mission.description}</p>
                        </Link>
                    );
                })}
            </div>
        </section>

        <section className="statistics">
          <h2 className="statistics-title">আমাদের সেবার পরিসংখ্যান</h2>
          {loading ? (
            <div className="loading-spinner">লোড হচ্ছে...</div>
          ) : statistics ? (
            <div className="statistics-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3 className="stat-number">{statistics.totalCheckinsThisWeek}</h3>
                  <p className="stat-label">এই সপ্তাহে চেক-ইন</p>
                  <div className="stat-breakdown">
                    <span>মানসিক: {statistics.mentalHealthCheckins}</span>
                    <span>মাতৃস্বাস্থ্য: {statistics.maternalHealthCheckins}</span>
                  </div>
                </div>
              </div>

              <div className="stat-card stat-success">
                <div className="stat-icon">🏥</div>
                <div className="stat-content">
                  <h3 className="stat-number">{statistics.totalHealthCenters}</h3>
                  <p className="stat-label">স্বাস্থ্য সেবা কেন্দ্র</p>
                  <p className="stat-desc">সারাদেশে উপলব্ধ</p>
                </div>
              </div>

              <div className="stat-card stat-warning">
                <div className="stat-icon">🆘</div>
                <div className="stat-content">
                  <h3 className="stat-number">{statistics.totalHelpRequests}</h3>
                  <p className="stat-label">মোট সাহায্যের অনুরোধ</p>
                  <div className="stat-breakdown">
                    <span className="stat-highlight">
                      এই সপ্তাহে: {statistics.helpRequestsThisWeek}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stat-card stat-info">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3 className="stat-number">{statistics.totalEvents}</h3>
                  <p className="stat-label">স্বাস্থ্য শিবির</p>
                  <div className="stat-breakdown">
                    <span className="stat-highlight">
                      আসন্ন: {statistics.upcomingEvents}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stat-card stat-accent">
                <div className="stat-icon">👨‍⚕️</div>
                <div className="stat-content">
                  <h3 className="stat-number">{statistics.totalWorkers}</h3>
                  <p className="stat-label">স্বাস্থ্য কর্মী</p>
                  <p className="stat-desc">প্রশিক্ষিত কর্মী</p>
                </div>
              </div>

              {statistics.moodDistribution && statistics.moodDistribution.length > 0 && (
                <div className="stat-card stat-chart">
                  <div className="stat-content">
                    <h3 className="chart-title">মুড বিতরণ</h3>
                    <div className="mood-chart">
                      {statistics.moodDistribution.slice(0, 5).map((mood, index) => (
                        <div key={index} className="mood-bar">
                          <div className="mood-label">
                            <span>{mood._id}</span>
                            <span>{mood.count}</span>
                          </div>
                          <div className="bar-container">
                            <div 
                              className="bar-fill"
                              style={{ 
                                width: `${(mood.count / statistics.moodDistribution[0].count) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-data">তথ্য উপলব্ধ নেই</div>
          )}
        </section>

        <section className="cta">
            <div className="cta-content">
                <h2>এখনই শুরু করুন</h2>
                <p>আপনার স্বাস্থ্য সেবার যাত্রা শুরু করুন আজই</p>
                <Link to="/mental-health" className="cta-button">
                    এখনই সাহায্য নিন →
                </Link>
            </div>
        </section>
    </div>
);
};

export default LandingPage;
