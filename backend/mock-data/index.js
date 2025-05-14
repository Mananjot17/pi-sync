const { v4: uuidv4 } = require("uuid");

const generateMockDevices = (count) => {
  const statuses = ["Success", "Pending", "Failed"];
  const devices = [];

  for (let i = 0; i < count; i++) {
    const statusIndex = Math.floor(Math.random() * 3);
    const lastSyncTime = new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    );

    devices.push({
      id: `PiSync-${1000 + i}`,
      lastSyncTime: lastSyncTime.toISOString(),
      syncStatus: statuses[statusIndex],
      location: [
        "School Lab",
        "Community Center",
        "Mobile Library",
        "Rural Classroom",
      ][Math.floor(Math.random() * 4)],
    });
  }

  return devices;
};

const generateErrorLogs = (devices) => {
  const errorTypes = [
    "Connection timeout",
    "Authentication failed",
    "Insufficient storage",
    "Data corruption",
    "Network error",
  ];

  const logs = [];

  // Select devices with Failed status
  const failedDevices = devices.filter(
    (device) => device.syncStatus === "Failed"
  );

  failedDevices.forEach((device) => {
    const errorTime = new Date(
      Date.parse(device.lastSyncTime) + Math.floor(Math.random() * 10000)
    );

    logs.push({
      id: uuidv4(),
      deviceId: device.id,
      timestamp: errorTime.toISOString(),
      errorType: errorTypes[Math.floor(Math.random() * errorTypes.length)],
      details: `Error occurred during sync attempt for device ${device.id}`,
    });
  });

  return logs;
};

// Generate initial mock data
const mockDevices = generateMockDevices(18);
const mockErrorLogs = generateErrorLogs(mockDevices);

module.exports = {
  mockDevices,
  mockErrorLogs,
  generateErrorLogs,
};
