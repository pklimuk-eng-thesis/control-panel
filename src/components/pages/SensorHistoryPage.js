import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SensorHistoryTable from "../sensors/SensorHistoryTable";
import { handleLogsFetchingLimitN } from "../sensors/SensorHandlers";
import { SENSORS_CONFIG } from "../../config/SensorsConfig";

export default function SensorHistoryPage() {
  const { sensorServiceName } = useParams();
  const [sensorLogs, setSensorLogs] = useState([]);
  const sensorName = SENSORS_CONFIG.filter(
    (sensor) => sensor.serviceName === sensorServiceName
  )[0].name;

  useEffect(() => {
    const fetchSensorDataAndLogs = async () => {
      const logs = await handleLogsFetchingLimitN(sensorServiceName, 10);
      setSensorLogs(logs);

      const intervalId = setInterval(async () => {
        const logs = await handleLogsFetchingLimitN(sensorServiceName, 10);
        setSensorLogs(logs);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    fetchSensorDataAndLogs();
  }, [sensorServiceName]);

  return (
    <div>
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    </div>
  );
}
