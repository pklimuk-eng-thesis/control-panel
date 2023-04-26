import { ACS_CONFIG } from "../../config/ACConfig";
import {
  fetchACInfo,
  changeACState,
  updateACSettings,
  fetchACLogsLimitN,
} from "../ac/ACApi";

export async function fetchACsData() {
  const acsData = await Promise.all(
    ACS_CONFIG.map(async (acConfig) => {
      const acInfo = await fetchACInfo(acConfig.serviceName);
      const acState = acInfo.enabled;
      return {
        ...acConfig,
        state: acState,
        temperature: acInfo.temperature,
        humidity: acInfo.humidity,
      };
    })
  );
  return acsData;
}

export async function handleACToggleState(updatedAC, acs, setACs) {
  const acInfo = await changeACState(updatedAC.serviceName);
  const newACState = acInfo.enabled;
  const newACTemperature = acInfo.temperature;
  const newACHumidity = acInfo.humidity;
  const updatedACs = acs.map((ac) => {
    if (ac.id === updatedAC.id) {
      return {
        ...ac,
        state: newACState,
        temperature: newACTemperature,
        humidity: newACHumidity,
      };
    }
    return ac;
  });
  setACs(updatedACs);
}

export async function handleACUpdateSettings(updatedAC, acs, setACs) {
  const acInfo = await updateACSettings(
    updatedAC.serviceName,
    updatedAC.state,
    updatedAC.desired_temp,
    updatedAC.desired_hum
  );
  const newACState = acInfo.enabled;
  const newACTemperature = acInfo.temperature;
  const newACHumidity = acInfo.humidity;
  const updatedACs = acs.map((ac) => {
    if (ac.id === updatedAC.id) {
      return {
        ...ac,
        state: newACState,
        temperature: newACTemperature,
        humidity: newACHumidity,
      };
    }
    return ac;
  });
  setACs(updatedACs);
}

export async function handleACFetchLogs(acId, limit) {
  const acLogs = await fetchACLogsLimitN(acId, limit);
  return acLogs;
}
