import React from 'react';
import styles from './SensorTable.module.css';

function SensorTable({ sensors, onToggleState }) {

  return (
    <div className={styles.sensorTable}>
      <h2 className={styles.title}>Sensors</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sensor Name</th>
            <th>State</th>
            <th>Detection Status</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.name}</td>
              <td>
                <button
                  className={`${styles.button} ${
                    sensor.state ? styles.buttonOn : styles.buttonOff
                  }`}
                  onClick={() => onToggleState(sensor)}
                >
                  {sensor.state ? 'On' : 'Off'}
                </button>
              </td>
              <td className={sensor.detectionStatus ? styles.textRed : styles.textGreen}>
                {sensor.detectionStatus ? 'Detected' : 'Not Detected'}
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.historyButton}`}
                  onClick={() => window.location.href=`history/${sensor.serviceName}`}
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

export default SensorTable;