export const CONTROL_STATION_ADDRESS =
  process.env.REACT_APP_CONTROL_STATION_ADDRESS;
export const AC_ENABLED_ENDPOINT = "enabled";
export const AC_INFO_ENDPOINT = "info";
export const AC_LOGS_ENDPOINT = "logs";
export const AC_UPDATE_ENDPOINT = "update";

export const ACS_CONFIG = [
  {
    id: 1,
    serviceName: "ac",
    name: "AC Living Room",
    desired_temp: 20,
    desired_hum: 50,
  },
  // Add more ACs here
];
