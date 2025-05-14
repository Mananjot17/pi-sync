// src/components/Header.js
import React from "react";

const Header = ({ onRefresh }) => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">📡</span>
        <h1>PiSync Admin Dashboard</h1>
      </div>
      <div className="header-actions">
        <div className="system-status">
          <span className="status-indicator online"></span>
          System Online
        </div>
        <button className="refresh-button" onClick={onRefresh}>
          <span className="refresh-icon">⟳</span> Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
