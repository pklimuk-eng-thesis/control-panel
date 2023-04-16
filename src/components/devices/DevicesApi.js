import {
  CONTROL_STATION_ADDRESS,
  DEVICE_ENABLED_ENDPOINT,
  DEVICE_INFO_ENDPOINT,
  DEVICE_LOGS_ENDPOINT,
} from "../../config/DevicesConfig";

export const fetchDeviceInfo = async (deviceId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_INFO_ENDPOINT}`
  );
  if (!response.ok) {
    return { enabled: false };
  }
  const data = await response.json();
  return data;
};

export const changeDeviceState = async (deviceId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_ENABLED_ENDPOINT}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to change device state for device ${deviceId}.`);
  }
  const data = await response.json();
  return data;
};

export const fetchDeviceLogsLimitN = async (deviceId, limit) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_LOGS_ENDPOINT}?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch device logs for device ${deviceId}.`);
  }
  const data = await response.json();
  return data;
};
