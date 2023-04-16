export const CONTROL_STATION_ADDRESS =
  process.env.REACT_APP_CONTROL_STATION_ADDRESS;
export const DEVICE_ENABLED_ENDPOINT = "enabled";
export const DEVICE_INFO_ENDPOINT = "info";
export const DEVICE_LOGS_ENDPOINT = "logs";

export const DEVICES_CONFIG = [
  {
    id: 1,
    serviceName: "smartBulb",
    name: "Smart Bulb",
  },
  {
    id: 2,
    serviceName: "smartPlug",
    name: "Smart Plug",
  },
  // Add more devices here
];
