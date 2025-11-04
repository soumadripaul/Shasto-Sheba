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
  
  // Bangladesh location data - using local data
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  useEffect(() => {
    // Load health centers from JSON (works offline)
    setHealthCenters(healthCentersData);
    setFilteredCenters(healthCentersData);
    
    // Load divisions from API
    loadDivisions();
  }, []);

  const loadDivisions = async () => {
    try {
      setLoadingLocations(true);
      console.log('🔵 Loading divisions from API...');
      
      const response = await fetch('https://bdapi.vercel.app/api/v.1/division');
      const data = await response.json();
      
      console.log('✅ Divisions API response:', data);
      
      if (data && data.data && data.data.length > 0) {
        setDivisions(data.data);
        console.log('✅ Loaded', data.data.length, 'divisions');
      }
    } catch (error) {
      console.error('❌ Error loading divisions:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const loadDistricts = async (divisionId) => {
    try {
      setLoadingLocations(true);
      console.log('🔵 Loading districts for division:', divisionId);
      
      const response = await fetch(`https://bdapi.vercel.app/api/v.1/district/${divisionId}`);
      const data = await response.json();
      
      console.log('✅ Districts API response:', data);
      
      if (data && data.data && data.data.length > 0) {
        setDistricts(data.data);
        console.log('✅ Loaded', data.data.length, 'districts');
      }
    } catch (error) {
      console.error('❌ Error loading districts:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const loadUpazilas = async (districtId) => {
    try {
      setLoadingLocations(true);
      console.log('🔵 === UPAZILA LOADING START ===');
      console.log('🔵 District ID:', districtId);
      console.log('🔵 API URL:', `https://bdapi.vercel.app/api/v.1/upazila/${districtId}`);
      
      // Correct endpoint for upazilas
      const response = await fetch(`https://bdapi.vercel.app/api/v.1/upazila/${districtId}`);
      
      console.log('📡 Response Status:', response.status);
      console.log('📡 Response OK:', response.ok);
      
      const data = await response.json();
      
      console.log('✅ Upazilas API response:', data);
      console.log('📊 Response structure:', {
        hasData: !!data,
        hasDataProperty: !!data?.data,
        dataLength: data?.data?.length,
        dataType: typeof data?.data,
        isArray: Array.isArray(data?.data),
        firstItem: data?.data?.[0]
      });
      
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        setUpazilas(data.data);
        console.log('✅ Successfully loaded', data.data.length, 'upazilas');
        console.log('✅ First upazila:', data.data[0]);
      } else {
        console.warn('⚠️ No upazilas found for district:', districtId);
        console.warn('⚠️ Response data:', data);
        setUpazilas([]);
      }
    } catch (error) {
      console.error('❌ Error loading upazilas:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      setUpazilas([]);
    } finally {
      setLoadingLocations(false);
      console.log('🏁 === UPAZILA LOADING END ===');
    }
  };

  useEffect(() => {
    // Filter centers based on selected criteria
    let filtered = healthCenters;

    if (selectedDivision) {
      // Find division name (can be id, name, or bn_name)
      const divisionObj = divisions.find(d => 
        d.id === selectedDivision || 
        d._id === selectedDivision || 
        d.name === selectedDivision ||
        d.bn_name === selectedDivision ||
        d.division === selectedDivision
      );
      const divisionName = divisionObj?.bn_name || divisionObj?.name || divisionObj?.division || selectedDivision;
      filtered = filtered.filter(center => 
        center.division === divisionName || 
        center.division.includes(divisionName) ||
        divisionName.includes(center.division)
      );
    }
    if (selectedDistrict) {
      // Find district name
      const districtObj = districts.find(d => 
        d.id === selectedDistrict || 
        d._id === selectedDistrict || 
        d.name === selectedDistrict ||
        d.bn_name === selectedDistrict ||
        d.district === selectedDistrict
      );
      const districtName = districtObj?.bn_name || districtObj?.name || districtObj?.district || selectedDistrict;
      filtered = filtered.filter(center => 
        center.district === districtName ||
        center.district.includes(districtName) ||
        districtName.includes(center.district)
      );
    }
    if (selectedUpazila) {
      // Find upazila name
      const upazilaObj = upazilas.find(u => 
        u.id === selectedUpazila || 
        u._id === selectedUpazila || 
        u.name === selectedUpazila ||
        u.bn_name === selectedUpazila ||
        u.upazila === selectedUpazila
      );
      const upazilaName = upazilaObj?.bn_name || upazilaObj?.name || upazilaObj?.upazila || selectedUpazila;
      filtered = filtered.filter(center => 
        center.upazila === upazilaName ||
        center.upazila.includes(upazilaName) ||
        upazilaName.includes(center.upazila)
      );
    }
    if (selectedType) {
      filtered = filtered.filter(center => center.type === selectedType);
    }

    setFilteredCenters(filtered);
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedType, healthCenters, divisions, districts, upazilas]);

  const types = [...new Set(healthCenters.map(center => center.type))];

  const resetFilters = () => {
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazila('');
    setSelectedType('');
    setDistricts([]);
    setUpazilas([]);
  };

  const handleDivisionChange = (divisionId) => {
    setSelectedDivision(divisionId);
    setSelectedDistrict('');
    setSelectedUpazila('');
    setDistricts([]);
    setUpazilas([]);
    if (divisionId) {
      loadDistricts(divisionId);
    }
  };

  const handleDistrictChange = (districtId) => {
    console.log('🏪 === DISTRICT CHANGE ===');
    console.log('🏪 Selected District ID:', districtId);
    console.log('🏪 District ID type:', typeof districtId);
    
    setSelectedDistrict(districtId);
    setSelectedUpazila('');
    setUpazilas([]);
    
    if (districtId) {
      console.log('🏪 Calling loadUpazilas with:', districtId);
      loadUpazilas(districtId);
    } else {
      console.log('🏪 No district selected, skipping upazila load');
    }
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
          
          {/* Debug Info */}
          <div style={{
            background: '#f0f9ff',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '14px',
            color: '#0369a1'
          }}>
            📊 ডেটা স্ট্যাটাস: বিভাগ {divisions.length}টি | জেলা {districts.length}টি | উপজেলা {upazilas.length}টি
            {loadingLocations && ' | ⏳ লোড হচ্ছে...'}
          </div>
          
          <div className="filter-grid">
            <div className="filter-group">
              <label>বিভাগ</label>
              <select 
                value={selectedDivision} 
                onChange={(e) => handleDivisionChange(e.target.value)}
                disabled={loadingLocations}
              >
                <option value="">সব বিভাগ</option>
                {divisions.map((division) => (
                  <option 
                    key={division.id || division._id || division.division} 
                    value={division.id || division._id || division.division}
                  >
                    {division.bn_name || division.name || division.division}
                  </option>
                ))}
              </select>
              {loadingLocations && !districts.length && <span className="loading-text">লোড হচ্ছে...</span>}
            </div>

            <div className="filter-group">
              <label>জেলা</label>
              <select 
                value={selectedDistrict} 
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!selectedDivision || loadingLocations}
              >
                <option value="">সব জেলা</option>
                {districts.map((district) => (
                  <option 
                    key={district.id || district._id || district.district} 
                    value={district.id || district._id || district.district}
                  >
                    {district.bn_name || district.name || district.district}
                  </option>
                ))}
              </select>
              {loadingLocations && districts.length === 0 && selectedDivision && <span className="loading-text">লোড হচ্ছে...</span>}
            </div>

            <div className="filter-group">
              <label>উপজেলা</label>
              <select 
                value={selectedUpazila} 
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={!selectedDistrict || loadingLocations}
              >
                <option value="">সব উপজেলা</option>
                {upazilas.map((upazila) => (
                  <option 
                    key={upazila.id || upazila._id || upazila.upazila} 
                    value={upazila.id || upazila._id || upazila.upazila}
                  >
                    {upazila.bn_name || upazila.name || upazila.upazila}
                  </option>
                ))}
              </select>
              {loadingLocations && upazilas.length === 0 && selectedDistrict && <span className="loading-text">লোড হচ্ছে...</span>}
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
