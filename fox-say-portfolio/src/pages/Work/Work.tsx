import React from "react";
import WorkPopup from "./WorkPopup/WorkPopup";
import WorkCardList from "./WorkList/WorkList";
import {motion} from "framer-motion";
import Loader from "../../components/Loader/Loader";
import styles from "./Work.module.scss";

const Work: React.FC = () => {
  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <WorkCardList />
      <WorkPopup />
      <Loader />
    </motion.div>
  );
};

export default Work;
