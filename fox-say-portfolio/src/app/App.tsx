import React from "react";
import {AppProps} from "./App.props";
import styles from "./App.module.scss";
import {Route, Routes} from "react-router-dom";
import {Routes as RoutesHref} from "../utils/routes";
import Sidebar from "../components/Sidebar/Sidebar";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Skills from "../pages/Skills/Skills";
import Work from "../components/Work/Work";
import Contact from "../pages/Contact/Contact";

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
