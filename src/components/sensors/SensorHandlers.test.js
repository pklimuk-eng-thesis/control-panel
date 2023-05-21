import {
  fetchSensorsData,
  handleSensorToggleState,
  handleSensorToggleDetectionStatus,
  handleSensorLogsFetchingLimitN,
} from "./SensorHandlers";
import * as SensorApi from "./SensorsApi";
import { SENSORS_CONFIG } from "../../config/SensorsConfig";

jest.mock("./SensorsApi");

describe("SensorHandlers", () => {
  describe("fetchSensorsData", () => {
    it("should fetch sensors data and return the updated sensors", async () => {
      const sensorInfo = {
        enabled: true,
        detected: true,
      };
      const sensors = SENSORS_CONFIG.map((sensorConfig) => ({
        ...sensorConfig,
        state: sensorInfo.enabled,
        detectionStatus: sensorInfo.detected,
      }));

      const mockFetchSensorInfo = jest.spyOn(SensorApi, "fetchSensorInfo");
      mockFetchSensorInfo.mockResolvedValue(sensorInfo);

      const result = await fetchSensorsData();

      expect(mockFetchSensorInfo).toHaveBeenCalledTimes(SENSORS_CONFIG.length);
      expect(result).toEqual(sensors);
    });
  });
  
  describe("handleSensorToggleState", () => {
    it("should update sensor state and detection status", async () => {
      const updatedSensor = {
        id: 1,
        serviceName: "presenceSensor",
      };
      const sensors = [
        {
          id: 1,
          serviceName: "presenceSensor",
          state: false,
          detectionStatus: false,
        },
        {
          id: 2,
          serviceName: "gasSensor",
          state: true,
          detectionStatus: true,
        },
      ];
      const setSensors = jest.fn();

      const mockChangeSensorState = jest.spyOn(SensorApi, "changeSensorState");
      mockChangeSensorState.mockResolvedValueOnce({
        enabled: true,
        detected: true,
      });

      await handleSensorToggleState(updatedSensor, sensors, setSensors);

      expect(mockChangeSensorState).toHaveBeenCalledWith("presenceSensor");
      expect(setSensors).toHaveBeenCalledWith([
        {
          id: 1,
          serviceName: "presenceSensor",
          state: true,
          detectionStatus: true,
        },
        {
          id: 2,
          serviceName: "gasSensor",
          state: true,
          detectionStatus: true,
        },
      ]);
    });
  });

  describe("handleSensorToggleDetectionStatus", () => {
    it("should update sensor state and detection status", async () => {
      const updatedSensor = {
        id: 1,
        serviceName: "presenceSensor",
      };
      const sensors = [
        {
          id: 1,
          serviceName: "presenceSensor",
          state: true,
          detectionStatus: true,
        },
        {
          id: 2,
          serviceName: "gasSensor",
          state: false,
          detectionStatus: false,
        },
      ];
      const setSensors = jest.fn();

      const mockChangeSensorDetectionStatus = jest.spyOn(
        SensorApi,
        "changeSensorDetectionStatus"
      );
      mockChangeSensorDetectionStatus.mockResolvedValueOnce({
        enabled: false,
        detected: false,
      });

      await handleSensorToggleDetectionStatus(
        updatedSensor,
        sensors,
        setSensors
      );

      expect(mockChangeSensorDetectionStatus).toHaveBeenCalledWith(
        "presenceSensor"
      );
      expect(setSensors).toHaveBeenCalledWith([
        {
          id: 1,
          serviceName: "presenceSensor",
          state: false,
          detectionStatus: false,
        },
        {
          id: 2,
          serviceName: "gasSensor",
          state: false,
          detectionStatus: false,
        },
      ]);
    });
  });

  describe("handleSensorLogsFetchingLimitN", () => {
    it("should fetch sensor logs with the specified limit", async () => {
      const sensorName = "presenceSensor";
      const limit = 10;
      const sensorLogs = [
        { timestamp: "2023-05-20T12:00:00", message: "Log 1" },
        { timestamp: "2023-05-20T12:01:00", message: "Log 2" },
        // Add more sample logs here
      ];

      const mockFetchSensorLogsLimitN = jest.spyOn(
        SensorApi,
        "fetchSensorLogsLimitN"
      );
      mockFetchSensorLogsLimitN.mockResolvedValueOnce(sensorLogs);

      const result = await handleSensorLogsFetchingLimitN(sensorName, limit);

      expect(mockFetchSensorLogsLimitN).toHaveBeenCalledWith(
        "presenceSensor",
        10
      );
      expect(result).toEqual(sensorLogs);
    });
  });
});
