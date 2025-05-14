// src/components/ErrorLogs.js
import React, { useState } from "react";

const ErrorLogs = ({ errorLogs, devices }) => {
  const [expandedLog, setExpandedLog] = useState(null);

  // Get device name by ID
  const getDeviceName = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId);
    return device ? device.id : "Unknown Device";
  };

  // Format timestamp to a more readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  // Toggle expanded view for error details
  const toggleExpand = (logId) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  if (errorLogs.length === 0) {
    return (
      <div className="error-logs-container">
        <h2>Error Logs</h2>
        <div className="no-errors">No sync errors reported.</div>
      </div>
    );
  }

  return (
    <div className="error-logs-container">
      <h2>Error Logs ({errorLogs.length})</h2>

      <div className="error-list">
        {errorLogs.map((log) => (
          <div key={log.id}>
            <div className="error-header">
              <div className="error-device">{getDeviceName(log.deviceId)}</div>
              <div className="error-type">{log.errorType}</div>
              <div className="error-time">{formatTime(log.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorLogs;
