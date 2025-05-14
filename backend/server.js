// backend/server.js
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const setupMiddleware = require("./middleware");
const {
  mockDevices,
  mockErrorLogs,
  generateErrorLogs,
} = require("./mock-data");
const app = express();
const PORT = process.env.PORT || 8080;

// Setup middleware
setupMiddleware(app);

// API routes

// Get all devices with sync status
app.get("/api/devices", (req, res) => {
  res.json(mockDevices);
});

// Trigger sync for a device
app.post("/api/devices/:id/sync", (req, res) => {
  const deviceId = req.params.id;
  const device = mockDevices.find((d) => d.id === deviceId);

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  // Simulate sync outcome (90% success rate)
  const syncSuccessful = Math.random() < 0.9;

  if (syncSuccessful) {
    device.syncStatus = "Success";
    device.lastSyncTime = new Date().toISOString();

    const errorIndexesToRemove = [];

    mockErrorLogs.forEach((log, index) => {
      if (log.deviceId === deviceId) {
        errorIndexesToRemove.push(index);
      }
    });

    // Remove the errors in reverse order to avoid index shifting problems
    for (let i = errorIndexesToRemove.length - 1; i >= 0; i--) {
      mockErrorLogs.splice(errorIndexesToRemove[i], 1);
    }

    return res.json({
      success: true,
      message: `Sync triggered successfully for device ${deviceId}`,
      device,
    });
  } else {
    device.syncStatus = "Failed";
    device.lastSyncTime = new Date().toISOString();

    // Add new error log
    mockErrorLogs.push({
      id: uuidv4(),
      deviceId: device.id,
      timestamp: new Date().toISOString(),
      errorType: "Connection timeout",
      details: `Manual sync attempt failed for device ${deviceId}`,
    });

    return res.json({
      success: false,
      message: `Sync failed for device ${deviceId}. Check error logs.`,
      device,
    });
  }
});

// Get error logs
app.get("/api/errors", (req, res) => {
  res.json(mockErrorLogs);
});

// Get error logs for a specific device
app.get("/api/devices/:id/errors", (req, res) => {
  const deviceId = req.params.id;
  const deviceErrors = mockErrorLogs.filter((log) => log.deviceId === deviceId);

  res.json(deviceErrors);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
