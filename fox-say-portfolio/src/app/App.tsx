import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { theme } from "../components/Sidebar/themeSlice";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimatedRoutes from "../components/AnimatedRoutes/AnimatedRoutes";
import ParticlesBackground from "../components/ParticlesBackground/ParticlesBackground";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const themeStatus = useSelector(theme.status);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("theme-type", themeStatus);
  }, [themeStatus]);

  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.AppContent}>
        <AnimatedRoutes />
        <ParticlesBackground />
      </div>
    </div>
  );
};

export default App;
