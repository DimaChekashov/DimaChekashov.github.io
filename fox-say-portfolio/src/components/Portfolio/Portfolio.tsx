import React from 'react';
import { PortfolioProps } from './Portfolio.props';
import styles from "./Portfolio.module.scss";

const Portfolio: React.FC<PortfolioProps> = () => {
  return (
    <div className={styles.portfolio}>
      Portfolio
    </div>
  );
};

export default Portfolio;
