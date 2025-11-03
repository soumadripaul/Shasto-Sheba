import React, { useState, useEffect } from 'react';
import healthTipsData from '../data/healthTips.json';
import '../styles/HealthTips.css';

const HealthTips = () => {
  const [healthTips, setHealthTips] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    // Load health tips from JSON (works offline)
    setHealthTips(healthTipsData);

    // Auto-select current season
    const currentMonth = new Date().getMonth();
    let season;
    if (currentMonth >= 2 && currentMonth <= 5) {
      season = 'গ্রীষ্ম';
    } else if (currentMonth >= 6 && currentMonth <= 9) {
      season = 'বর্ষা';
    } else {
      season = 'শীত';
    }
    
    const currentSeasonData = healthTipsData.find(s => s.season === season);
    setSelectedSeason(currentSeasonData);
  }, []);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  return (
    <div className="health-tips-container">
      <div className="health-tips-content">
        <h1 className="page-title">
          <span className="title-icon">💡</span>
          স্বাস্থ্য টিপস
        </h1>
        <p className="page-subtitle">
          ঋতু অনুযায়ী স্বাস্থ্য পরামর্শ ও সতর্কতা
        </p>

        <div className="season-selector">
          {healthTips.map((season) => (
            <button
              key={season.id}
              className={`season-button ${selectedSeason?.id === season.id ? 'selected' : ''}`}
              onClick={() => handleSeasonSelect(season)}
            >
              <span className="season-icon">{season.icon}</span>
              <span className="season-name">{season.season}</span>
            </button>
          ))}
        </div>

        {selectedSeason && (
          <div className="tips-display">
            <h2 className="season-title">
              {selectedSeason.icon} {selectedSeason.season}কালীন স্বাস্থ্য টিপস
            </h2>
            <div className="tips-grid">
              {selectedSeason.tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <div className="tip-icon">{tip.icon}</div>
                  <h3 className="tip-title">{tip.title}</h3>
                  <p className="tip-description">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="additional-info">
          <h3>🩺 মনে রাখবেন:</h3>
          <ul>
            <li>এই পরামর্শগুলো সাধারণ স্বাস্থ্য সচেতনতার জন্য</li>
            <li>গুরুতর অসুস্থতায় অবশ্যই ডাক্তার দেখান</li>
            <li>জ্বর ৩ দিনের বেশি থাকলে হাসপাতালে যান</li>
            <li>নিয়মিত স্বাস্থ্য পরীক্ষা করান</li>
          </ul>
        </div>

        <div className="offline-notice">
          <span className="offline-icon">📴</span>
          <p>এই টিপস আপনার ফোনে সংরক্ষিত। ইন্টারনেট ছাড়াই দেখতে পারবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
