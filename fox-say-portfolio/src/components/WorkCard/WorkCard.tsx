import React from 'react';
import { WorkCardProps } from './WorkCard.props';
import styles from "./WorkCard.module.scss";

const WorkCard: React.FC<WorkCardProps> = ({imageUrl = "", onClick}) => {
  return (
    <div className={styles.workCard} style={{backgroundImage: `url(${imageUrl})`}} onClick={onClick}>
      <div className={styles.workCardLabel}>View<br/> Project</div>
    </div>
  );
};

export default WorkCard;
