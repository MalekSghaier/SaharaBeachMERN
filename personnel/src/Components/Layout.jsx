// src/Components/Layout.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Sidebar from '../layout/Sidebar/Sidebar';
import SidebarPers from '../layout/SidebarPers/SidebarPers';
import './Layout.css';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="layout">
      {user && user.service === "Equipe hygiène" ? <Sidebar /> : <SidebarPers />}
      <div className="center-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
