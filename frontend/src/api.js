// src/api.js
const API_URL = "http://localhost:8080/api";

export const fetchDevices = async () => {
  const response = await fetch(`${API_URL}/devices`);

  if (!response.ok) {
    throw new Error(`Error fetching devices: ${response.statusText}`);
  }

  return response.json();
};

export const triggerSync = async (deviceId) => {
  const response = await fetch(`${API_URL}/devices/${deviceId}/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error triggering sync: ${response.statusText}`);
  }

  return response.json();
};

export const fetchErrorLogs = async () => {
  const response = await fetch(`${API_URL}/errors`);

  if (!response.ok) {
    throw new Error(`Error fetching error logs: ${response.statusText}`);
  }

  return response.json();
};

export const fetchDeviceErrors = async (deviceId) => {
  const response = await fetch(`${API_URL}/devices/${deviceId}/errors`);

  if (!response.ok) {
    throw new Error(`Error fetching device errors: ${response.statusText}`);
  }

  return response.json();
};
