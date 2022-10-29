import React from "react";
import {WorkProps} from "./Work.props";
import styles from "./Work.module.scss";
import WorkCard from "../WorkCard/WorkCard";

const Work: React.FC<WorkProps> = () => {
  return (
    <div className={styles.work}>
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
    </div>
  );
};

export default Work;
