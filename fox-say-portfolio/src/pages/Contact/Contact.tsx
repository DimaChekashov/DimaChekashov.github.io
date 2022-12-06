import React from "react";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
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
    </div>
  );
};

export default Contact;
