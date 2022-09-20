import React from "react";
import {ContactProps} from "./Contact.props";
import styles from "./Contact.module.scss";

const Contact: React.FC<ContactProps> = () => {
  return (
    <div className={styles.contact}>
      <h2 className={styles.contactTitle}>Contact me</h2>
      <div className={styles.contactDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nemo possimus fuga laboriosam numquam. Quos,
        doloremque sunt ipsa voluptatem, nihil incidunt perspiciatis maxime, quae labore eaque tempora. Molestiae, rem
        ab?
      </div>
      <form className={styles.contactForm}>
        <input type="text" className={styles.contactInput} placeholder="Name" />
        <input type="text" className={styles.contactInput} placeholder="Email" />
        <input type="text" className={styles.contactInput} placeholder="Subject" />
        <textarea className={styles.contactTextarea} placeholder="Message" />
        <button type="submit" className={styles.contactBtn}>
          Send message!
        </button>
      </form>
    </div>
  );
};

export default Contact;
