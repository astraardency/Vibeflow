import React from 'react';
import './Header.css';
import { Download, Sun, Moon } from 'lucide-react';

const Header = ({ onAction, isDarkMode, setIsDarkMode, openProfile, openDownload }) => {
  return (
    <header className="header">
      <h1 className="header-title" onClick={() => onAction('Good Morning!')}>Good Morning</h1>
      <div className="header-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ 
            background: 'rgba(0,0,0,0.05)', 
            border: 'none', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            color: 'var(--text-color)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            marginRight: '8px',
            transition: 'background 0.2s ease'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="download-btn" onClick={openDownload}>
          <Download size={24} strokeWidth={2.5} />
        </button>
        <div className="profile-avatar" onClick={openProfile}></div>
      </div>
    </header>
  );
};

export default Header;
