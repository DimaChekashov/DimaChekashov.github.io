import React from 'react';
import { WorkCardProps } from './WorkCard.props';
import styles from "./WorkCard.module.scss";

const WorkCard: React.FC<WorkCardProps> = ({imageUrl = "", onClick, theme}) => {
  return (
    <div 
      className={`${styles.workCard} ${styles[theme]}`} 
      onClick={onClick}
      style={{backgroundImage: `url(${imageUrl})`}} 
    >
      <div className={styles.workCardLabel}>
        View<br/> Project
      </div>
    </div>
  );
};

export default WorkCard;
