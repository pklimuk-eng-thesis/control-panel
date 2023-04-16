import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SensorHistoryTable from "../sensors/SensorHistoryTable";
import { handleSensorLogsFetchingLimitN } from "../sensors/SensorHandlers";
import { SENSORS_CONFIG } from "../../config/SensorsConfig";
import Layout from "../layout/Layout";

export default function SensorHistoryPage() {
  const { sensorServiceName } = useParams();
  const [sensorLogs, setSensorLogs] = useState([]);
  const sensorName = SENSORS_CONFIG.filter(
    (sensor) => sensor.serviceName === sensorServiceName
  )[0].name;

  useEffect(() => {
    const fetchSensorDataAndLogs = async () => {
      const logs = await handleSensorLogsFetchingLimitN(sensorServiceName, 10);
      setSensorLogs(logs);

      const intervalId = setInterval(async () => {
        const logs = await handleSensorLogsFetchingLimitN(sensorServiceName, 10);
        setSensorLogs(logs);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    fetchSensorDataAndLogs();
  }, [sensorServiceName]);

  return (
    <div>
      <Layout />
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    </div>
  );
}
