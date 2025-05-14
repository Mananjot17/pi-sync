// src/components/DeviceTable.js
import React from "react";

const DeviceTable = ({ devices, onSync, syncInProgress }) => {
  // Format timestamp to a more readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get the appropriate CSS class for status
  const getStatusClass = (status) => {
    switch (status) {
      case "Success":
        return "status-success";
      case "Failed":
        return "status-failed";
      case "Pending":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="device-table-container">
      <h2>Registered Devices ({devices.length})</h2>

      <table className="device-table">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Location</th>
            <th>Last Sync</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.location}</td>
              <td>{formatTime(device.lastSyncTime)}</td>
              <td>
                <span
                  className={`status-badge ${getStatusClass(
                    device.syncStatus
                  )}`}
                >
                  {device.syncStatus}
                </span>
              </td>
              <td>
                <button
                  onClick={() => onSync(device.id)}
                  disabled={syncInProgress[device.id]}
                  className="sync-button"
                >
                  {syncInProgress[device.id] ? "Syncing..." : "Sync Now"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
