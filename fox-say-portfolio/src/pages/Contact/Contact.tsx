import React from "react";
import {motion} from "framer-motion";
import styles from "./Contact.module.scss";
import Loader from "../../components/Loader/Loader";

const Contact: React.FC = () => {
  return (
    <>
      <motion.div 
        className={styles.contact}
        transition={{ delay: 1.5 }}
        initial={{display: "none"}}
        animate={{display: "flex"}}
        exit={{display: "none"}}
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
      </motion.div>
      <Loader />
    </>
  );
};

export default Contact;
