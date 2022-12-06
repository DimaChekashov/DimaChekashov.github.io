import React from 'react';
import { useDispatch } from 'react-redux';
import { setPopupIsOpen } from '../../../features/workPopup/workPopupSlice';
import styles from "./WorkPopup.module.scss";

export interface Props {
    title: string;
    isOpen: boolean;
    children: React.ReactNode;
}

const WorkPopup: React.FC<Props> = ({children, title, isOpen}) => {
  const dispatch = useDispatch();

  const closePopup = () => dispatch(setPopupIsOpen(false));

  return (
    <>
      <div 
        className={`${styles.overflow} ${!isOpen ? styles.hide : ""}`}>
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h3 className={styles.popupHeading}>
              {title}
            </h3>
            <button type="button" className={styles.popupClose} onClick={closePopup} />
          </div>
          <div className={styles.popupBody}>
            {children}
          </div>
        </div>
      <div className={`${styles.overlay} ${!isOpen ? styles.hide : ""}`} onClick={closePopup} />
      </div>
    </>
  );
};

export default WorkPopup;
