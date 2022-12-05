import React from 'react';
import { WorkCardProps } from './WorkCard.props';
import styles from "./WorkCard.module.scss";

const WorkCard: React.FC<WorkCardProps> = ({imageUrl = "", onClick}) => {

  const getRandomBg = (): string => {
    const colors = [styles.dark, styles.white, styles.gray, styles.primary, styles.secondary];
    
    return colors[Math.ceil(Math.random() * colors.length)];
  }

  return (
    <div 
      className={`${styles.workCard} ${getRandomBg()}`} 
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
