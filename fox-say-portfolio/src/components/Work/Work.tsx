import React, { useState } from "react";
import {WorkProps} from "./Work.props";
import styles from "./Work.module.scss";
import WorkCard from "../WorkCard/WorkCard";
import WorkPopup from "../WorkPopup/WorkPopup";
import AvtorostImg from "../../assets/works/layouts/avtorost.jpg";

const projects = [
  {
    name: "Avtorost", 
    logoImgUrl: "./assets/works/logos/avtorost.png", 
    layoutImgUrl: AvtorostImg
  }
];

const Work: React.FC<WorkProps> = () => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupImgUrl, setPopupImgUrl] = useState<string>("");

  const openPopup = (title: string, imageUrl: string) => {
    setPopupIsOpen(true);
    setPopupTitle(title);
    setPopupImgUrl(imageUrl);
  }

  return (
    <>
      <div className={styles.work}>
        {projects.map((project, i) => 
          <WorkCard 
            key={i}
            imageUrl={project.logoImgUrl} 
            onClick={() => openPopup(project.name, project.layoutImgUrl)} 
          />
        )}
      </div>
      <WorkPopup title={popupTitle} isOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}>
        <img src={popupImgUrl} alt={popupTitle} />
      </WorkPopup>
    </>
  );
};

export default Work;
