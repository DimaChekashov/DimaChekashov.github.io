import AvtorostImg from "../../../assets/works/layouts/avtorost.jpg";
import ArtsvarkaImg from "../../../assets/works/layouts/artsvarka.jpg";
import MechanicaImg from "../../../assets/works/layouts/mechanica.jpg";
import MegaOknaImg from "../../../assets/works/layouts/mega-okna.jpg";
import OknaImg from "../../../assets/works/layouts/okna.jpg";
import RemdizelImg from "../../../assets/works/layouts/remdizel.jpg";
import SpectehnikaImg from "../../../assets/works/layouts/spectehnika.jpg";
import RkMetropolImg from "../../../assets/works/layouts/rk-metropol.jpg";
import BerkGroupImg from "../../../assets/works/layouts/berk-group.jpg";
import AzimutImg from "../../../assets/works/layouts/azimut.jpg";
import KamskayaMekhanikaImg from "../../../assets/works/layouts/kamskaya-mekhanika.jpg";
import TisImg from "../../../assets/works/layouts/tis.jpg";
import TechnotronImg from "../../../assets/works/layouts/technotron.jpg";
import Il16Img from "../../../assets/works/layouts/il16.jpg";
import DostupMebelImg from "../../../assets/works/layouts/dostup-mebel.jpg";

export interface Project {
  name: string;
  logoImgUrl: string;
  layoutImgUrl: string;
  theme: string;
}

const projects: Project[] = [
  {
    name: "Avtorost", 
    logoImgUrl: "./assets/works/logos/avtorost.png", 
    layoutImgUrl: AvtorostImg,
    theme: "dark"
  },
  {
    name: "Artsvarka", 
    logoImgUrl: "./assets/works/logos/artsvarka.png", 
    layoutImgUrl: ArtsvarkaImg,
    theme: "gray"
  },
  {
    name: "Mechanica", 
    logoImgUrl: "./assets/works/logos/mechanica.png", 
    layoutImgUrl: MechanicaImg,
    theme: "secondary"
  },
  {
    name: "Mega Okna", 
    logoImgUrl: "./assets/works/logos/mega-okna.png", 
    layoutImgUrl: MegaOknaImg,
    theme: "gray"
  },
  {
    name: "Okna", 
    logoImgUrl: "./assets/works/logos/okna.png", 
    layoutImgUrl: OknaImg,
    theme: "secondary"
  },
  {
    name: "Remdizel", 
    logoImgUrl: "./assets/works/logos/remdizel.png", 
    layoutImgUrl: RemdizelImg,
    theme: "dark"
  },
  {
    name: "Spectehnika", 
    logoImgUrl: "./assets/works/logos/spectehnika.png", 
    layoutImgUrl: SpectehnikaImg,
    theme: "white"
  },
  {
    name: "Rk Metropol", 
    logoImgUrl: "./assets/works/logos/rk-metropol.png", 
    layoutImgUrl: RkMetropolImg,
    theme: "dark"
  },
  {
    name: "Berk Group", 
    logoImgUrl: "./assets/works/logos/berk-group.png", 
    layoutImgUrl: BerkGroupImg,
    theme: "white"
  },
  {
    name: "Azimut", 
    logoImgUrl: "./assets/works/logos/azimut.png", 
    layoutImgUrl: AzimutImg,
    theme: "white"
  },
  {
    name: "Kamskaya Mekhanika", 
    logoImgUrl: "./assets/works/logos/kamskaya-mekhanika.png", 
    layoutImgUrl: KamskayaMekhanikaImg,
    theme: "secondary"
  },
  {
    name: "TIS", 
    logoImgUrl: "./assets/works/logos/tis.png", 
    layoutImgUrl: TisImg,
    theme: "white"
  },
  {
    name: "Technotron", 
    logoImgUrl: "./assets/works/logos/technotron.svg", 
    layoutImgUrl: TechnotronImg,
    theme: "dark"
  },
  {
    name: "il16", 
    logoImgUrl: "./assets/works/logos/il16.png", 
    layoutImgUrl: Il16Img,
    theme: "secondary"
  },
  {
    name: "Dostup Mebel", 
    logoImgUrl: "./assets/works/logos/dostup-mebel.png", 
    layoutImgUrl: DostupMebelImg,
    theme: "white"
  }
];

export default projects;