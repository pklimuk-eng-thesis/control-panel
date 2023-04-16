import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import AdminPage from "./components/pages/AdminPage";
import DefaultPage from "./components/pages/DefaultPage";
import SensorHistoryPage from "./components/pages/SensorHistoryPage";
import DeviceHistoryPage from "./components/pages/DeviceHistoryPage";

function App() {
  const [sensors] = useState([]);
  const [devices] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <div className={styles.content}>
          <Routes>
            <Route
              path="/"
              element={<DefaultPage sensors={sensors} devices={devices} />}
            />
            <Route
              path="/admin"
              element={<AdminPage sensors={sensors} devices={devices} />}
            />
            <Route
              path="/sensor/history/:sensorServiceName"
              element={<SensorHistoryPage sensors={sensors} />}
            />
            <Route
              path="/device/history/:deviceServiceName"
              element={<DeviceHistoryPage devices={devices} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
