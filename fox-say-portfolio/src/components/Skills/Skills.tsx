import React from "react";
import {SkillsProps} from "./Skills.props";
import styles from "./Skills.module.scss";

const Skills: React.FC<SkillsProps> = () => {
  return (
    <div className={styles.skills}>
      <h2 className={styles.skillsTitle}>Skills & Experience</h2>
      <div className={styles.skillsDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quae corrupti adipisci libero non minus omnis
        similique, veniam beatae, dignissimos repellendus minima harum necessitatibus blanditiis. Excepturi vero
        corporis adipisci earum.
      </div>
      <div className={styles.skillsDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quae corrupti adipisci libero non minus omnis
        similique, veniam beatae, dignissimos repellendus minima harum necessitatibus blanditiis. Excepturi vero
        corporis adipisci earum.
      </div>
      <div className={styles.companies}>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>Company Name</h3>
          <div className={styles.companyDate}>09.09.2021 - 09.09.2022</div>
          <div className={styles.companyDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>Company Name</h3>
          <div className={styles.companyDate}>09.09.2021 - 09.09.2022</div>
          <div className={styles.companyDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>Company Name</h3>
          <div className={styles.companyDate}>09.09.2021 - 09.09.2022</div>
          <div className={styles.companyDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
      </div>
      <div className={styles.technology}>
        
      </div>
    </div>
  );
};

export default Skills;
