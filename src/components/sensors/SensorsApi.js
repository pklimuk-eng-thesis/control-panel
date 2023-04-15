import {
  CONTROL_STATION_ADDRESS,
  SENSOR_DETECTED_ENDPOINT,
  SENSOR_ENABLED_ENDPOINT,
  SENSOR_INFO_ENDPOINT,
  SENSOR_LOGS_ENDPOINT,
} from "../../config/SensorsConfig";

export const fetchSensorInfo = async (sensorId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_INFO_ENDPOINT}`
  );
  if (!response.ok) {
    return { enabled: false, detected: false };
  }
  const data = await response.json();
  return data;
};

export const changeSensorState = async (sensorId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_ENABLED_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to change sensor state for sensor ${sensorId}.`);
  }
  const data = await response.json();
  return data;
};

export const changeSensorDetectionStatus = async (sensorId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_DETECTED_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to change sensor detection status for sensor ${sensorId}.`
    );
  }
  const data = await response.json();
  return data;
};

export const fetchSensorLogsLimitN = async (sensorId, limit) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_LOGS_ENDPOINT}?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch sensor logs for sensor ${sensorId}.`);
  }
  const data = await response.json();
  return data;
};
