import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, workPopup } from '../workPopupSlice';
import styles from "./WorkPopup.module.scss";

const WorkPopup: React.FC = () => {
  const popup = useSelector(workPopup.data);
  
  const dispatch = useDispatch();

  const closePopup = () => dispatch(setData(undefined));

  return (
    <>
      <div className={`${styles.overflow} ${popup ? "" : styles.hide}`}>
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h3 className={styles.popupHeading}>
              {popup?.title}
            </h3>
            <button type="button" className={styles.popupClose} onClick={closePopup} />
          </div>
          <div className={styles.popupBody}>
            <img src={popup?.imgUrl} alt={popup?.title} />
          </div>
        </div>
        <div className={`${styles.overlay}`} onClick={closePopup} />
      </div>
    </>
  );
};

export default WorkPopup;
