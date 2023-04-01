import React, { useState, useEffect } from "react";
import SensorTableAdmin from "../sensors/SensorTableAdmin";
import { fetchSensorsData, handleToggleState, handleToggleDetectionStatus } from "../sensors/SensorHandlers";

function AdminPage() {
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
      <SensorTableAdmin sensors={sensors} onToggleState={(updatedSensor) => handleToggleState(updatedSensor, sensors, setSensors)}
      onToggleDetectionStatus={(updatedSensor) => handleToggleDetectionStatus(updatedSensor, sensors, setSensors)}/>
    </div>
  );
}


export default AdminPage;