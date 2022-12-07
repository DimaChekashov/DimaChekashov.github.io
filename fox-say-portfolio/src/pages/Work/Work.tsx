import React from "react";
import Popup from "./WorkPopup/WorkPopup";
import WorkCardList from "./WorkList/WorkList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {motion} from "framer-motion";
import styles from "./Work.module.scss";
import Loader from "../../components/Loader/Loader";

const Work: React.FC = () => {
  const {
    popupTitle, 
    popupImgUrl, 
    popupIsOpen
  } = useSelector((state: RootState) => state.workPopup);

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <WorkCardList />
      <Popup title={popupTitle} isOpen={popupIsOpen}>
        <img src={popupImgUrl} alt={popupTitle} />
      </Popup>
      <Loader />
    </motion.div>
  );
};

export default Work;
