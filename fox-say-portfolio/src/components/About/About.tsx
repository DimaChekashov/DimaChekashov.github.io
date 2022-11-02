import React from "react";
import {AboutProps} from "./About.props";
import styles from "./About.module.scss";

const About: React.FC<AboutProps> = () => {
  return (
    <div className={styles.about}>
      <div className={styles.aboutBlock}>
        <h2 className={styles.aboutTitle}>My, Myself & I</h2>
        <div className={styles.aboutDesc}>
          A frontend developer with 4 years of extensive experience in Web Development.
        </div>
        <div className={styles.aboutDesc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A dolorem nobis provident adipisci, temporibus odit
          suscipit. Culpa nemo cupiditate natus, quibusdam dolorem quod labore. Voluptas exercitationem labore fuga magnam
          harum.
        </div>
        <div className={styles.aboutDesc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A dolorem nobis provident adipisci, temporibus odit
          suscipit. Culpa nemo cupiditate natus, quibusdam dolorem quod labore. Voluptas exercitationem labore fuga magnam
          harum.
        </div>
        <div className={styles.aboutLink}>Lets do something!</div>
      </div>
    </div>
  );
};

export default About;
