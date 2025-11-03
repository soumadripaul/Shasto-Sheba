import React, { useState, useEffect } from 'react';
import healthCentersData from '../data/healthCenters.json';
import '../styles/HealthMap.css';

const HealthMap = () => {
  const [healthCenters, setHealthCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    // Load health centers from JSON (works offline)
    setHealthCenters(healthCentersData);
    setFilteredCenters(healthCentersData);
  }, []);

  useEffect(() => {
    // Filter centers based on selected criteria
    let filtered = healthCenters;

    if (selectedDivision) {
      filtered = filtered.filter(center => center.division === selectedDivision);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(center => center.district === selectedDistrict);
    }
    if (selectedUpazila) {
      filtered = filtered.filter(center => center.upazila === selectedUpazila);
    }
    if (selectedType) {
      filtered = filtered.filter(center => center.type === selectedType);
    }

    setFilteredCenters(filtered);
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedType, healthCenters]);

  const divisions = [...new Set(healthCenters.map(center => center.division))];
  const districts = selectedDivision 
    ? [...new Set(healthCenters.filter(c => c.division === selectedDivision).map(c => c.district))]
    : [];
  const upazilas = selectedDistrict
    ? [...new Set(healthCenters.filter(c => c.district === selectedDistrict).map(c => c.upazila))]
    : [];
  const types = [...new Set(healthCenters.map(center => center.type))];

  const resetFilters = () => {
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazila('');
    setSelectedType('');
  };

  const getTypeIcon = (type) => {
    const icons = {
      'হাসপাতাল': '🏥',
      'ক্লিনিক': '⚕️',
      'স্বাস্থ্য কমপ্লেক্স': '🏨',
      'মাতৃসদন': '👶',
      'টিকা কেন্দ্র': '💉',
      'বিশেষায়িত ক্লিনিক': '🩺',
      'মোবাইল সেবা': '🚑',
      'পরিবার পরিকল্পনা': '👨‍👩‍👧‍👦'
    };
    return icons[type] || '🏥';
  };

  return (
    <div className="health-map-container">
      <div className="health-map-content">
        <h1 className="page-title">
          <span className="title-icon">🗺️</span>
          স্বাস্থ্য সেবা কেন্দ্র খুঁজুন
        </h1>
        <p className="page-subtitle">
          আপনার এলাকার নিকটস্থ হাসপাতাল, ক্লিনিক ও স্বাস্থ্য কেন্দ্রের তথ্য
        </p>

        <div className="filter-section">
          <h2>এলাকা নির্বাচন করুন</h2>
          <div className="filter-grid">
            <div className="filter-group">
              <label>বিভাগ</label>
              <select 
                value={selectedDivision} 
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('');
                  setSelectedUpazila('');
                }}
              >
                <option value="">সব বিভাগ</option>
                {divisions.map(division => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>জেলা</label>
              <select 
                value={selectedDistrict} 
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila('');
                }}
                disabled={!selectedDivision}
              >
                <option value="">সব জেলা</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>উপজেলা</label>
              <select 
                value={selectedUpazila} 
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={!selectedDistrict}
              >
                <option value="">সব উপজেলা</option>
                {upazilas.map(upazila => (
                  <option key={upazila} value={upazila}>{upazila}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>সেবার ধরন</label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">সব ধরন</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {(selectedDivision || selectedDistrict || selectedUpazila || selectedType) && (
            <button className="reset-button" onClick={resetFilters}>
              🔄 ফিল্টার রিসেট করুন
            </button>
          )}
        </div>

        <div className="results-section">
          <h2>
            পাওয়া গেছে: {filteredCenters.length}টি সেবা কেন্দ্র
          </h2>
          <div className="centers-grid">
            {filteredCenters.map(center => (
              <div key={center.id} className="center-card">
                <div className="center-header">
                  <span className="center-type-icon">{getTypeIcon(center.type)}</span>
                  <div>
                    <h3>{center.name}</h3>
                    <span className="center-type">{center.type}</span>
                  </div>
                </div>

                <div className="center-location">
                  <span className="location-icon">📍</span>
                  <div>
                    <p className="location-address">
                      {center.upazila}, {center.district}, {center.division}
                    </p>
                    <p className="location-description">
                      {center.location_description}
                    </p>
                  </div>
                </div>

                <div className="center-services">
                  <h4>সেবাসমূহ:</h4>
                  <ul>
                    {center.services.map((service, index) => (
                      <li key={index}>✓ {service}</li>
                    ))}
                  </ul>
                </div>

                <div className="center-info">
                  <div className="info-item">
                    <span className="info-icon">🕒</span>
                    <span>{center.timing}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📞</span>
                    <a href={`tel:${center.contact}`}>{center.contact}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">😕</span>
              <p>দুঃখিত, এই এলাকায় কোনো সেবা কেন্দ্র পাওয়া যায়নি।</p>
              <button onClick={resetFilters} className="try-again-button">
                আবার চেষ্টা করুন
              </button>
            </div>
          )}
        </div>

        <div className="offline-notice">
          <span className="offline-icon">📴</span>
          <p>এই তথ্য আপনার ফোনে সংরক্ষিত। ইন্টারনেট ছাড়াই দেখতে পারবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default HealthMap;
