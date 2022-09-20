import React from "react";
import {WorkProps} from "./Work.props";
import styles from "./Work.module.scss";

const Work: React.FC<WorkProps> = () => {
  return (
    <div className={styles.work}>
      <h2 className={styles.workTitle}>Portfolio</h2>
      <div className={styles.workItem}>
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
        <img src="" alt="photo" className={styles.workImg} />
      </div>
    </div>
  );
};

export default Work;
