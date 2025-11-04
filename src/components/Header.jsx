import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

// বিভিন্ন logo icon options (যেকোনো একটি uncomment করে ব্যবহার করুন)
// import { MedicalCrossIcon } from './LogoIcons'; // ✅ Default (Green Medical Cross)
// import { HeartPulseIcon } from './LogoIcons'; // ❤️ Heart with Pulse
// import { StethoscopeIcon } from './LogoIcons'; // 🩺 Stethoscope
// import { ShieldHeartIcon } from './LogoIcons'; // 🛡️ Shield with Heart
// import { HandHeartIcon } from './LogoIcons'; // 🤲 Caring Hand
// import { LotusIcon } from './LogoIcons'; // 🪷 Lotus Flower

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimer, setDropdownTimer] = useState(null);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimer) {
        clearTimeout(dropdownTimer);
      }
    };
  }, [dropdownTimer]);

  const openDropdown = () => {
    // Clear any existing timer
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
    }
    setIsDropdownOpen(true);
  };

  const scheduleCloseDropdown = () => {
    // Set timer to close dropdown after 2.5 seconds
    const timer = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 2500); // 2.5 seconds
    setDropdownTimer(timer);
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      if (dropdownTimer) {
        clearTimeout(dropdownTimer);
      }
    } else {
      openDropdown();
      scheduleCloseDropdown();
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
    }
  };

  const handleMouseEnter = () => {
    openDropdown();
  };

  const handleMouseLeave = () => {
    scheduleCloseDropdown();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">🩺মনবন্ধু</span>
        </Link>
        <nav className="nav">
          <button className="nav-toggle" onClick={() => {
            document.querySelector('.nav-menu').classList.toggle('active');
          }}>
            ☰
          </button>
          <ul className="nav-menu">
            <li><Link to="/">হোম</Link></li>
            <li><Link to="/mental-health">মানসিক স্বাস্থ্য</Link></li>
            <li><Link to="/health-map">স্বাস্থ্য সেবা</Link></li>
            <li><Link to="/help-request">সাহায্য চাই</Link></li>
            <li><Link to="/health-tips">স্বাস্থ্য টিপস</Link></li>
            <li className="dropdown" 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                আরও দেখুন <span className="dropdown-arrow">▼</span>
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/maternal-health" onClick={closeDropdown}>শিশু ও মাতৃস্বাস্থ্য</Link></li>
                  <li><Link to="/symptom-checker" onClick={closeDropdown}>লক্ষণ পরীক্ষা</Link></li>
                  <li><Link to="/health-events" onClick={closeDropdown}>স্বাস্থ্য শিবির</Link></li>
                  <li><Link to="/health-workers" onClick={closeDropdown}>স্বাস্থ্য কর্মী</Link></li>
                  <li><Link to="/voice-assistant" onClick={closeDropdown}>ভয়েস সহায়ক</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
