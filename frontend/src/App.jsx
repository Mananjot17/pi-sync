// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import DeviceTable from "./components/DeviceTable";
import ErrorLogs from "./components/ErrorLogs";
import Header from "./components/Header";
import { fetchDevices, triggerSync, fetchErrorLogs } from "./api";

function App() {
  const [devices, setDevices] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("devices");
  const [syncInProgress, setSyncInProgress] = useState({});

  // Load data on component mount (only once)
  useEffect(() => {
    loadData();
    // No automatic refresh interval
  }, []);

  // Function to load all dashboard data
  const loadData = async () => {
    try {
      setIsLoading(true);
      const devicesData = await fetchDevices();
      const errorsData = await fetchErrorLogs();
      setDevices(devicesData);
      setErrorLogs(errorsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual refresh button click
  const handleRefresh = () => {
    loadData();
  };

  // Handle sync button click
  const handleSync = async (deviceId) => {
    try {
      setSyncInProgress((prev) => ({ ...prev, [deviceId]: true }));
      const result = await triggerSync(deviceId);

      // Update devices list with the updated device
      setDevices(
        devices.map((device) =>
          device.id === deviceId ? result.device : device
        )
      );

      if (result.success) {
        // If sync was successful, remove any errors for this device
        setErrorLogs(errorLogs.filter((log) => log.deviceId !== deviceId));
      } else {
        // If sync failed, refresh error logs
        const updatedLogs = await fetchErrorLogs();
        setErrorLogs(updatedLogs);
      }
    } catch (error) {
      console.error(`Failed to sync device ${deviceId}:`, error);
    } finally {
      setSyncInProgress((prev) => ({ ...prev, [deviceId]: false }));
    }
  };

  // Filter devices with failed sync status for quick access
  const failedDevices = devices.filter(
    (device) => device.syncStatus === "Failed"
  );

  return (
    <div className="app">
      <Header onRefresh={handleRefresh} />

      <div className="tabs">
        <button
          className={activeTab === "devices" ? "active" : ""}
          onClick={() => setActiveTab("devices")}
        >
          Devices
        </button>
        <button
          className={activeTab === "errors" ? "active" : ""}
          onClick={() => setActiveTab("errors")}
        >
          Error Logs{" "}
          {failedDevices.length > 0 && (
            <span className="error-badge">{failedDevices.length}</span>
          )}
        </button>
      </div>

      <div className="container">
        {isLoading ? (
          <div className="loading">Loading dashboard data...</div>
        ) : (
          <>
            {activeTab === "devices" && (
              <DeviceTable
                devices={devices}
                onSync={handleSync}
                syncInProgress={syncInProgress}
              />
            )}

            {activeTab === "errors" && (
              <ErrorLogs errorLogs={errorLogs} devices={devices} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
