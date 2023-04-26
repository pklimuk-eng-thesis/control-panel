import React, { useState } from "react";
import styles from "./ACTable.module.css";

function ACTable({ acs, onToggleState, onUpdateSettings }) {
  const [selectedTemp, setSelectedTemp] = useState(20);
  const [selectedHum, setSelectedHum] = useState(50);

  const handleTempChange = (e) => {
    setSelectedTemp(parseInt(e.target.value));
  };

  const handleHumChange = (e) => {
    setSelectedHum(parseInt(e.target.value));
  };

  const handleUpdateSettingsClick = (ac) => {
    ac.desired_temp = selectedTemp;
    ac.desired_hum = selectedHum;
    onUpdateSettings(ac);
  };

  return (
    <div className={styles.acTable}>
      <h2 className={styles.title}>Air conditioners</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>AC Name</th>
            <th>State</th>
            <th>Current Values</th>
            <th>Desired Values</th>
            <th>Update settings</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {acs.map((ac) => (
            <tr key={ac.id}>
              <td className={styles.boldText}>{ac.name}</td>
              <td>
                <button
                  className={`${styles.button} ${
                    ac.state ? styles.buttonOn : styles.buttonOff
                  }`}
                  onClick={() => onToggleState(ac)}
                >
                  {ac.state ? "On" : "Off"}
                </button>
              </td>
              <td className={styles.currentValuesCell}>
                <span>
                  <span className={styles.boldText}>Temperature: </span>
                  <span className={styles.currentValue}>
                    {" "}
                    {ac.temperature}{" "}
                  </span>
                </span>
                <hr className={styles.desiredValuesSeparator} />
                <span>
                  <span className={styles.boldText}>Humidity: </span>
                  <span className={styles.currentValue}> {ac.humidity} </span>
                </span>
              </td>
              <td className={styles.selectCell}>
                <div className={styles.desiredValuesColumn}>
                  <div>
                    <span className={styles.boldText}>Temperature: </span>
                    <select
                      className={styles.select}
                      value={selectedTemp}
                      onChange={handleTempChange}
                    >
                      {[...Array(16).keys()].map((temp) => (
                        <option key={temp + 15} value={temp + 15}>
                          {temp + 15}
                        </option>
                      ))}
                    </select>
                  </div>
                  <hr className={styles.desiredValuesSeparator} />
                  <div>
                    <span className={styles.boldText}>Humidity: </span>
                    <select
                      className={styles.select}
                      value={selectedHum}
                      onChange={handleHumChange}
                    >
                      {[...Array(31).keys()].map((hum) => (
                        <option key={hum + 30} value={hum + 30}>
                          {hum + 30}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.updateButton}`}
                  onClick={() => handleUpdateSettingsClick(ac)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.historyButton}`}
                  onClick={() =>
                    (window.location.href = `/ac/history/${ac.serviceName}`)
                  }
                >
                  Show history
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ACTable;
