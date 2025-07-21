import React from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';

const Header = ({ onLogout, user }) => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
  };

  const userName = user?.name || 'User';

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo">🔐 Securelytix</h1>
          <span className="tagline">Security Analytics Platform</span>
        </div>

        <nav className="nav-section">
          <ul className="nav-links">
            <li><a href="#dashboard" className="nav-link">Dashboard</a></li>
          </ul>
        </nav>

        <div className="user-section">
          <span className="user-name">👋 Welcome, {userName}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
