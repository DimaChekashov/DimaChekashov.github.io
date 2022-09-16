import React from "react";
import {About, Contact, Home, Sidebar, Skills, Work} from "../components";
import {AppProps} from "./App.props";
import styles from "./App.module.scss";

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.AppContent}>
        <Home />
        <About />
        <Skills />
        <Work />
        <Contact />
      </div>
    </div>
  );
};

export default App;
