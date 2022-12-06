import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setImageUrl, setPopupIsOpen, setTitle } from '../../../features/workPopup/workPopupSlice';
import { Project } from '../WorkList/projects';
import styles from "./WorkCard.module.scss";

export interface Props {
  project: Project;
}

const WorkCard: React.FC<Props> = ({project: { name, theme, logoImgUrl, layoutImgUrl}}) => {
  const dispatch = useDispatch();
  
  const openWork = useCallback(() => {
    dispatch(setTitle(name));
    dispatch(setImageUrl(layoutImgUrl));
    dispatch(setPopupIsOpen(true));
  }, [dispatch, name, layoutImgUrl]);

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
