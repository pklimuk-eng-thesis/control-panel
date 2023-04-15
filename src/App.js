import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import AdminPage from "./components/pages/AdminPage";
import DefaultPage from "./components/pages/DefaultPage";
import SensorHistoryPage from "./components/pages/SensorHistoryPage";

function App() {
  const [sensors] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<DefaultPage sensors={sensors} />} />
            <Route path='/admin' element={<AdminPage sensors={sensors} />} />
            <Route path="/history/:sensorServiceName" element={<SensorHistoryPage sensors={sensors}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;