import React from 'react';
import { WorkCardProps } from './WorkCard.props';
import styles from "./WorkCard.module.scss";

const WorkCard: React.FC<WorkCardProps> = () => {
  return (
    <div className={styles.workCard}>
      <div className={styles.workCardHeading}>Work Name</div>
    </div>
  );
};

export default WorkCard;
