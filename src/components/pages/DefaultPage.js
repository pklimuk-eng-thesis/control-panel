import React, { useEffect, useState } from "react";
import SensorTable from "../sensors/SensorTable";
import {
  fetchSensorsData,
  handleSensorToggleState,
} from "../sensors/SensorHandlers";
import {
  fetchDevicesData,
  handleDeviceToggleState,
} from "../devices/DeviceHandlers";
import Layout from "../layout/Layout";
import DeviceTable from "../devices/DeviceTable";

export default function DefaultPage() {
  const [sensors, setSensors] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchSensorDataAndPoll = async () => {
      const sensorsData = await fetchSensorsData();
      setSensors(sensorsData);

      const devicesData = await fetchDevicesData();
      setDevices(devicesData);

      const intervalId = setInterval(async () => {
        const sensorsData = await fetchSensorsData();
        setSensors(sensorsData);

        const devicesData = await fetchDevicesData();
        setDevices(devicesData);
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
    </div>
  );
}
