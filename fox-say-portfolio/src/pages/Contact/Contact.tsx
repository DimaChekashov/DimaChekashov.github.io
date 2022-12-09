import React, { useState } from "react";
import {motion} from "framer-motion";
import styles from "./Contact.module.scss";
import Loader from "../../components/Loader/Loader";
import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  user: "foxdima99@gmail.com",
  password: "",
  host: "smtp.gmail.com",
  ssl: true
});

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendEmail = () => {
    client.send({
      text: 'i hope this works',
      from: 'you <username@your-email.com>',
      to: 'someone <someone@your-email.com>, another <another@your-email.com>',
      cc: 'else <else@your-email.com>',
      subject: 'testing emailjs',
    }, (err, message) => {
      console.log(err || message);
    })
    clearFields();
  }

  const clearFields = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

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
          <input 
            type="text" 
            className={styles.contactInput} 
            placeholder="Name" 
            value={name} 
            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} 
          />
          <input 
            type="text" 
            className={styles.contactInput} 
            placeholder="Email" 
            value={email} 
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} 
          />
          <input 
            type="text" 
            className={styles.contactInput} 
            placeholder="Subject" 
            value={subject} 
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSubject(e.currentTarget.value)} 
          />
          <textarea 
            className={styles.contactTextarea} 
            placeholder="Message" 
            value={message} 
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)} 
          />
          <button 
            type="button" 
            onClick={sendEmail}
            className={styles.contactBtn}
          >
            Send message
          </button>
        </form>
      </motion.div>
      <Loader />
    </>
  );
};

export default Contact;
