import React from 'react';
import styles from './SensorTable.module.css';

function SensorHistoryTable({sensorLogs, sensorName}) {

  return (
    <div className={styles.sensorTable}>
      <h2 className={styles.title}>{sensorName} History</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>State</th>
            <th>Detection Status</th>
          </tr>
        </thead>
        <tbody>
          {sensorLogs.map((sensorLog) => (
            <tr key={sensorLog.id}>
              <td>{sensorLog.created_at}</td>
              <td className={sensorLog.is_enabled ? styles.textGreen : styles.textRed}>
                {sensorLog.is_enabled ? 'On' : 'Off'}</td>
              <td className={sensorLog.detected ? styles.textRed : styles.textGreen}>
                {sensorLog.detected ? 'Detected' : 'Not Detected'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SensorHistoryTable;