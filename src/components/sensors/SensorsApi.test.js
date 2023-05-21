import {
  fetchSensorInfo,
  changeSensorState,
  changeSensorDetectionStatus,
  fetchSensorLogsLimitN,
} from "./SensorsApi";

import {
  CONTROL_STATION_ADDRESS,
  SENSOR_DETECTED_ENDPOINT,
  SENSOR_ENABLED_ENDPOINT,
  SENSOR_INFO_ENDPOINT,
  SENSOR_LOGS_ENDPOINT,
} from "../../config/SensorsConfig";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("SensorsApi", () => {
  const sensorId = 1;
  const limit = 10;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches sensor info successfully", async () => {
    const mockResponse = { enabled: true, detected: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchSensorInfo(sensorId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_INFO_ENDPOINT}`
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when fetching sensor info", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const data = await fetchSensorInfo(sensorId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_INFO_ENDPOINT}`
    );
    expect(data).toEqual({ enabled: false, detected: false });
  });

  it("changes sensor state successfully", async () => {
    const mockResponse = { enabled: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await changeSensorState(sensorId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when changing sensor state", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(changeSensorState(sensorId)).rejects.toThrow(
      `Failed to change sensor state for sensor ${sensorId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("changes sensor detection status successfully", async () => {
    const mockResponse = { detected: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await changeSensorDetectionStatus(sensorId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_DETECTED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when changing sensor detection status", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(changeSensorDetectionStatus(sensorId)).rejects.toThrow(
      `Failed to change sensor detection status for sensor ${sensorId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_DETECTED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("fetches sensor logs successfully", async () => {
    const mockResponse = [{ log: "log1" }, { log: "log2" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchSensorLogsLimitN(sensorId, limit);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_LOGS_ENDPOINT}?limit=${limit}`
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when fetching sensor logs", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchSensorLogsLimitN(sensorId, limit)).rejects.toThrow(
      `Failed to fetch sensor logs for sensor ${sensorId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${sensorId}/${SENSOR_LOGS_ENDPOINT}?limit=${limit}`
    );
  });
});