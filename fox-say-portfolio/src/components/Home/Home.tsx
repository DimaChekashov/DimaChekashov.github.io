import React from "react";
import { HomeProps } from "./Home.props";
import FoxSayImg from "./../../assets/foxsay.jpg";
import styles from "./Home.module.scss";

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <h1>Dmitry Chekashov</h1>
            <div>
                Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. aaa
            </div>
            <button type="button">Let’s get started</button>
            <img src={FoxSayImg} alt="" />
            <div>
                <a href="#">
                    <img src="#" alt="Telegram" />
                </a>
                <a href="#">
                    <img src="#" alt="Habr Career" />
                </a>
                <a href="#">
                    <img src="#" alt="Linkedin" />
                </a>
            </div>
        </div>
    );
};

export default Home;
