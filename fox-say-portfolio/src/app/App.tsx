import React from "react";
import {AppProps} from "./App.props";
import styles from "./App.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import AnimatedRoutes from "../components/AnimatedRoutes/AnimatedRoutes";

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.AppContent}>
        <AnimatedRoutes />
      </div>
    </div>
  );
};

export default App;
