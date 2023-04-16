import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeviceHistoryTable from "../devices/DeviceHistoryTable";
import { fetchDevicesLogsLimitN } from "../devices/DeviceHandlers";
import { DEVICES_CONFIG } from "../../config/DevicesConfig";
import Layout from "../layout/Layout";

export default function DeviceHistoryPage() {
  const { deviceServiceName } = useParams();
  const [deviceLogs, setDeviceLogs] = useState([]);
  const deviceName = DEVICES_CONFIG.filter(
    (device) => device.serviceName === deviceServiceName
  )[0].name;

  useEffect(() => {
    const fetchDeviceDataAndLogs = async () => {
      const logs = await fetchDevicesLogsLimitN(deviceServiceName, 10);
      setDeviceLogs(logs);

      const intervalId = setInterval(async () => {
        const logs = await fetchDevicesLogsLimitN(deviceServiceName, 10);
        setDeviceLogs(logs);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    fetchDeviceDataAndLogs();
  }, [deviceServiceName]);

  return (
    <div>
      <Layout />
      <DeviceHistoryTable deviceLogs={deviceLogs} deviceName={deviceName} />
    </div>
  );
}
