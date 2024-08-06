// DashboardPers.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
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
    <div className="dashboard-container">
      {/* L'image d'arrière-plan est gérée par le CSS */}
    </div>
  );




}

export default DashboardPers;



