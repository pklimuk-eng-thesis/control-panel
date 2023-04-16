import React from "react";
import styles from "./DeviceTable.module.css";

function DeviceHistoryTable({ deviceLogs, deviceName }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  return (
    <div className={styles.deviceTable}>
      <h2 className={styles.title}>{deviceName} History</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {deviceLogs.map((deviceLog) => (
            <tr key={deviceLog.id}>
              <td>{formatDate(deviceLog.created_at)}</td>
              <td
                className={
                  deviceLog.is_enabled ? styles.textGreen : styles.textRed
                }
              >
                {deviceLog.is_enabled ? "On" : "Off"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceHistoryTable;
