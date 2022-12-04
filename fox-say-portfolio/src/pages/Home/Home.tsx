import React from "react";
import {HomeProps} from "./Home.props";
import FoxSayImg from "./../../assets/foxsay-no-bg.png";
import styles from "./Home.module.scss";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const Home: React.FC<HomeProps> = () => {
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
      <button type="button" className={styles.homeBtn}>
        Contact me!
      </button>
      <ParticlesBackground dark={true} />
    </div>
  );
};

export default Home;
