import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import styles from "./App.module.css";
import AdminPage from "./components/pages/AdminPage";
import DefaultPage from "./components/pages/DefaultPage";

function App() {
  const [sensors] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Layout />
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<DefaultPage sensors={sensors} />} />
            <Route path='/admin' element={<AdminPage sensors={sensors} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;