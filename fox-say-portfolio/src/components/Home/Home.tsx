import React from "react";
import {HomeProps} from "./Home.props";
import FoxSayImg from "./../../assets/foxsay-no-bg.png";
import styles from "./Home.module.scss";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";

const Home: React.FC<HomeProps> = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeLeft}>
        <h1 className={styles.homeTitle}>
          Hello,
          <br />
          I'm Dmitry Chekashov,
          <br />
          Front-end developer
        </h1>
        <button type="button" className={styles.homeBtn}>
          Contact me!
        </button>
      </div>
      <div className={styles.homeAvatar}>
        <img src={FoxSayImg} alt="Dmitry portrait" className={styles.homeImg} />
        <div className={styles.homeAvatarBlock}>
          
        </div>
      </div>
      <ParticlesBackground dark={true} />
    </div>
  );
};

export default Home;
