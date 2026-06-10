import React, { useState } from 'react';
import { Mail, User, Lock, X } from 'lucide-react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import './AccountSettings.css';

const AccountSettings = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false); // Default to signup as in image
  
  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      if (email.trim() && password.trim()) {
        setIsLoggedIn(true);
        setUsername(email.split('@')[0]);
      }
    } else {
      if (username.trim() && email.trim() && password.trim() && password === confirmPassword) {
        setIsLoggedIn(true);
      } else if (password !== confirmPassword) {
        alert("Passwords don't match!");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsLoginMode(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Reset fields on toggle
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      setIsLoggedIn(true);
      // Set username to their display name or email prefix
      setUsername(user.displayName || user.email.split('@')[0]);
      setEmail(user.email);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert(`Failed to sign in with Google: ${error.message || "Please try again."}`);
    }
  };

  return (
    <div className="account-overlay" role="dialog" aria-modal="true">
      <div className="account-container modern-auth-container">
        
        <button className="auth-close-icon" onClick={onClose}>
          <X size={20} />
        </button>

        {!isLoggedIn ? (
          <div className="auth-content">
            <div className="auth-header">
              <div className="auth-logo">
                <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#46a8ff" />
                  <circle cx="50" cy="50" r="40" fill="#ffffff" />
                  <rect x="30" y="38" width="5" height="18" rx="2.5" fill="#46a8ff" />
                  <rect x="39" y="32" width="5" height="30" rx="2.5" fill="#46a8ff" />
                  <rect x="47.5" y="25" width="5" height="44" rx="2.5" fill="#46a8ff" />
                  <rect x="56" y="32" width="5" height="30" rx="2.5" fill="#46a8ff" />
                  <rect x="65" y="38" width="5" height="18" rx="2.5" fill="#46a8ff" />
                  <text x="50" y="78" fontFamily="sans-serif" fontWeight="bold" fontSize="7" fill="#46a8ff" textAnchor="middle" letterSpacing="1">VIBEFLOW</text>
                </svg>
              </div>
              <h2 className="auth-title">
                {isLoginMode ? 'Welcome back' : 'Your journey starts here'}
              </h2>
              <p className="auth-subtitle">
                {isLoginMode ? 'Sign in to continue' : 'Take the first step'}
              </p>
            </div>
            
            <form className="auth-form" onSubmit={handleAuth}>
              <div className="auth-field">
                <Mail className="auth-field-icon" size={18} />
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              {!isLoginMode && (
                <div className="auth-field">
                  <User className="auth-field-icon" size={18} />
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
              )}

              <div className="auth-field">
                <Lock className="auth-field-icon" size={18} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              {!isLoginMode && (
                <div className="auth-field">
                  <Lock className="auth-field-icon" size={18} />
                  <input 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              )}

              {isLoginMode && (
                <div className="auth-forgot-password">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Forgot password flow to be implemented'); }}>Forgot Password?</a>
                </div>
              )}

              <button type="submit" className="auth-primary-btn">
                {isLoginMode ? 'Sign in' : 'Sign up'}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-social-buttons">
              <button className="social-btn facebook-btn" title="Facebook">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </button>
              <button className="social-btn apple-btn" title="Apple">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M16.36 10.32c-.02-2.16 1.76-3.2 1.84-3.25-1-1.46-2.55-1.65-3.1-1.68-1.32-.13-2.58.78-3.25.78-.66 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.5 2.12-1.5 2.58-.38 6.4.1 7.1.72 1 1.55 2.1 2.62 2.07 1.02-.04 1.42-.66 2.66-.66 1.23 0 1.58.66 2.66.63 1.1-.02 1.82-1.02 2.52-2.04.82-1.18 1.16-2.32 1.18-2.38-.02-.02-2.22-.85-2.25-2.56zM14.9 5.86c.58-.7 1-1.68.88-2.66-1.04.05-2.07.6-2.66 1.3-.53.62-1.02 1.63-.9 2.6 1.14.08 2.1-.53 2.68-1.24z"/>
                </svg>
              </button>
              <button className="social-btn google-btn" title="Google" onClick={handleGoogleAuth}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                </svg>
              </button>
            </div>

            <div className="auth-footer">
              <p>
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <span className="auth-toggle-link" onClick={toggleMode}>
                  {isLoginMode ? 'Sign up' : 'Sign in'}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="account-profile-view" style={{ paddingTop: '20px' }}>
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
            
            <button className="auth-primary-btn" style={{ marginTop: '20px' }} onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
