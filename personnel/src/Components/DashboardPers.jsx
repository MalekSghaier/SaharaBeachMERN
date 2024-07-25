// DashboardPers.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from '../layout/SidebarPers/Sidebar';
import Content from '../layout/ContentPers/Content';
import './DashboardPers.css';

const DashboardPers = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get('http://localhost:3000/auth/user', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <div className='dashboardPers-container'>
      <Sidebar className='dashboardPers-sidebar' />
      <div className='dashboardPers-content'>
        <Content />
      </div>
    </div>
  );
}

export default DashboardPers;
