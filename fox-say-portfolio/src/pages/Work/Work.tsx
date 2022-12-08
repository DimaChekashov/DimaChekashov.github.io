import React from "react";
import WorkPopup from "./WorkPopup/WorkPopup";
import WorkCardList from "./WorkList/WorkList";
import {motion} from "framer-motion";
import Loader from "../../components/Loader/Loader";
import styles from "./Work.module.scss";

const Work: React.FC = () => {
  return (
    <>
      <motion.div 
        transition={{ delay: 1.5 }}
        initial={{display: "none"}}
        animate={{display: "block"}}
        exit={{display: "none"}}
      >
        <WorkCardList />
        <WorkPopup />
      </motion.div>
      <Loader />
    </>
  );
};

export default Work;
