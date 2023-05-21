import {
  fetchACInfo,
  changeACState,
  updateACSettings,
  fetchACLogsLimitN,
} from "./ACApi";

import {
  CONTROL_STATION_ADDRESS,
  AC_ENABLED_ENDPOINT,
  AC_INFO_ENDPOINT,
  AC_LOGS_ENDPOINT,
  AC_UPDATE_ENDPOINT,
} from "../../config/ACConfig";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ACApi", () => {
  const acId = 1;
  const limit = 10;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches AC info successfully", async () => {
    const mockResponse = { enabled: true, temperature: 25, humidity: 60 };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchACInfo(acId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_INFO_ENDPOINT}`
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when fetching AC info", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const data = await fetchACInfo(acId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_INFO_ENDPOINT}`
    );
    expect(data).toEqual({
      enabled: false,
      temperature: 0.0,
      humidity: 0.0,
    });
  });

  it("changes AC state successfully", async () => {
    const mockResponse = { enabled: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await changeACState(acId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when changing AC state", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(changeACState(acId)).rejects.toThrow(
      `Failed to change AC state for AC ${acId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("updates AC settings successfully", async () => {
    const enabled = true;
    const temperature = 24;
    const humidity = 50;
    const mockResponse = { enabled, temperature, humidity };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await updateACSettings(acId, enabled, temperature, humidity);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_UPDATE_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled, temperature, humidity }),
      })
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when updating AC settings", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      updateACSettings(acId, true, 25, 60)
    ).rejects.toThrow(`Failed to update AC settings for AC ${acId}.`);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_UPDATE_ENDPOINT}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: true, temperature: 25, humidity: 60 }),
      })
    );
  });

  it("fetches AC logs successfully", async () => {
    const mockResponse = [{ log: "log1" }, { log: "log2" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchACLogsLimitN(acId, limit);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_LOGS_ENDPOINT}?limit=${limit}`
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error when fetching AC logs", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchACLogsLimitN(acId, limit)).rejects.toThrow(
      `Failed to fetch AC logs for AC ${acId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${acId}/${AC_LOGS_ENDPOINT}?limit=${limit}`
    );
  });
});
