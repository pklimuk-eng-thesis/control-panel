import React, { useEffect, useState } from "react";
import SensorTable from "../sensors/SensorTable";
import {
  fetchSensorsData,
  handleSensorToggleState,
} from "../sensors/SensorHandlers";
import DeviceTable from "../devices/DeviceTable";
import {
  fetchDevicesData,
  handleDeviceToggleState,
} from "../devices/DeviceHandlers";
import ACTable from "../ac/ACTable";
import {
  fetchACsData,
  handleACToggleState,
  handleACUpdateSettings,
} from "../ac/ACHandlers";
import Layout from "../layout/Layout";

export default function DefaultPage() {
  const [sensors, setSensors] = useState([]);
  const [devices, setDevices] = useState([]);
  const [acs, setACs] = useState([]);

  useEffect(() => {
    const fetchSensorDataAndPoll = async () => {
      const sensorsData = await fetchSensorsData();
      setSensors(sensorsData);

      const devicesData = await fetchDevicesData();
      setDevices(devicesData);

      const acsData = await fetchACsData();
      setACs(acsData);

      const intervalId = setInterval(async () => {
        const sensorsData = await fetchSensorsData();
        setSensors(sensorsData);

        const devicesData = await fetchDevicesData();
        setDevices(devicesData);

        const acsData = await fetchACsData();
        setACs(acsData);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    fetchSensorDataAndPoll();
  }, []);

  return (
    <div>
      <Layout />
      <SensorTable
        sensors={sensors}
        onToggleState={(updatedSensor) =>
          handleSensorToggleState(updatedSensor, sensors, setSensors)
        }
      />
      <DeviceTable
        devices={devices}
        onToggleState={(updatedDevice) =>
          handleDeviceToggleState(updatedDevice, devices, setDevices)
        }
      />
      <ACTable
        acs={acs}
        onToggleState={(updatedAC) =>
          handleACToggleState(updatedAC, acs, setACs)
        }
        onUpdateSettings={(updatedAC) => handleACUpdateSettings(updatedAC, acs)}
      />
    </div>
  );
}
