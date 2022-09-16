import React from "react";
import {About, Contact, Home, Sidebar, Skills, Work} from "../components";
import {AppProps} from "./App.props";
import styles from "./App.module.scss";
import {Route, Routes} from "react-router-dom";

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.AppContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/works" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
