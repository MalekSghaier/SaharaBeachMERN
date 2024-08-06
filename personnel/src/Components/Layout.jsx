import React from 'react';
import Sidebar from '../layout/SidebarPers/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="center-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
