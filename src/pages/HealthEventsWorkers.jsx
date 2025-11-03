import React, { useState } from 'react';
import eventsData from '../data/events.json';
import workersData from '../data/workers.json';
import '../styles/HealthEventsWorkers.css';

const HealthEventsWorkers = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="events-workers-container">
      <div className="events-workers-content">
        <h1 className="page-title">
          <span className="title-icon">📅</span>
          স্বাস্থ্য শিবির ও কর্মী
        </h1>
        <p className="page-subtitle">
          আসন্ন স্বাস্থ্য ক্যাম্প এবং প্রশিক্ষিত স্বাস্থ্যকর্মীদের তথ্য
        </p>

        <div className="tab-selector">
          <button
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 স্বাস্থ্য শিবির
          </button>
          <button
            className={`tab-button ${activeTab === 'workers' ? 'active' : ''}`}
            onClick={() => setActiveTab('workers')}
          >
            👨‍⚕️ স্বাস্থ্যকর্মী
          </button>
        </div>

        {activeTab === 'events' && (
          <div className="events-section">
            <h2>আসন্ন স্বাস্থ্য শিবির</h2>
            <div className="events-grid">
              {eventsData.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <span className="event-icon">{event.icon}</span>
                    <h3>{event.title}</h3>
                  </div>
                  <div className="event-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕒</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-services">
                    <h4>সেবাসমূহ:</h4>
                    <ul>
                      {event.services.map((service, idx) => (
                        <li key={idx}>✓ {service}</li>
                      ))}
                    </ul>
                  </div>
                  {event.organizer && (
                    <div className="event-organizer">
                      আয়োজক: {event.organizer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="workers-section">
            <h2>প্রশিক্ষিত স্বাস্থ্যকর্মী</h2>
            <div className="workers-grid">
              {workersData.map((worker) => (
                <div key={worker.id} className="worker-card">
                  <div className="worker-avatar">{worker.gender === 'male' ? '👨‍⚕️' : '👩‍⚕️'}</div>
                  <h3>{worker.name}</h3>
                  <div className="worker-role">{worker.role}</div>
                  <div className="worker-info">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <span>{worker.area}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📞</span>
                      <a href={`tel:${worker.contact}`}>{worker.contact}</a>
                    </div>
                  </div>
                  {worker.trained_by && (
                    <div className="worker-badge">
                      ✓ Trained by {worker.trained_by}
                    </div>
                  )}
                  <div className="worker-specialties">
                    {worker.specialties.map((specialty, idx) => (
                      <span key={idx} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthEventsWorkers;
