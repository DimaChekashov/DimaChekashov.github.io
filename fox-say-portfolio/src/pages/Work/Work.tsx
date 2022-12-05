import React, { useState } from "react";
import {WorkProps} from "./Work.props";
import styles from "./Work.module.scss";
import WorkCard from "./WorkCard/WorkCard";
import Popup from "../../components/Popup/Popup";
import AvtorostImg from "../../assets/works/layouts/avtorost.jpg";
import ArtsvarkaImg from "../../assets/works/layouts/artsvarka.jpg";
import MechanicaImg from "../../assets/works/layouts/mechanica.jpg";
import MegaOknaImg from "../../assets/works/layouts/mega-okna.jpg";

const projects = [
  {
    name: "Avtorost", 
    logoImgUrl: "./assets/works/logos/avtorost.png", 
    layoutImgUrl: AvtorostImg
  },
  {
    name: "Artsvarka", 
    logoImgUrl: "./assets/works/logos/artsvarka.png", 
    layoutImgUrl: ArtsvarkaImg
  },
  {
    name: "Mechanica", 
    logoImgUrl: "./assets/works/logos/mechanica.png", 
    layoutImgUrl: MechanicaImg
  },
  {
    name: "Mega Okna", 
    logoImgUrl: "./assets/works/logos/mega-okna.png", 
    layoutImgUrl: MegaOknaImg
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
      <Popup title={popupTitle} isOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}>
        <img src={popupImgUrl} alt={popupTitle} />
      </Popup>
    </>
  );
};

export default Work;
