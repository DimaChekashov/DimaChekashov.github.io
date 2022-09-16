import React from "react";
import {SidebarProps} from "./Sidebar.props";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <img src="" alt="Logo" />
      </div>
      <nav className={styles.sidebarNav}>
        <a href="#" className={styles.sidebarNavLink}>
          Home
        </a>
        <a href="#" className={styles.sidebarNavLink}>
          About
        </a>
        <a href="#" className={styles.sidebarNavLink}>
          Skills
        </a>
        <a href="#" className={styles.sidebarNavLink}>
          Works
        </a>
        <a href="#" className={styles.sidebarNavLink}>
          Contact
        </a>
      </nav>
      <ul className={styles.sidebarSocial}>
        <li>
          <a href="#" className={styles.sidebarSocialLink}>
            <img src="" alt="linkedin" />
          </a>
        </li>
        <li>
          <a href="#" className={styles.sidebarSocialLink}>
            <img src="" alt="habrcarrer" />
          </a>
        </li>
        <li>
          <a href="#" className={styles.sidebarSocialLink}>
            <img src="" alt="telegram" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
