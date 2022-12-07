import React from "react";
import {AppProps} from "./App.props";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimatedRoutes from "../components/AnimatedRoutes/AnimatedRoutes";
import ParticlesBackground from "../components/ParticlesBackground/ParticlesBackground";
import { theme } from "../components/Sidebar/themeSlice";
import { useSelector } from "react-redux";
import styles from "./App.module.scss";

const App: React.FC<AppProps> = () => {
  const themeStatus = useSelector(theme.status);

  return (
    <div className={styles.App} theme-type={themeStatus}>
      <Sidebar />
      <div className={styles.AppContent}>
        <AnimatedRoutes />
        <ParticlesBackground />
      </div>
    </div>
  );
};

export default App;
