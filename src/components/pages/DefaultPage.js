import React, { useEffect, useState } from "react";
import SensorTable from "../sensors/SensorTable";
import { fetchSensorsData, handleToggleState } from "../sensors/SensorHandlers";
import Layout from "../layout/Layout";

export default function DefaultPage() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensorDataAndPoll = async () => {
      const sensorsData = await fetchSensorsData();
      setSensors(sensorsData);

      const intervalId = setInterval(async () => {
        const sensorsData = await fetchSensorsData();
        setSensors(sensorsData);
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
          handleToggleState(updatedSensor, sensors, setSensors)
        }
      />
    </div>
  );
}
