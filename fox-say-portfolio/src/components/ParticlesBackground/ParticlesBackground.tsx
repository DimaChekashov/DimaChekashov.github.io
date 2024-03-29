import React, {useCallback} from "react";
import Particles from "react-tsparticles";
import type {Engine, Container} from "tsparticles-engine";
import {loadFull} from "tsparticles";

import styles from "./ParticlesBackground.module.scss";
import { theme } from "../Sidebar/themeSlice";
import { useSelector } from "react-redux";

enum circleColors {
  darkTheme = "#bc6ff1",
  lightTheme = "#5ca5ff"
}

enum backgroundColors {
  darkTheme = "#000000",
  lightTheme = "#f9f7f7"
}

const ParticlesBackground: React.FC = () => {
  const themeStatus = useSelector(theme.status);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  const checkTheme = (colors: {lightTheme: string, darkTheme: string}): string => {
    return themeStatus === "light" ? colors.lightTheme : colors.darkTheme;
  }

  return (
    <Particles
      className={styles.particles}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 1
        },
        background: {
          color: {
            value: checkTheme(backgroundColors)
          }
        },
        fpsLimit: 120,
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "bubble"
            },
            onclick: {
              enable: false
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 215.7842157842158,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3
            },
            repulse: {
              distance: 400,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        particles: {
          number: {
            value: 160,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: checkTheme(circleColors)
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: checkTheme(circleColors)
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 15.782952832645451,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: checkTheme(circleColors),
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 600
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground;
