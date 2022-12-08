import React from "react";
import {Routes} from "../../utils/routes";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import styles from "./About.module.scss";
import Loader from "../../components/Loader/Loader";

const About: React.FC = () => {
  return (
    <>
      <motion.div 
        className={styles.about}
        transition={{ delay: 1.5 }}
        initial={{display: "none"}}
        animate={{display: "flex"}}
        exit={{display: "none"}}
      >
        <div className={styles.aboutBlock}>
          <h2 className={styles.aboutTitle}>My, Myself & I</h2>
          <div className={styles.aboutDesc}>
            A frontend developer with 4 years of extensive experience in Web Development. Having a Strong skills in responsive & interactive HTML development and Solid skills in Javascript(ES6+). I am driven by roles that will leverage my strengths in Frontend.
          </div>
          <NavLink className={styles.aboutLink} to={Routes.contact}>
            Let’s make something special.
          </NavLink>
        </div>
      </motion.div>
      <Loader />
    </>
  );
};

export default About;
