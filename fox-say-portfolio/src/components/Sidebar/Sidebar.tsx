import React from "react";
import FoxSayLogo from "./../../assets/foxsay-logo.svg";
import {NavLink} from "react-router-dom";
import {Routes} from "../../utils/routes";
import { useDispatch } from "react-redux";
import { toggleTheme } from "./themeSlice";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <img src={FoxSayLogo} alt="Logo" className={styles.sidebarLogoImg} />
        <div className={styles.sidebarLogoName}>Dmitry</div>
        <div className={styles.sidebarLogoLabel}>Front-end Developer</div>
      </div>
      <nav className={styles.sidebarNav}>
        <NavLink
          to={Routes.home}
          className={({isActive}) => styles.sidebarNavLink + (isActive ? ` ${styles.active}` : "")}
          end>
          Home
        </NavLink>
        <NavLink
          to={Routes.about}
          className={({isActive}) => styles.sidebarNavLink + (isActive ? ` ${styles.active}` : "")}>
          About
        </NavLink>
        <NavLink
          to={Routes.skills}
          className={({isActive}) => styles.sidebarNavLink + (isActive ? ` ${styles.active}` : "")}>
          Skills
        </NavLink>
        <NavLink
          to={Routes.works}
          className={({isActive}) => styles.sidebarNavLink + (isActive ? ` ${styles.active}` : "")}>
          Works
        </NavLink>
        <NavLink
          to={Routes.contact}
          className={({isActive}) => styles.sidebarNavLink + (isActive ? ` ${styles.active}` : "")}>
          Contact
        </NavLink>
      </nav>
      <ul className={styles.sidebarSocial}>
        <li>
          <a href="https://t.me/FoxSayJS" target="_blank" className={styles.sidebarSocialLink} rel="noreferrer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C24.8369 0 32 7.16313 32 16C32 24.8369 24.8369 32 16 32C7.16313 32 0 24.8369 0 16C0 7.16313 7.16313 0 16 0ZM21.5193 22.5217C21.8136 21.6188 23.1923 12.6198 23.3628 10.8466C23.4143 10.3096 23.2445 9.9527 22.912 9.79339C22.5099 9.6 21.9144 9.6967 21.2237 9.94574C20.2762 10.2873 8.16348 15.4303 7.46365 15.728C6.8 16.0097 6.17252 16.3172 6.17252 16.7624C6.17252 17.0755 6.35826 17.2515 6.87026 17.4344C7.40313 17.6243 8.74504 18.0313 9.53739 18.2497C10.3005 18.4605 11.1694 18.2776 11.6563 17.975C12.1725 17.6543 18.1294 13.6682 18.5572 13.319C18.9843 12.9697 19.3252 13.417 18.976 13.767C18.6268 14.1162 14.5377 18.0849 13.9986 18.6344C13.344 19.3016 13.8087 19.993 14.2477 20.2699C14.7492 20.5857 18.3562 23.0052 18.8995 23.3934C19.4428 23.7816 19.9937 23.9576 20.4981 23.9576C21.0024 23.9576 21.2682 23.2932 21.5193 22.5217Z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://career.habr.com/foxsayjs"
            target="_blank"
            className={styles.sidebarSocialLink}
            rel="noreferrer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.16344 0 0 7.16344 0 16V16C0 24.8366 7.16344 32 16 32V32C24.8366 32 32 24.8366 32 16V16C32 7.16344 24.8366 0 16 0V0ZM9.36674 7.51C9.36578 6.30796 10.34 5.333 11.542 5.333V5.333C13.172 5.333 13.73 5.369 13.766 5.484C13.792 5.573 13.808 7.307 13.808 9.349L13.8003 12.2121C13.7994 12.5381 14.1849 12.7112 14.428 12.494V12.494C15.308 11.718 16.048 11.447 17.449 11.395C18.371 11.369 18.746 11.405 19.392 11.635C20.809 12.109 21.809 13.083 22.33 14.52C22.533 15.083 22.559 15.671 22.596 20.234L22.6196 23.0974C22.6297 24.3291 21.6341 25.333 20.4023 25.333V25.333C19.1777 25.333 18.185 24.3403 18.185 23.1157V21.172C18.185 17.073 18.175 17.021 17.899 16.521C17.508 15.86 17.086 15.557 16.42 15.485C15.285 15.36 14.498 15.745 14.05 16.673C13.836 17.1 13.81 17.548 13.8 21.147C13.7932 22.0867 13.7845 22.9618 13.7768 23.6593C13.7652 24.7092 13.24 25.3191 12.19 25.3314C11.9887 25.3338 11.7754 25.335 11.555 25.335V25.335C10.3499 25.335 9.373 24.3581 9.373 23.153V15.335L9.36674 7.51Z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/foxsayjs"
            target="_blank"
            className={styles.sidebarSocialLink}
            rel="noreferrer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C32 7.164 24.836 0 16 0ZM9.99467 7.204C11.1173 7.204 11.8653 7.952 11.8653 8.94933C11.8653 9.94667 11.1173 10.6947 9.87067 10.6947C8.748 10.696 8 9.94667 8 8.94933C8 7.952 8.748 7.204 9.99467 7.204ZM12 22.6667H8V12H12V22.6667ZM25.3333 22.6667H21.568V16.8373C21.568 15.2253 20.564 14.8533 20.188 14.8533C19.812 14.8533 18.556 15.1013 18.556 16.8373C18.556 17.0853 18.556 22.6667 18.556 22.6667H14.6667V12H18.5573V13.488C19.0587 12.62 20.0627 12 21.9453 12C23.828 12 25.3333 13.488 25.3333 16.8373V22.6667Z" />
            </svg>
          </a>
        </li>
      </ul>
      <button 
        type="button" 
        className={styles.lightSwitch}
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.1 122.88">
          <path d="M75.84,27.1a35.68,35.68,0,0,1,8.61,7.09,32.45,32.45,0,0,1,5.76,9.26h0a36.84,36.84,0,0,1,1.85,6,34.64,34.64,0,0,1,.24,14,38.69,38.69,0,0,1-2.15,7.32l-.12.25c-2.06,5-5.59,9.86-9,14.66-1.75,2.42-3.48,4.82-4.94,7.15A4.69,4.69,0,0,1,71.73,95l-27.56,4.1A4.7,4.7,0,0,1,39,95.69a40.19,40.19,0,0,0-2.54-5.82,24.85,24.85,0,0,0-3-4.49c-1.43-1.63-2.88-3.29-4.29-5.2A40.42,40.42,0,0,1,25,73.24h0a41.08,41.08,0,0,1-2.81-8,35.84,35.84,0,0,1-.95-8.45v0A35.39,35.39,0,0,1,22.35,48a41.69,41.69,0,0,1,3.42-8.85l.2-.35a35.55,35.55,0,0,1,7.13-8.63,33.72,33.72,0,0,1,9.46-5.83l.28-.1a35.41,35.41,0,0,1,8-2.14,37.78,37.78,0,0,1,8.77-.2,39.14,39.14,0,0,1,8.4,1.71,38.44,38.44,0,0,1,7.79,3.49Zm-4,87.26a17.37,17.37,0,0,1-6.28,6.29,16.46,16.46,0,0,1-7.2,2.2A14.87,14.87,0,0,1,51,121.4a15.1,15.1,0,0,1-4.39-3.27l25.29-3.77Zm2.41-14.15,0,1.65,0,.58a22,22,0,0,1,0,3.25l-.49,2.39-30.64,4.56-.54-1.23-1.19-4.9,0-1.42,32.79-4.88ZM56.34,3.77A3.84,3.84,0,0,1,60.23,0h0l.27,0A3.84,3.84,0,0,1,64,3.89h0a1.27,1.27,0,0,1,0,.2l-.21,8.21h0a2.11,2.11,0,0,1,0,.26,3.84,3.84,0,0,1-3.87,3.54h0l-.27,0a3.84,3.84,0,0,1-3.53-3.88h0a1.09,1.09,0,0,1,0-.19l.2-8.25ZM14,18.15a3.84,3.84,0,0,1,2.47-6.66,3.83,3.83,0,0,1,2.76,1l6.16,5.73a3.91,3.91,0,0,1,1.22,2.68,3.82,3.82,0,0,1-1,2.76,3.86,3.86,0,0,1-2.67,1.22,3.8,3.8,0,0,1-2.76-1L14,18.15ZM3.92,60.48A3.86,3.86,0,0,1,0,56.75a3.84,3.84,0,0,1,3.73-4l8.41-.28a3.84,3.84,0,0,1,4,3.72v.06h0v.14a3.84,3.84,0,0,1-3.73,3.77h-.15l-8.3.27Zm106-11.92H110a3.84,3.84,0,0,1,2.66.86,3.81,3.81,0,0,1,1.4,2.59v0a.49.49,0,0,1,0,.13,3.84,3.84,0,0,1-3.44,4.06l-8.37.89a3.83,3.83,0,0,1-2.81-.85,3.84,3.84,0,0,1,2-6.8c2.79-.31,5.6-.63,8.4-.9ZM93.33,15.09A3.83,3.83,0,0,1,98.65,14h0a3.73,3.73,0,0,1,1.63,2.44,3.84,3.84,0,0,1-.58,2.88l-4.68,7A3.8,3.8,0,0,1,92.58,28a3.88,3.88,0,0,1-2.88-.57A3.92,3.92,0,0,1,88.06,25a3.84,3.84,0,0,1,.58-2.88l4.69-7ZM38.23,80.87A42.19,42.19,0,0,1,31,70.56,31.2,31.2,0,0,1,27.89,57,31.7,31.7,0,0,1,31.7,42.56a.47.47,0,0,0,.05-.1h0a27.5,27.5,0,0,1,13.4-11.71,29.65,29.65,0,0,1,13.93-2A32.09,32.09,0,0,1,72.39,33,27.43,27.43,0,0,1,84,46.2,28.85,28.85,0,0,1,84,68.45C81.31,75,75.15,82,71.11,88.4a1.67,1.67,0,0,0-.67,0L44.36,92.25a35,35,0,0,0-6.13-11.38Z"/>
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
