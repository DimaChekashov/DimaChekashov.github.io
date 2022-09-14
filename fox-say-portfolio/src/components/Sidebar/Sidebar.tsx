import React from 'react';
import { SidebarProps } from './Sidebar.props';
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      Sidebar
    </div>
  );
};

export default Sidebar;
