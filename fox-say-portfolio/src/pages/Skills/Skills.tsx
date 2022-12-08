import React from "react";
import HtmlIcon from "./../../assets/skills/html5-original.svg";
import CssIcon from "./../../assets/skills/css3-original.svg";
import JavaScriptIcon from "./../../assets/skills/javascript-original.svg";
import TypeScriptIcon from "./../../assets/skills/typescript-original.svg";
import ReactIcon from "./../../assets/skills/react-original.svg";
import ReduxIcon from "./../../assets/skills/redux-original.svg";
import SassIcon from "./../../assets/skills/sass-original.svg";
import BootstrapIcon from "./../../assets/skills/bootstrap-original.svg";
import GitIcon from "./../../assets/skills/git-original.svg";
import GulpIcon from "./../../assets/skills/gulp-plain.svg";
import {motion} from "framer-motion";
import styles from "./Skills.module.scss";
import Loader from "../../components/Loader/Loader";

const Skills: React.FC = () => {
  return (
    <>
      <motion.div 
        className={styles.skills}
        transition={{ delay: 1.5 }}
        initial={{display: "none"}}
        animate={{display: "block"}}
        exit={{display: "none"}}
      >
        <h2 className={styles.skillsTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillsGridColumn}>
            <h3 className={styles.skillsSubtitle}>
              Languages:
            </h3>
            <div className={styles.skillsItems}>
              <img src={HtmlIcon} alt="html icon" className={styles.skillsItem} />
              <img src={CssIcon} alt="css icon" className={styles.skillsItem} />
              <img src={JavaScriptIcon} alt="javascript icon" className={styles.skillsItem} />
              <img src={TypeScriptIcon} alt="typescript icon" className={styles.skillsItem} />
            </div>
          </div>
          <div className={styles.skillsGridColumn}>
            <h3 className={styles.skillsSubtitle}>
              Libraries:
            </h3>
            <div className={styles.skillsItems}>
              <img src={ReactIcon} alt="react icon" className={styles.skillsItem} />
              <img src={ReduxIcon} alt="redux icon" className={styles.skillsItem} />
              <img src={BootstrapIcon} alt="bootstrap icon" className={styles.skillsItem} />
            </div>
          </div>
          <div className={styles.skillsGridColumn}>
            <h3 className={styles.skillsSubtitle}>
              Tools:
            </h3>
            <div className={styles.skillsItems}>
              <img src={SassIcon} alt="sass icon" className={styles.skillsItem} />
              <img src={GulpIcon} alt="gulp icon" className={styles.skillsItem} />
              <img src={GitIcon} alt="git icon" className={styles.skillsItem} />
            </div>
          </div>
        </div>
        <h2 className={styles.skillsTitle}>Experience</h2>
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
      </motion.div>
      <Loader />
    </>
  );
};

export default Skills;
