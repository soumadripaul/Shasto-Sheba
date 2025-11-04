import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

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
          <span className="logo-icon">🩺</span>
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
