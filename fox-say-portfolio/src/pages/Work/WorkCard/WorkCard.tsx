import React, { useCallback } from 'react';
import { Project } from '../WorkCardList/projects';
import styles from "./WorkCard.module.scss";

export interface Props {
  onClick: (title: string, imageUrl: string) => void;
  project: Project;
}

const WorkCard: React.FC<Props> = ({project: { name, theme, logoImgUrl, layoutImgUrl}, onClick}) => {
  
  const click = useCallback(() => onClick(name, layoutImgUrl), [onClick, name, layoutImgUrl]);

  return (
    <div 
      className={`${styles.workCard} ${styles[theme]}`} 
      style={{backgroundImage: `url(${logoImgUrl})`}} 
      onClick={click}
    >
      <div className={styles.workCardLabel}>
        View<br/> Project
      </div>
    </div>
  );
};

export default WorkCard;
