import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VisitesList.css';
import CoproEmployee from './CoproEmployee';

const CoproList = () => {
    const [visits, setVisits] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = () => {
        axios.get('http://localhost:3000/api/testCopro')
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error fetching visits:', error));
    };

    const handleSearch = () => {
        axios.get(`http://localhost:3000/api/testCopro/search?date=${searchDate}`)
            .then(response => setVisits(response.data))
            .catch(error => console.error('Error searching visits:', error));
    };

    const handleViewEmployees = (testId) => {
        axios.put(`http://localhost:3000/api/testCopro/${testId}/employees/update`)
            .then(response => {
                const testDate = response.data.testDate;
                navigate(`/testCopro/${testId}/employees`, { state: { testDate } });
            })
            .catch(error => console.error('Error updating visit date for employees:', error));
    };

    const handleAddVisit = () => {
        navigate('/testCopro');
    };

    const formatDate = (dateString) => {
        const options = {day: '2-digit', month: '2-digit',  year: 'numeric'  };
        return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('/');
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
            <button onClick={handleAddVisit}>Ajouter une Visite</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visits.map(TestCopro => (
                        <tr key={TestCopro._id}>
                            <td>{formatDate(TestCopro.testDate)}</td>
                            <td>{TestCopro.description}</td>
                            <td>
                                <button onClick={() => handleViewEmployees(TestCopro._id)}>Voir Liste Employés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoproList;
