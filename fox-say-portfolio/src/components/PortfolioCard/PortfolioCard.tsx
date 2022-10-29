import React from 'react';
import { PortfolioCardProps } from './PortfolioCard.props';
import styles from "./PortfolioCard.module.scss";

const PortfolioCard: React.FC<PortfolioCardProps> = () => {
  return (
    <div className="portfolio-card">
      Portfolio
    </div>
  );
};

export default PortfolioCard;
