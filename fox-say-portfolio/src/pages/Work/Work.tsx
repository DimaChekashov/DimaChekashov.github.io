import React from "react";
import Popup from "./WorkPopup/WorkPopup";
import WorkCardList from "./WorkList/WorkList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./Work.module.scss";

const Work: React.FC = () => {
  const {
    popupTitle, 
    popupImgUrl, 
    popupIsOpen
  } = useSelector((state: RootState) => state.workPopup);

  return (
    <>
      <WorkCardList />
      <Popup title={popupTitle} isOpen={popupIsOpen}>
        <img src={popupImgUrl} alt={popupTitle} />
      </Popup>
    </>
  );
};

export default Work;
