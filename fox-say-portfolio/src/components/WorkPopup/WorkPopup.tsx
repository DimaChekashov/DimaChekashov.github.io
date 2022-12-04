import React from 'react';
import { WorkPopupProps } from './WorkPopup.props';
import styles from "./WorkPopup.module.scss";

const WorkPopup: React.FC<WorkPopupProps> = ({children, title, isOpen, setPopupIsOpen}) => {

  const closePopup = () => {
    setPopupIsOpen(false);
  }

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
