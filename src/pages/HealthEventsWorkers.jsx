import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../services/api';
import eventsData from '../data/events.json';
import workersData from '../data/workers.json';
import '../styles/HealthEventsWorkers.css';

const HealthEventsWorkers = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useOfflineData, setUseOfflineData] = useState(false);

  useEffect(() => {
    // Check if there's a tab parameter in the URL state
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
    
    // Load data from API
    loadData();
  }, [location]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Try to load from API
      const [eventsResponse, workersResponse] = await Promise.all([
        apiService.getEvents({ upcoming: true }),
        apiService.getWorkers()
      ]);

      if (eventsResponse.success && workersResponse.success) {
        setEvents(eventsResponse.data);
        setWorkers(workersResponse.data);
        setUseOfflineData(false);
      }
    } catch (error) {
      console.error('Error loading data from API, using offline data:', error);
      // Fallback to JSON files
      setEvents(eventsData);
      setWorkers(workersData);
      setUseOfflineData(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

        {useOfflineData && (
          <div className="offline-notice">
            ⚠️ অফলাইন মোডে চলছে - সংরক্ষিত তথ্য দেখাচ্ছে
          </div>
        )}

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

        {loading ? (
          <div className="loading">লোড হচ্ছে...</div>
        ) : (
          <>
            {activeTab === 'events' && (
              <div className="events-section">
                <h2>আসন্ন স্বাস্থ্য শিবির</h2>
                <div className="events-grid">
                  {events.map((event) => (
                    <div key={event.id || event._id} className="event-card">
                      <div className="event-header">
                        <span className="event-icon">{event.icon || '📅'}</span>
                        <h3>{event.title}</h3>
                      </div>
                      <div className="event-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span>{event.date ? formatDate(event.date) : event.date}</span>
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
                      {event.description && (
                        <div className="event-description">
                          <p>{event.description}</p>
                        </div>
                      )}
                      {event.services && event.services.length > 0 && (
                        <div className="event-services">
                          <h4>সেবাসমূহ:</h4>
                          <ul>
                            {event.services.map((service, idx) => (
                              <li key={idx}>✓ {service}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                  {workers.map((worker) => (
                    <div key={worker.id || worker._id} className="worker-card">
                      <div className="worker-avatar">{worker.gender === 'male' ? '👨‍⚕️' : '👩‍⚕️'}</div>
                      <h3>{worker.name}</h3>
                      <div className="worker-role">{worker.designation || worker.role}</div>
                      {worker.specialization && (
                        <div className="worker-specialization">
                          বিশেষত্ব: {worker.specialization}
                        </div>
                      )}
                      <div className="worker-info">
                        <div className="info-item">
                          <span className="info-icon">📍</span>
                          <span>{worker.area}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-icon">📞</span>
                          <a href={`tel:${worker.phone || worker.contact}`}>
                            {worker.phone || worker.contact}
                          </a>
                        </div>
                        {worker.email && (
                          <div className="info-item">
                            <span className="info-icon">✉️</span>
                            <span>{worker.email}</span>
                          </div>
                        )}
                      </div>
                      {worker.availability && (
                        <div className="worker-availability">
                          অবস্থা: {worker.availability}
                        </div>
                      )}
                      {worker.trained_by && (
                        <div className="worker-badge">
                          ✓ Trained by {worker.trained_by}
                        </div>
                      )}
                      {worker.specialties && worker.specialties.length > 0 && (
                        <div className="worker-specialties">
                          {worker.specialties.map((specialty, idx) => (
                            <span key={idx} className="specialty-tag">{specialty}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HealthEventsWorkers;
