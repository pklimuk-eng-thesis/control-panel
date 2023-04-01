import React from 'react';
import styles from './Sensor.module.css';

function Sensor(props) {
  const { name, state, detectionStatus } = props;

  return (
    <div className={styles.sensorContainer}>
      <div className={styles.sensorName}>{name}</div>
      <div className={styles.sensorStateContainer}>
        <div className={`${styles.sensorState} ${state ? styles.on : styles.off}`}>{state ? 'ON' : 'OFF'}</div>
        <div className={`${styles.sensorStatus} ${detectionStatus ? styles.detected : styles.notDetected}`}>{detectionStatus ? 'Detected' : 'NotDetected'}</div>
      </div>
    </div>
  );
}