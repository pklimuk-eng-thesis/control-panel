import {
  CONTROL_STATION_ADDRESS,
  AC_ENABLED_ENDPOINT,
  AC_INFO_ENDPOINT,
  AC_LOGS_ENDPOINT,
  AC_UPDATE_ENDPOINT,
} from "../../config/ACConfig";

export const fetchACInfo = async (acId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${acId}/${AC_INFO_ENDPOINT}`
  );
  if (!response.ok) {
    return { enabled: false, temperature: 0.0, humidity: 0.0 };
  }
  const data = await response.json();
  return data;
};

export const changeACState = async (acId) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${acId}/${AC_ENABLED_ENDPOINT}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to change AC state for AC ${acId}.`);
  }
  const data = await response.json();
  return data;
};

export const updateACSettings = async (
  acId,
  enabled,
  temperature,
  humidity
) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${acId}/${AC_UPDATE_ENDPOINT}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enabled, temperature, humidity }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update AC settings for AC ${acId}.`);
  }
  const data = await response.json();
  return data;
};

export const fetchACLogsLimitN = async (acId, limit) => {
  const response = await fetch(
    `${CONTROL_STATION_ADDRESS}/${acId}/${AC_LOGS_ENDPOINT}?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch AC logs for AC ${acId}.`);
  }
  const data = await response.json();
  return data;
};
