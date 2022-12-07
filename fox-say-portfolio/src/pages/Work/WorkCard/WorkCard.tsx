import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../workPopupSlice';
import { Project } from '../WorkList/projects';
import styles from "./WorkCard.module.scss";

export interface Props {
  project: Project;
}

const WorkCard: React.FC<Props> = ({project: { name, theme, logoImgUrl, layoutImgUrl}}) => {
  const dispatch = useDispatch();
  
  const openWork = useCallback(() => {
    dispatch(setData({
      title: name,
      imgUrl: layoutImgUrl
    }));
  }, [name, layoutImgUrl]);

  return (
    <div 
      className={`${styles.workCard} ${styles[theme]}`} 
      style={{backgroundImage: `url(${logoImgUrl})`}} 
      onClick={openWork}
    >
      <div className={styles.workCardLabel}>
        View<br/> Project
      </div>
    </div>
  );
};

export default WorkCard;
