import React from "react";
import FoxSayImg from "./../../assets/foxsay-no-bg.png";
import styles from "./Home.module.scss";
import {Routes} from "../../utils/routes";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
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
      <ParticlesBackground dark={true} />
    </div>
  );
};

export default Home;
