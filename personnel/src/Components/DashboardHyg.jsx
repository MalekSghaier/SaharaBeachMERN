
import Sidebar from '../layout/Sidebar/Sidebar';
import Content from '../layout/Content/Content';
import './DashboardHyg.css';
import { useEffect } from 'react';
import Axios from "axios";
import React, { useState } from "react";
import Cards from "./Cards/Cards";

const DashboardHyg = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      Axios.get('http://localhost:3000/auth/user')
          .then(response => {
              if (response.data.status) {
                  setUser(response.data.user);
              } else {
                  setError(response.data.message);
              }
              setLoading(false);
          })
          .catch(err => {
              console.error('Erreur lors de la récupération des informations de l\'utilisateur', err);
              setError('Erreur lors de la récupération des informations de l\'utilisateur');
              setLoading(false);
          });
  }, []);

  if (loading) {
      return <div>Chargement...</div>;
  }

  return (
    <div className='dashboardHyg-container'>
      <Sidebar className='dashboardHyg-sidebar' />
      <div className='dashboardHyg-content'>
        <Content />
      </div>
    </div>
  );
}

export default DashboardHyg;
