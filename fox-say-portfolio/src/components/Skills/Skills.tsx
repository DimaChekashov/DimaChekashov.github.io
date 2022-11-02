import React from "react";
import {SkillsProps} from "./Skills.props";
import styles from "./Skills.module.scss";

const Skills: React.FC<SkillsProps> = () => {
  return (
    <div className={styles.skills}>
      <div className={styles.skillsBlock}>
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
      </div>
      <div className={styles.companies}>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>Rebrain - <span>Frontend Developer</span></h3>
          <div className={styles.companyLocation}>Moscow, Russia</div>
          <div className={styles.companyDate}>Jun 2021 - Present</div>
          <ul className={styles.companyList}>
            <li>Engaged in the development and support of web pages of the site</li>
            <li>Develop Landing Pages</li>
            <li>Engaged in cross-browser adaptive layout of web components</li>
            <li>Participated in task planning and evaluation</li>
            <li>Participated in interface design</li>
          </ul>
        </div>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>Community Phone - <span>Frontend Developer</span></h3>
          <div className={styles.companyLocation}>Remote, Boston, USA</div>
          <div className={styles.companyDate}>Mar 2022 - Aug 2022</div>
          <ul className={styles.companyList}>
            <li>Development and support of the service on React</li>
            <li>Engaged in cross-browser adaptive layout of web components</li>
          </ul>
        </div>
        <div className={styles.company}>
          <h3 className={styles.companyTitle}>It Chelny - <span>Frontend Developer</span></h3>
          <div className={styles.companyLocation}>Naberezhnye Chelny, Russia</div>
          <div className={styles.companyDate}>Mar 2017 - Nov 2019 | Jan 2021 - Jun 2021</div>
          <ul className={styles.companyList}>
            <li>Engaged in development and support of web pages</li>
            <li>Develop Landing Pages, Online Stores, Portals, News Sites</li>
            <li>Adapted existing sites for mobile devices</li>
            <li>Optimized and accelerated site loading using Lighthouse</li>
            <li>Participated in the planning and evaluation of tasks</li>
            <li>Develop Javascript widgets</li>
          </ul>
        </div>
      </div>
      <div className={styles.technology}>
        
      </div>
    </div>
  );
};

export default Skills;
