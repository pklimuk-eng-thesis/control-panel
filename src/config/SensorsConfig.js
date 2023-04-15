export const CONTROL_STATION_ADDRESS =
  process.env.REACT_APP_CONTROL_STATION_ADDRESS;
export const SENSOR_ENABLED_ENDPOINT = "enabled";
export const SENSOR_DETECTED_ENDPOINT = "detected";
export const SENSOR_INFO_ENDPOINT = "info";
export const SENSOR_LOGS_ENDPOINT = "logs";

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
