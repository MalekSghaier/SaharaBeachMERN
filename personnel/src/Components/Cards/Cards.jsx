import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import { useEffect, useState } from "react";
import Axios from "axios";

const Cards = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur connecté
    Axios.get("http://localhost:3000/auth/user")
      .then(response => {
        if (response.data.status) {
          setUser(response.data.user);
        } else {
          // Gérer les erreurs éventuelles
        }
      })
      .catch(err => {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
      });
  }, []);

  if (!user) {
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
};

export default Cards;
