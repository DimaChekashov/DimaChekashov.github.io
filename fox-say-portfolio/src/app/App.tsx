import React from "react";
import {About, Contact, Home, Sidebar, Skills, Work} from "../components";
import {AppProps} from "./App.props";
import styles from "./App.module.scss";
import {Route, Routes} from "react-router-dom";
import {Routes as RoutesHref} from "../utils/routes";

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.AppContent}>
        <Routes>
          <Route path={RoutesHref.home} element={<Home />} />
          <Route path={RoutesHref.about} element={<About />} />
          <Route path={RoutesHref.skills} element={<Skills />} />
          <Route path={RoutesHref.works} element={<Work />} />
          <Route path={RoutesHref.contact} element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
