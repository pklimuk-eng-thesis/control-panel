import { BASE_URL, SENSOR_DETECTED_ENDPOINT, SENSOR_ENABLED_ENDPOINT } from '../../config/SensorsConfig';

export const fetchSensorDetectionStatus = async (sensorId) => {
  const response = await fetch(`${BASE_URL}/${sensorId}/${SENSOR_DETECTED_ENDPOINT}`);
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data;
};

export const fetchSensorState = async (sensorId) => {
  const response = await fetch(`${BASE_URL}/${sensorId}/${SENSOR_ENABLED_ENDPOINT}`);
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data;
};

export const changeSensorState = async (sensorId) => {
  const response = await fetch(`${BASE_URL}/${sensorId}/${SENSOR_ENABLED_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to change sensor state for sensor ${sensorId}.`);
  }
  const data = await response.json();
  return data;
}

export const changeSensorDetectionStatus = async (sensorId) => {
  const response = await fetch(`${BASE_URL}/${sensorId}/${SENSOR_DETECTED_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    // throw new Error(`Failed to change sensor detection status for sensor ${sensorId}.`);
    return false;
  }
  const data = await response.json();
  return data;
}