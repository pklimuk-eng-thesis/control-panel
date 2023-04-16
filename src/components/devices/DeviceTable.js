import React from "react";
import styles from "./DeviceTable.module.css";

function DeviceTable({ devices, onToggleState }) {
  return (
    <div className={styles.deviceTable}>
      <h2 className={styles.title}>Devices</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>State</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>
                <button
                  className={`${styles.button} ${
                    device.state ? styles.buttonOn : styles.buttonOff
                  }`}
                  onClick={() => onToggleState(device)}
                >
                  {device.state ? "On" : "Off"}
                </button>
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.historyButton}`}
                  onClick={() =>
                    (window.location.href = `/device/history/${device.serviceName}`)
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

export default DeviceTable;
