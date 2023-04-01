import { SENSORS_CONFIG } from "../../config/SensorsConfig";
import { fetchSensorState, fetchSensorDetectionStatus, changeSensorState, changeSensorDetectionStatus } from "../sensors/SensorsApi";

export async function fetchSensorsData() {
  const sensorsData = await Promise.all(
    SENSORS_CONFIG.map(async (sensorConfig) => {
      const sensorState = await fetchSensorState(sensorConfig.serviceName);
      const sensorStatus = await fetchSensorDetectionStatus(sensorConfig.serviceName);
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
  const newSensorState = await changeSensorState(updatedSensor.serviceName);
  const updatedSensors = sensors.map((sensor) => {
    if (sensor.id === updatedSensor.id) {
      return {
        ...sensor,
        state: newSensorState,
      };
    }
    return sensor;
  });
  setSensors(updatedSensors);
}

export async function handleToggleDetectionStatus(updatedSensor, sensors, setSensors) {
  const newSensorDetectionStatus = await changeSensorDetectionStatus(updatedSensor.serviceName);
  const updatedSensors = sensors.map(sensor => {
    if (sensor.id === updatedSensor.id) {
      return {
        ...sensor,
        detectionStatus: newSensorDetectionStatus,
      };
    }
    return sensor;
  });
  setSensors(updatedSensors);
}