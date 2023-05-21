import {
  fetchDevicesData,
  handleDeviceToggleState,
  fetchDevicesLogsLimitN,
} from './DeviceHandlers';
import * as DevicesApi from '../devices/DevicesApi';
import { DEVICES_CONFIG } from '../../config/DevicesConfig';

jest.mock('../devices/DevicesApi');

describe('DeviceHandlers', () => {
  describe('fetchDevicesData', () => {
    it('should fetch devices data and return the updated devices', async () => {
      const deviceInfo = {
        enabled: true,
      };
      const devices = DEVICES_CONFIG.map((deviceConfig) => ({
        ...deviceConfig,
        state: deviceInfo.enabled,
      }));

      const mockFetchDeviceInfo = jest.spyOn(DevicesApi, 'fetchDeviceInfo');
      mockFetchDeviceInfo.mockResolvedValue(deviceInfo);

      const result = await fetchDevicesData();

      expect(mockFetchDeviceInfo).toHaveBeenCalledTimes(DEVICES_CONFIG.length);
      expect(result).toEqual(devices);
    });
  });

  describe('handleDeviceToggleState', () => {
    it('should update device state and set devices with the updated state', async () => {
      const updatedDevice = {
        id: 1,
        serviceName: 'device1',
      };
      const devices = [
        {
          id: 1,
          serviceName: 'device1',
          state: false,
        },
        {
          id: 2,
          serviceName: 'device2',
          state: true,
        },
      ];
      const setDevices = jest.fn();

      const mockChangeDeviceState = jest.spyOn(DevicesApi, 'changeDeviceState');
      mockChangeDeviceState.mockResolvedValue();

      const expectedUpdatedDevices = [
        {
          id: 1,
          serviceName: 'device1',
          state: true,
        },
        {
          id: 2,
          serviceName: 'device2',
          state: true,
        },
      ];

      await handleDeviceToggleState(updatedDevice, devices, setDevices);

      expect(mockChangeDeviceState).toHaveBeenCalledWith('device1');
      expect(setDevices).toHaveBeenCalledWith(expectedUpdatedDevices);
    });
  });

  describe('fetchDevicesLogsLimitN', () => {
    it('should fetch device logs with the specified limit', async () => {
      const deviceId = 'device1';
      const limit = 10;
      const deviceLogs = [
        { timestamp: '2023-05-20T12:00:00', message: 'Log 1' },
        { timestamp: '2023-05-20T12:01:00', message: 'Log 2' },
        // Add more sample logs here
      ];

      const mockFetchDeviceLogsLimitN = jest.spyOn(
        DevicesApi,
        'fetchDeviceLogsLimitN'
      );
      mockFetchDeviceLogsLimitN.mockResolvedValue(deviceLogs);

      const result = await fetchDevicesLogsLimitN(deviceId, limit);

      expect(mockFetchDeviceLogsLimitN).toHaveBeenCalledWith('device1', 10);
      expect(result).toEqual(deviceLogs);
    });
  });
});
