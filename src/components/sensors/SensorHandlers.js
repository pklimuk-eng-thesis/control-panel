import { SENSORS_CONFIG } from "../../config/SensorsConfig";
import {
  fetchSensorInfo,
  changeSensorState,
  changeSensorDetectionStatus,
  fetchSensorLogsLimitN,
} from "../sensors/SensorsApi";

export async function fetchSensorsData() {
  const sensorsData = await Promise.all(
    SENSORS_CONFIG.map(async (sensorConfig) => {
      const sensorInfo = await fetchSensorInfo(sensorConfig.serviceName);
      const sensorState = sensorInfo.enabled;
      const sensorStatus = sensorInfo.detected;
      return {
        ...sensorConfig,
        state: sensorState,
        detectionStatus: sensorStatus,
      };
    })
  );
  return sensorsData;
}

export async function handleToggleState(updatedSensor, sensors, setSensors) {
  const sensorInfo = await changeSensorState(updatedSensor.serviceName);
  const newSensorState = sensorInfo.enabled;
  const newSensorStatus = sensorInfo.detected;
  const updatedSensors = sensors.map((sensor) => {
    if (sensor.id === updatedSensor.id) {
      return {
        ...sensor,
        state: newSensorState,
        detectionStatus: newSensorStatus,
      };
    }
    return sensor;
  });
  setSensors(updatedSensors);
}

export async function handleToggleDetectionStatus(
  updatedSensor,
  sensors,
  setSensors
) {
  const sensorInfo = await changeSensorDetectionStatus(
    updatedSensor.serviceName
  );
  const newSensorState = sensorInfo.enabled;
  const newSensorStatus = sensorInfo.detected;
  const updatedSensors = sensors.map((sensor) => {
    if (sensor.id === updatedSensor.id) {
      return {
        ...sensor,
        state: newSensorState,
        detectionStatus: newSensorStatus,
      };
    }
    return sensor;
  });
  setSensors(updatedSensors);
}

export async function handleLogsFetchingLimitN(sensorName, limit) {
  const sensorLogs = await fetchSensorLogsLimitN(sensorName, limit);
  return sensorLogs;
}
