import React from 'react';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={`${styles.header}`}>
      <div className={styles.title}>Smart-home app</div>
    </div>
  );
}

export default Layout;