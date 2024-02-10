import React from "react";
import styles from "./header.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingIndicator}>
      <i className={`${styles.fas} ${styles.faSpinner}`}></i>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
