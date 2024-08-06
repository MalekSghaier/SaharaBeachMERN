
import Sidebar from '../layout/Sidebar/Sidebar';

import './DashboardHyg.css';
import { useEffect } from 'react';
import Axios from "axios";
import React, { useState } from "react";

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
    <div className="grid-one-item grid-common grid-c1">
    <div className="grid-c-title">
      <div className="grid-c-line">
        <i className="fas fa-user-circle icon"></i>
        Bonjour <span className="Nom">{user.fullName}</span>,
      </div>
      <div className="grid-c-line">
        <i className="fas fa-home icon"></i>
        Bienvenue sur votre tableau de bord personnel !
      </div>
      <div className="grid-c-line">
        <i className="fas fa-tools icon"></i>
        Votre outil pour une gestion efficace et simplifiée.
      </div>
      <div className="grid-c-line">
        <i className="fas fa-key icon"></i>
        L'organisation est la clé du succès.
      </div>
    </div>
  </div>
  );
}

export default DashboardHyg;
