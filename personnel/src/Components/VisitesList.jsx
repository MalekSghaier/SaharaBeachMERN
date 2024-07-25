// components/VisitesList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VisitesList.css';

const VisitesList = () => {
    const [visits, setVisits] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = () => {
        axios.get('http://localhost:3000/api/visits')
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error fetching visits:', error));
    };

    const handleSearch = () => {
        axios.get(`http://localhost:3000/api/visits/search?date=${searchDate}`)
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error searching visits:', error));
    };

    const handleViewEmployees = (visitId) => {
        navigate(`/visits/${visitId}/employees`);
    };

    const handleAddVisit = () => {
        navigate('/visites');
    };

    return (
        <div className="visites-list-container">
            <h2>Liste des Visites</h2>
            <input
                type="date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
            />
            <button onClick={handleSearch}>Rechercher</button>
            <button onClick= {handleAddVisit}>Ajouter une Visite </button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visits.map(visit => (
                        <tr key={visit._id}>
                            <td>{visit.visitDate}</td>
                            <td>{visit.description}</td>
                            <td>
                                <button onClick={() => handleViewEmployees(visit._id)}>Voir Liste Employés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitesList;
