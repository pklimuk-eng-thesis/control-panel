import React from "react";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={`${styles.header}`}>
      <button
        className={`${styles.button}`}
        onClick={() => (window.location.href = `/admin`)}
      >
        Smart-home app
      </button>
      <div>Admin</div>
    </div>
  );
}

export default Layout;
