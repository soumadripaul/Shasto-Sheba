import React, { useState } from 'react';
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#4CAF50" stroke="#ffffff" strokeWidth="2"/>
              <path d="M20 10 L20 30 M10 20 L30 20" stroke="#ffffff" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="3" fill="#ffffff"/>
            </svg>
          </span>
          <span className="logo-text">মনবন্ধু</span>
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
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}>
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
