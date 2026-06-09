import React from "react";
import "./DownloadContainer.css";

const DownloadContainer = ({ onClose }) => {
  return (
    <div className="download-overlay" role="dialog" aria-modal="true">
      <div className="download-container">
        <h2 className="download-title">Download Settings</h2>
        
        <div className="download-section">
          <p className="download-description">Manage your offline library and download preferences.</p>
          
          <div className="setting-item">
            <label htmlFor="qualitySelect">Audio Quality</label>
            <select id="qualitySelect" className="download-select">
              <option value="128">128 kbps (Standard)</option>
              <option value="256">256 kbps (High)</option>
              <option value="320">320 kbps (Very High)</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label htmlFor="downloadWifi">Download over Wi-Fi only</label>
            <input type="checkbox" id="downloadWifi" defaultChecked />
          </div>
        </div>

        <div className="download-actions">
          <button className="download-btn-primary">Download All Liked Songs</button>
          <button className="download-btn-secondary">Clear Downloads</button>
        </div>

        <button className="download-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DownloadContainer;
