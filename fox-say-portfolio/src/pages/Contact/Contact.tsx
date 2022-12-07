import React from "react";
import {motion} from "framer-motion";
import styles from "./Contact.module.scss";
import Loader from "../../components/Loader/Loader";

const Contact: React.FC = () => {
  return (
    <motion.div 
      className={styles.contact}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <h2 className={styles.contactTitle}>Contact me</h2>
      <form className={styles.contactForm}>
        <input type="text" className={styles.contactInput} placeholder="Name" />
        <input type="text" className={styles.contactInput} placeholder="Email" />
        <input type="text" className={styles.contactInput} placeholder="Subject" />
        <textarea className={styles.contactTextarea} placeholder="Message" />
        <button type="submit" className={styles.contactBtn}>
          Send message
        </button>
      </form>
      <Loader />
    </motion.div>
  );
};

export default Contact;
