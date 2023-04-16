import { DEVICES_CONFIG } from "../../config/DevicesConfig";
import {
  fetchDeviceInfo,
  changeDeviceState,
  fetchDeviceLogsLimitN,
} from "../devices/DevicesApi";

export async function fetchDevicesData() {
  const devicesData = await Promise.all(
    DEVICES_CONFIG.map(async (deviceConfig) => {
      const deviceInfo = await fetchDeviceInfo(deviceConfig.serviceName);
      const deviceState = deviceInfo.enabled;
      return {
        ...deviceConfig,
        state: deviceState,
      };
    })
  );
  return devicesData;
}

export async function handleDeviceToggleState(
  updatedDevice,
  devices,
  setDevices
) {
  await changeDeviceState(updatedDevice.serviceName);
  const updatedDevices = devices.map((device) => {
    if (device.id === updatedDevice.id) {
      return {
        ...device,
        state: !device.state,
      };
    }
    return device;
  });
  setDevices(updatedDevices);
}

export async function fetchDevicesLogsLimitN(deviceId, limit) {
  const deviceLogs = await fetchDeviceLogsLimitN(deviceId, limit);
  return deviceLogs;
}
