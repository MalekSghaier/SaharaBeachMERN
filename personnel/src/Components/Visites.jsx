import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Visites.css'; // Importation du fichier CSS

const Visites = () => {
    const [visitDate, setVisitDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); // État pour les erreurs
    const navigate = useNavigate();

    const handleAddVisit = () => {
        axios.post('http://localhost:3000/api/visits', {
            visitDate,
            description
        }).then(() => {
            alert('Visite ajoutée avec succès');
            navigate('/visits-list'); // Rediriger vers la liste des visites
        }).catch(error => {
            setError('Erreur lors de l\'ajout de la visite'); // Affiche l'erreur
            console.error('Error adding visit:', error);
        });
    };

    return (
        <div className="page-container">
            <div className="visites-container">
                <h2>Ajouter Visite</h2>
                {error && <p>{error}</p>}
                <input
                    type="date"
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <button onClick={handleAddVisit}>Ajouter Visite</button>
            </div>
        </div>
    );
};

export default Visites;
