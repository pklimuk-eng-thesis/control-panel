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

function AdminPage() {
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
    </div>
  );
}

export default AdminPage;
