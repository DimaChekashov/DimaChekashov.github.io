import React, { useCallback, useState } from "react";
import {WorkProps} from "./Work.props";
import Popup from "../../components/Popup/Popup";
import WorkCardList from "./WorkCardList/WorkCardList";
import styles from "./Work.module.scss";

const Work: React.FC<WorkProps> = () => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupImgUrl, setPopupImgUrl] = useState<string>("");

  const openPopup = useCallback((title: string, imageUrl: string) => {
    setPopupIsOpen(true);
    setPopupTitle(title);
    setPopupImgUrl(imageUrl);
  }, []);

  return (
    <>
      <WorkCardList onClick={openPopup} />
      <Popup title={popupTitle} isOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}>
        <img src={popupImgUrl} alt={popupTitle} />
      </Popup>
    </>
  );
};

export default Work;
