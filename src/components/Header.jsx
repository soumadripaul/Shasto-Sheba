import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
