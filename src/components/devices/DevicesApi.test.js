import {
  fetchDeviceInfo,
  changeDeviceState,
  fetchDeviceLogsLimitN,
} from './DevicesApi';

import {
  CONTROL_STATION_ADDRESS,
  DEVICE_ENABLED_ENDPOINT,
  DEVICE_INFO_ENDPOINT,
  DEVICE_LOGS_ENDPOINT,
} from '../../config/DevicesConfig';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('DevicesApi', () => {
  const deviceId = 1;
  const limit = 10;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('fetches device info successfully', async () => {
    const mockResponse = { enabled: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchDeviceInfo(deviceId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_INFO_ENDPOINT}`
    );
    expect(data).toEqual(mockResponse);
  });

  it('handles fetch error when fetching device info', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const data = await fetchDeviceInfo(deviceId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_INFO_ENDPOINT}`
    );
    expect(data).toEqual({ enabled: false });
  });

  it('changes device state successfully', async () => {
    const mockResponse = { enabled: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await changeDeviceState(deviceId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    expect(data).toEqual(mockResponse);
  });

  it('handles fetch error when changing device state', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(changeDeviceState(deviceId)).rejects.toThrow(
      `Failed to change device state for device ${deviceId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_ENABLED_ENDPOINT}`,
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('fetches device logs successfully', async () => {
    const mockResponse = [{ log: 'log1' }, { log: 'log2' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchDeviceLogsLimitN(deviceId, limit);

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_LOGS_ENDPOINT}?limit=${limit}`
    );
    expect(data).toEqual(mockResponse);
  });

  it('handles fetch error when fetching device logs', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchDeviceLogsLimitN(deviceId, limit)).rejects.toThrow(
      `Failed to fetch device logs for device ${deviceId}.`
    );

    expect(mockFetch).toHaveBeenCalledWith(
      `${CONTROL_STATION_ADDRESS}/${deviceId}/${DEVICE_LOGS_ENDPOINT}?limit=${limit}`
    );
  });
});
