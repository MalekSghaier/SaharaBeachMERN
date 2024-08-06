// components/TestCopro.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './TestCopro.css'; // Importation du fichier CSS
import { useNavigate } from 'react-router-dom';

const TestCopro = () => {
    const [testDate, setTestDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); // État pour les erreurs
    const navigate = useNavigate(); // Utilisation de useNavigate

    const handleAddTestCopro = () => {
        axios.post('http://localhost:3000/api/testCopro', {
            testDate,
            description
        })
        .then(() => {
            alert('Test Copro ajouté avec succès');
            setTestDate('');
            setDescription('');
            navigate('/copro-list'); // Utilisation de navigate
        })
        .catch(error => {
            setError('Erreur lors de l\'ajout du test copro'); // Affiche l'erreur
            console.error('Error adding test copro:', error);
        });
    };

    return (
        <div className="page-container">
            <div className="test-copro-container">
                <h2>Ajouter Test Copro</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="date"
                    value={testDate}
                    onChange={e => setTestDate(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <button onClick={handleAddTestCopro}>Ajouter Test Copro</button>
            </div>
        </div>
    );
};

export default TestCopro;