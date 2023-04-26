import React, { useState, useEffect } from "react";
import SensorTableAdmin from "../sensors/SensorTableAdmin";
import {
  fetchSensorsData,
  handleSensorToggleState,
  handleSensorToggleDetectionStatus,
} from "../sensors/SensorHandlers";
import {
  fetchDevicesData,
  handleDeviceToggleState,
} from "../devices/DeviceHandlers";
import AdminLayout from "../layout/AdminLayout";
import DeviceTable from "../devices/DeviceTable";
import ACTable from "../ac/ACTable";
import {
  fetchACsData,
  handleACToggleState,
  handleACUpdateSettings,
} from "../ac/ACHandlers";

function AdminPage() {
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
      <AdminLayout />
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={(updatedSensor) =>
          handleSensorToggleState(updatedSensor, sensors, setSensors)
        }
        onToggleDetectionStatus={(updatedSensor) =>
          handleSensorToggleDetectionStatus(updatedSensor, sensors, setSensors)
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

export default AdminPage;
