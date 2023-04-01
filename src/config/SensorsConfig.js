export const BASE_URL = 'http://localhost:8080';
export const SENSOR_ENABLED_ENDPOINT = 'enabled'
export const SENSOR_DETECTED_ENDPOINT = 'detected'

export const SENSORS_CONFIG = [
  {
    id: 1,
    serviceName: "presenceSensor",
    name: "Presence Sensor",
  },
  {
    id: 2,
    serviceName: "gasSensor",
    name: "Gas Sensor",
  },
  {
    id: 3,
    serviceName: "doorsSensor",
    name: "Doors Sensor",
  },
  // Add more sensors here
];