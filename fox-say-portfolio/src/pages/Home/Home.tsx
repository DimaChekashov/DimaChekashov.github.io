import React from "react";
import FoxSayImg from "./../../assets/foxsay-no-bg.png";
import {Routes} from "../../utils/routes";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import styles from "./Home.module.scss";
import Loader from "../../components/Loader/Loader";

const Home: React.FC = () => {
  return (
    <>
      <motion.div 
        className={styles.home}
        transition={{ delay: 1.5 }}
        initial={{display: "none"}}
        animate={{display: "flex"}}
        exit={{display: "none"}}
      >
        <h1 className={styles.homeTitle}>
          Hello, I'm Dmitry Chekashov, Front-end developer
        </h1>
        <h2 className={styles.homeSubtitle}>
          I develop beautifully  things, and I love what I do.
        </h2>
        <div className={styles.homeAvatar}>
          <img src={FoxSayImg} alt="Dmitry portrait" className={styles.homeImg} />
        </div>
        <NavLink className={styles.homeBtn} to={Routes.contact}>
            Contact me!
        </NavLink>
      </motion.div>
      <Loader />
    </>
  );
};

export default Home;
