import React from "react";
import FoxSayImg from "./../../assets/foxsay-no-bg.png";
import {Routes} from "../../utils/routes";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import styles from "./Home.module.scss";
import Loader from "../../components/Loader/Loader";

const Home: React.FC = () => {
  return (
    <motion.div 
      className={styles.home}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
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
      <Loader />
    </motion.div>
  );
};

export default Home;
