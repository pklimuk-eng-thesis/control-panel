import React from "react";
import styles from "./ACTable.module.css";

function ACHistoryTable({ acLogs, acName }) {
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
    <div className={styles.acTable}>
      <h2 className={styles.title}>{acName} History</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>State</th>
            <th>Temperature</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {acLogs.map((acLog) => (
            <tr key={acLog.id}>
              <td>{formatDate(acLog.created_at)}</td>
              <td
                className={acLog.is_enabled ? styles.textGreen : styles.textRed}
              >
                {acLog.is_enabled ? "On" : "Off"}
              </td>
              <td>{acLog.temperature}</td>
              <td>{acLog.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ACHistoryTable;
