import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AnalyseBacterio.css';

const AnalyseBacterio = () => {
    const [analyses, setAnalyses] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchDate, setSearchDate] = useState('');
    const [isTableEmpty, setIsTableEmpty] = useState(false); // New state to track if the table is empty
    const columnsPerPage = 3; // Number of columns to display per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bacterialAnalysis/list');
                setAnalyses(response.data);
                setIsTableEmpty(response.data.length === 0); // Check if the table is empty

                // Extract unique full dates from the analyses
                const uniqueDates = [...new Set(response.data.map(item => new Date(item.date).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })))];
                setColumns(uniqueDates);
            } catch (error) {
                console.error('Error fetching analyses:', error);
            }
        };
        fetchAnalyses();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/bacterialAnalysis/search`, {
                params: { date: searchDate }
            });
            setAnalyses(response.data);
            setIsTableEmpty(response.data.length === 0); // Check if the table is empty after search
        } catch (error) {
            console.error('Error searching analyses:', error);
        }
    };

    const renderDetails = (field) => {
        return columns
            .slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage)
            .map((date, index) => (
                <td key={index}>
                    {analyses
                        .filter(analysis => new Date(analysis.date).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' }) === date)
                        .flatMap((analysis) =>
                            analysis[field] && analysis[field].length > 0
                                ? analysis[field].map((item, itemIdx) => (
                                    <div key={itemIdx} className="record-item">
                                        {item || ''}
                                    </div>
                                ))
                                : [<div key="" className="record-item"></div>]
                        )}
                </td>
            ));
    };

    const renderRow = (type, fields) => {
        return (
            <>
                {fields.map((field, idx) => (
                    <tr key={`${type}-${field}`}>
                        <td className={idx === 0 ? "bold-cell" : "subheader"}>
                            {type}: {field.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        {renderDetails(field)}
                    </tr>
                ))}
            </>
        );
    };

    const totalPages = Math.ceil(columns.length / columnsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="analyse-bacterio-container">
            <h1>Analyse Bactério</h1>
            <div className="search-add-container">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Rechercher</button>
                <button onClick={() => navigate('/AjoutAnalyseBacterio')} className="add-button">Ajouter Analyse Bactério</button>
            </div>
            <div className="table-container">
                {isTableEmpty ? (
                    <p>Aucune analyse trouvée pour la date sélectionnée.</p>
                ) : (
                    <table className="bacterio-table">
                        <thead>
                            <tr>
                                <th>Type d'Echantillon</th>
                                {columns
                                    .slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage)
                                    .map((date, index) => (
                                        <th key={index}>{date}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {renderRow('Alimentaire', ['alimentaire', 'surfaces', 'empreintesMains'])}
                            {renderRow('Eau', ['eau'])}
                            {renderRow('Légionnelles', ['legionnelles'])}
                        </tbody>
                    </table>
                )}
            </div>
            {!isTableEmpty && (
                <div className="pagination">
                    {pageNumbers.map(number => (
                        <span
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`pagination-item ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnalyseBacterio;
