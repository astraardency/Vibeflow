import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      if (username.trim() && password.trim()) {
        setIsLoggedIn(true);
      }
    } else {
      if (username.trim() && email.trim() && password.trim() && password === confirmPassword) {
        setIsLoggedIn(true);
      } else if (password !== confirmPassword) {
        alert("Passwords don't match!");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoginMode(true);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Reset fields on toggle
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="account-overlay" role="dialog" aria-modal="true">
      <div className="account-container">
        <h2 className="account-title">
          {isLoggedIn ? 'Account Settings' : (isLoginMode ? 'Login to Melophile' : 'Create an Account')}
        </h2>
        
        {!isLoggedIn ? (
          <div className="account-auth-container">
            <form className="account-form" onSubmit={handleAuth}>
              <div className="account-field">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>

              {!isLoginMode && (
                <div className="account-field">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              )}

              <div className="account-field">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              {!isLoginMode && (
                <div className="account-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              )}

              {isLoginMode && (
                <div className="account-forgot-password">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Forgot password flow to be implemented'); }}>Forgot Password?</a>
                </div>
              )}

              <button type="submit" className="account-primary-btn">
                {isLoginMode ? 'Log In' : 'Sign Up'}
              </button>
            </form>

            <div className="account-toggle-mode">
              <p>
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <span className="account-toggle-link" onClick={toggleMode}>
                  {isLoginMode ? 'Sign Up here' : 'Log In here'}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="account-profile-view">
            <div className="account-avatar-large">
              {username.charAt(0).toUpperCase()}
            </div>
            <h3 className="account-username">@{username}</h3>
            
            <div className="account-settings-list">
              <div className="account-setting-item">
                <span>Data Saver</span>
                <input type="checkbox" />
              </div>
              <div className="account-setting-item">
                <span>Explicit Content</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="account-setting-item">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
            
            <button className="account-logout-btn" onClick={handleLogout}>Log Out</button>
          </div>
        )}
        
        <button className="account-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AccountSettings;
