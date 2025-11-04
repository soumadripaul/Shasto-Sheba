import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import '../styles/MentalHealth.css';

const MentalHealth = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [userId, setUserId] = useState('');
  const [notes, setNotes] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [viewMode, setViewMode] = useState('week');
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: '😊', label: 'খুব ভালো', value: 10, color: '#22c55e' },
    { emoji: '🙂', label: 'ভালো', value: 8, color: '#86efac' },
    { emoji: '😐', label: 'মোটামুটি', value: 6, color: '#fbbf24' },
    { emoji: '🙁', label: 'খারাপ', value: 2, color: '#f87171' }
  ];

  useEffect(() => {
    let storedUserId = localStorage.getItem('mentalHealthUserId');
    if (!storedUserId) {
      storedUserId = 'user_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('mentalHealthUserId', storedUserId);
    }
    setUserId(storedUserId);
    loadMoodHistory(storedUserId);
  }, []);

  const loadMoodHistory = async (uid) => {
    setLoading(true);
    try {
      const data = await ApiService.getMentalHealthRecords(uid);
      if (data && data.length > 0) {
        setMoodHistory(data);
        localStorage.setItem('moodHistory', JSON.stringify(data));
      } else {
        const savedMoods = localStorage.getItem('moodHistory');
        if (savedMoods) {
          setMoodHistory(JSON.parse(savedMoods));
        }
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
      const savedMoods = localStorage.getItem('moodHistory');
      if (savedMoods) {
        setMoodHistory(JSON.parse(savedMoods));
      }
    }
    setLoading(false);
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setShowNoteInput(true);
  };

  const submitMood = async () => {
    if (!selectedMood) return;

    const today = new Date();
    const moodData = {
      userId: userId,
      moodLevel: selectedMood.value,
      notes: notes,
      date: today
    };

    setLoading(true);
    
    try {
      const savedMood = await ApiService.createMentalHealthRecord(moodData);
      const newEntry = {
        ...savedMood,
        emoji: selectedMood.emoji,
        color: selectedMood.color,
        label: selectedMood.label
      };

      const updatedHistory = [newEntry, ...moodHistory];
      setMoodHistory(updatedHistory);
      localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      
      setShowMessage(true);
      setShowNoteInput(false);
      setNotes('');
      setSelectedMood(null);
      
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error saving mood:', error);
      const dateStr = today.toISOString().split('T')[0];
      const newEntry = {
        date: dateStr,
        moodLevel: selectedMood.value,
        emoji: selectedMood.emoji,
        color: selectedMood.color,
        label: selectedMood.label,
        notes: notes,
        timestamp: today.toISOString()
      };

      const existingIndex = moodHistory.findIndex(entry => 
        new Date(entry.date).toISOString().split('T')[0] === dateStr
      );
      
      let updatedHistory;
      if (existingIndex >= 0) {
        updatedHistory = [...moodHistory];
        updatedHistory[existingIndex] = newEntry;
      } else {
        updatedHistory = [newEntry, ...moodHistory].slice(0, 31);
      }

      setMoodHistory(updatedHistory);
      localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      
      setShowMessage(true);
      setShowNoteInput(false);
      setNotes('');
      setSelectedMood(null);
      
      setTimeout(() => setShowMessage(false), 3000);
    }
    
    setLoading(false);
  };

  const getMoodEmoji = (moodLevel) => {
    if (moodLevel >= 9) return { emoji: '😊', color: '#22c55e' };
    if (moodLevel >= 7) return { emoji: '🙂', color: '#86efac' };
    if (moodLevel >= 5) return { emoji: '😐', color: '#fbbf24' };
    return { emoji: '😞', color: '#f87171' };
  };

  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('bn-BD', { weekday: 'short' });
      const mood = moodHistory.find(entry => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        return entryDate === dateStr;
      });
      
      let displayData = { emoji: '—', color: '#e5e7eb' };
      if (mood) {
        if (mood.emoji) {
          displayData = { emoji: mood.emoji, color: mood.color };
        } else if (mood.moodLevel) {
          displayData = getMoodEmoji(mood.moodLevel);
        }
      }
      
      days.push({ date: dateStr, dayName, mood: displayData });
    }
    return days;
  };

  const getMonthlyData = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const monthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const mood = moodHistory.find(entry => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        return entryDate === dateStr;
      });
      
      monthData.push({
        day,
        date: dateStr,
        moodLevel: mood ? (mood.moodLevel || 0) : 0,
        hasData: !!mood
      });
    }
    return monthData;
  };

  const getMoodStats = () => {
    const last30Days = moodHistory.slice(0, 30);
    const total = last30Days.length;
    
    const excellent = last30Days.filter(m => m.moodLevel >= 9).length;
    const good = last30Days.filter(m => m.moodLevel >= 7 && m.moodLevel < 9).length;
    const okay = last30Days.filter(m => m.moodLevel >= 5 && m.moodLevel < 7).length;
    const notGood = last30Days.filter(m => m.moodLevel >= 3 && m.moodLevel < 5).length;
    const bad = last30Days.filter(m => m.moodLevel < 3).length;
    
    const avgMood = total > 0 
      ? (last30Days.reduce((sum, m) => sum + (m.moodLevel || 0), 0) / total).toFixed(1)
      : 0;
    
    return { total, excellent, good, okay, notGood, bad, avgMood };
  };

  const monthlyData = getMonthlyData();
  const maxMoodLevel = 10;
  const stats = getMoodStats();

  return (
    <div className="mental-health-container">
      <div className="mental-health-content">
        <h1 className="page-title">
          <span className="title-icon">🧠</span>
          আজ আপনার মন কেমন?
        </h1>
        <p className="page-subtitle">
          আপনার মানসিক অবস্থা জানান। এটি সম্পূর্ণ গোপনীয় এবং শুধুমাত্র আপনার জন্য সংরক্ষিত থাকবে।
        </p>

        <div className="mood-selector">
          {moods.map((mood, index) => (
            <button
              key={index}
              className={`mood-button ${selectedMood?.value === mood.value ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood)}
              style={{ '--mood-color': mood.color }}
              disabled={loading}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>

        {showNoteInput && (
          <div className="note-input-section">
            <label className="note-label">
              কিছু লিখতে চান? (ঐচ্ছিক)
            </label>
            <textarea
              className="note-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="আজ কেমন কাটলো বা কী ভাবছেন..."
              rows="3"
            />
            <div className="note-buttons">
              <button 
                className="submit-mood-btn"
                onClick={submitMood}
                disabled={loading}
              >
                {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
              </button>
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowNoteInput(false);
                  setNotes('');
                  setSelectedMood(null);
                }}
              >
                বাতিল
              </button>
            </div>
          </div>
        )}

        {showMessage && (
          <div className="success-message">
            ✓ আপনার মুড সংরক্ষণ করা হয়েছে
          </div>
        )}

        {moodHistory.length > 0 && (
          <>
            <div className="view-mode-toggle">
              <button
                className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >
                সপ্তাহ
              </button>
              <button
                className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >
                মাস
              </button>
            </div>

            {viewMode === 'week' && (
              <div className="mood-history">
                <h2>গত ৭ দিনের রেকর্ড</h2>
                <div className="calendar-view">
                  {getLastSevenDays().map((day, index) => (
                    <div key={index} className="calendar-day">
                      <div className="day-name">{day.dayName}</div>
                      <div 
                        className="day-mood"
                        style={{ 
                          backgroundColor: day.mood.color,
                          color: day.mood.emoji === '—' ? '#9ca3af' : 'white'
                        }}
                      >
                        {day.mood.emoji}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'month' && (
              <div className="mood-history">
                <h2>এই মাসের মুড ট্র্যাকার</h2>
                <div className="mood-chart">
                  <div className="chart-container">
                    {monthlyData.map((dayData, index) => {
                      const barHeight = dayData.hasData 
                        ? (dayData.moodLevel / maxMoodLevel) * 100 
                        : 0;
                      
                      const barColor = dayData.hasData 
                        ? getMoodEmoji(dayData.moodLevel).color 
                        : '#e5e7eb';
                      
                      return (
                        <div key={index} className="chart-bar-wrapper">
                          <div 
                            className="chart-bar"
                            style={{
              height: `${barHeight}%`,
                              backgroundColor: barColor,
                              opacity: dayData.hasData ? 1 : 0.3
                            }}
                            title={`${dayData.day} তারিখ: ${dayData.hasData ? `মুড লেভেল ${dayData.moodLevel}/10` : 'কোনো রেকর্ড নেই'}`}
                          >
                            {dayData.hasData && (
                              <span className="bar-emoji">
                                {getMoodEmoji(dayData.moodLevel).emoji}
                              </span>
                            )}
                          </div>
                          <div className="chart-label">
                            {dayData.day}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="chart-legend">
                    <span>😞 খারাপ</span>
                    <span>😐 মোটামুটি</span>
                    <span>😊 ভালো</span>
                    <span>🌟 খুব ভালো</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mood-insights">
              <h3>আপনার পরিসংখ্যান (গত ৩০ দিন)</h3>
              <div className="insights-grid">
                <div className="insight-card">
                  <span className="insight-icon">✨</span>
                  <span className="insight-value">{stats.total}</span>
                  <span className="insight-label">মোট রেকর্ড</span>
                </div>
                <div className="insight-card">
                  <span className="insight-icon">📊</span>
                  <span className="insight-value">{stats.avgMood}/10</span>
                  <span className="insight-label">গড় মুড</span>
                </div>
                <div className="insight-card">
                  <span className="insight-icon">😊</span>
                  <span className="insight-value">{stats.excellent + stats.good}</span>
                  <span className="insight-label">ভালো দিন</span>
                </div>
                <div className="insight-card">
                  <span className="insight-icon">😐</span>
                  <span className="insight-value">{stats.okay}</span>
                  <span className="insight-label">মোটামুটি দিন</span>
                </div>
                <div className="insight-card">
                  <span className="insight-icon">😞</span>
                  <span className="insight-value">{stats.notGood + stats.bad}</span>
                  <span className="insight-label">খারাপ দিন</span>
                </div>
              </div>

              <div className="mood-distribution">
                <h4>মুডের বিতরণ</h4>
                {[
                  { label: 'খুব ভালো', count: stats.excellent, color: '#22c55e' },
                  { label: 'ভালো', count: stats.good, color: '#84cc16' },
                  { label: 'মোটামুটি', count: stats.okay, color: '#fbbf24' },
                  { label: 'একটু খারাপ', count: stats.notGood, color: '#fb923c' },
                  { label: 'খারাপ', count: stats.bad, color: '#f87171' }
                ].map((item, index) => (
                  <div key={index} className="distribution-row">
                    <span className="distribution-label">{item.label}</span>
                    <div className="distribution-bar-bg">
                      <div 
                        className="distribution-bar"
                        style={{
                          width: stats.total > 0 ? `${(item.count / stats.total) * 100}%` : '0%',
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <span className="distribution-count">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="privacy-notice">
          <span className="privacy-icon">🔒</span>
          <p>আপনার সকল তথ্য সম্পূর্ণ গোপনীয়। শুধুমাত্র আপনি এটি দেখতে পারবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
