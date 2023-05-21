import {
  fetchACsData,
  handleACToggleState,
  handleACUpdateSettings,
  handleACFetchLogs,
} from "./ACHandlers";
import * as ACApi from "../ac/ACApi";
import { ACS_CONFIG } from "../../config/ACConfig";

jest.mock("../ac/ACApi");

describe("ACHandlers", () => {
  describe("fetchACsData", () => {
    it("should fetch ACs data and return the updated ACs", async () => {
      const acInfo = {
        enabled: true,
        temperature: 25,
        humidity: 60,
      };
      const acs = ACS_CONFIG.map((acConfig) => ({
        ...acConfig,
        state: acInfo.enabled,
        temperature: acInfo.temperature,
        humidity: acInfo.humidity,
      }));

      const mockFetchACInfo = jest.spyOn(ACApi, "fetchACInfo");
      mockFetchACInfo.mockResolvedValue(acInfo);

      const result = await fetchACsData();

      expect(mockFetchACInfo).toHaveBeenCalledTimes(ACS_CONFIG.length);
      expect(result).toEqual(acs);
    });
  });

  describe("handleACToggleState", () => {
    it("should update AC state, temperature, and humidity", async () => {
      const updatedAC = {
        id: 1,
        serviceName: "ac1",
      };
      const acs = [
        {
          id: 1,
          serviceName: "ac1",
          state: false,
          temperature: 0,
          humidity: 0,
        },
        {
          id: 2,
          serviceName: "ac2",
          state: true,
          temperature: 25,
          humidity: 60,
        },
      ];
      const setACs = jest.fn();

      const mockChangeACState = jest.spyOn(ACApi, "changeACState");
      mockChangeACState.mockResolvedValueOnce({
        enabled: true,
        temperature: 24,
        humidity: 50,
      });

      await handleACToggleState(updatedAC, acs, setACs);

      expect(mockChangeACState).toHaveBeenCalledWith("ac1");
      expect(setACs).toHaveBeenCalledWith([
        {
          id: 1,
          serviceName: "ac1",
          state: true,
          temperature: 24,
          humidity: 50,
        },
        {
          id: 2,
          serviceName: "ac2",
          state: true,
          temperature: 25,
          humidity: 60,
        },
      ]);
    });
  });

  describe("handleACUpdateSettings", () => {
    it("should update AC state, temperature, and humidity", async () => {
      const updatedAC = {
        id: 1,
        serviceName: "ac1",
        state: true,
        desired_temp: 23,
        desired_hum: 55,
      };
      const acs = [
        {
          id: 1,
          serviceName: "ac1",
          state: true,
          temperature: 25,
          humidity: 60,
        },
        {
          id: 2,
          serviceName: "ac2",
          state: false,
          temperature: 0,
          humidity: 0,
        },
      ];
      const setACs = jest.fn();

      const mockUpdateACSettings = jest.spyOn(ACApi, "updateACSettings");
      mockUpdateACSettings.mockResolvedValueOnce({
        enabled: true,
        temperature: 23,
        humidity: 55,
      });

      await handleACUpdateSettings(updatedAC, acs, setACs);

      expect(mockUpdateACSettings).toHaveBeenCalledWith(
        "ac1",
        true,
        23,
        55
      );
      expect(setACs).toHaveBeenCalledWith([
        {
          id: 1,
          serviceName: "ac1",
          state: true,
          temperature: 23,
          humidity: 55,
        },
        {
          id: 2,
          serviceName: "ac2",
          state: false,
          temperature: 0,
          humidity: 0,
        },
      ]);
    });
  });

  describe("handleACFetchLogs", () => {
    it("should fetch AC logs with the specified limit", async () => {
      const acId = "ac1";
      const limit = 10;
      const acLogs = [
        { log: "log1" },
        { log: "log2" },
        // Add more sample logs here
      ];

      const mockFetchACLogsLimitN = jest.spyOn(
        ACApi,
        "fetchACLogsLimitN"
      );
      mockFetchACLogsLimitN.mockResolvedValueOnce(acLogs);

      const result = await handleACFetchLogs(acId, limit);

      expect(mockFetchACLogsLimitN).toHaveBeenCalledWith(
        "ac1",
        10
      );
      expect(result).toEqual(acLogs);
    });
  });
});
