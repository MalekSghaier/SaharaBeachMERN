import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './VisitEmployees.css';

// Fonction pour formater les dates en `jj/mm/aaaa`
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};

function VisitEmployees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [matriculeSearch, setMatriculeSearch] = useState('');
    const [dateSearch, setDateSearch] = useState('');
    const [isModified, setIsModified] = useState(false);
    const employeesPerPage = 5;
    const location = useLocation();
    const { testDate } = location.state;
    const [searchWithoutDate, setSearchWithoutDate] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, [testDate]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/personnelCopro/all', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (Array.isArray(response.data)) {
                const employeesData = response.data.map(employee => {
                    const isPresent = employee.DateVisite?.includes(testDate);
                    return {
                        ...employee,
                        Status: isPresent ? 'P' : 'A'
                    };
                });
                setEmployees(employeesData);
                setFilteredEmployees(employeesData);
            } else {
                console.error('API response is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const searchEmployees = async () => {
        try {
            let response;
            if (dateSearch) {
                if (searchWithoutDate) {
                    response = await axios.get('http://localhost:3000/api/personnelCopro/searchWithoutDate', {
                        params: {
                            date: dateSearch
                        }
                    });
                } else {
                    response = await axios.get('http://localhost:3000/api/personnelCopro/searchByDate', {
                        params: {
                            date: dateSearch
                        }
                    });
                }
            } else {
                response = await axios.get('http://localhost:3000/api/personnelCopro/search', {
                    params: {
                        matricule: matriculeSearch ? parseInt(matriculeSearch, 10) : undefined
                    }
                });
            }

            if (Array.isArray(response.data)) {
                setFilteredEmployees(response.data);
            } else {
                console.error('API response is not an array:', response.data);
            }
            setCurrentPage(1);
        } catch (error) {
            console.error('Error searching employees:', error);
        }
    };

    useEffect(() => {
        searchEmployees();
    }, [matriculeSearch, dateSearch, searchWithoutDate]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handleStatusChange = async (id, newStatus) => {
        const updatedEmployees = filteredEmployees.map(emp =>
            emp._id === id ? { ...emp, Status: newStatus } : emp
        );

        setFilteredEmployees(updatedEmployees);
        setIsModified(true);

        try {
            if (newStatus === 'P') {
                await axios.put(`http://localhost:3000/api/personnelCopro/updateDateVisite/${id}`, {
                    testVisite: testDate
                });
                const updatedEmployeesWithDate = updatedEmployees.map(emp =>
                    emp._id === id ? { ...emp, DateVisite: emp.DateVisite.includes(testDate) ? emp.DateVisite : [...emp.DateVisite, testDate], Status: 'A' } : emp
                );
                setFilteredEmployees(updatedEmployeesWithDate);
            } else if (newStatus === 'A') {
                await axios.put(`http://localhost:3000/api/personnelCopro/removeDateVisite/${id}`);
            }
        } catch (error) {
            console.error('Error updating visit date:', error);
            alert('Erreur lors de la mise à jour de la date de visite');
        }
    };

    const handleSubmit = async () => {
        const updates = filteredEmployees.map(emp =>
            axios.put(`http://localhost:3000/api/personnelCopro/updateStatus/${emp._id}`, { status: emp.Status })
        );

        try {
            await Promise.all(updates);
            setIsModified(false);
            alert('Statut des employés mis à jour avec succès');
        } catch (error) {
            console.error('Error updating employee statuses:', error.response.data);
            alert('Erreur lors de la mise à jour des statuts des employés');
        }
    };

    const renderEmployees = currentEmployees.map(employee => (
        <tr key={employee._id} className={employee.Status === 'P' ? 'present' : 'absent'}>
            <td>{employee.MATRIC}</td>
            <td>{employee.NOMPRE}</td>
            <td>{employee.DEPDES}</td>
            <td>{employee.FHF}</td>
            <td>{employee.DateVisite ? employee.DateVisite.map(date => formatDate(date)).join(', ') : 'N/A'}</td>
            <td>
                <select
                    value={employee.Status}
                    onChange={e => handleStatusChange(employee._id, e.target.value)}
                >
                    <option value="P">Présent</option>
                    <option value="A">Absent</option>
                </select>
            </td>
        </tr>
    ));

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
    const pageNumbers = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    const handleClick = event => {
        if (event.target.dataset.page === '...') return;
        setCurrentPage(Number(event.target.dataset.page));
    };

    const renderPageNumbers = pageNumbers.map((number, index) => {
        if (number === '...') {
            return <span key={index} className="pagination-ellipsis">...</span>;
        }
        return (
            <span
                key={index}
                data-page={number}
                onClick={handleClick}
                className={`pagination-item ${currentPage === number ? 'active' : ''}`}
            >
                {number}
            </span>
        );
    });

    return (
        <div className="visit-employees-container">
            <h1>Gestion des tests Copro</h1>
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Rechercher par matricule"
                    value={matriculeSearch}
                    onChange={e => setMatriculeSearch(e.target.value)}
                />
                <input
                    type="date"
                    value={dateSearch}
                    onChange={e => setDateSearch(e.target.value)}
                />
                <button onClick={() => setSearchWithoutDate(false)}>Afficher avec la date</button>
                <button onClick={() => setSearchWithoutDate(true)}>Afficher sans la date</button>
            </div>
            <table className="employees-table">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom et Prénom</th>
                        <th>Département</th>
                        <th>Sexe</th>
                        <th>Dates des visites</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {renderEmployees}
                </tbody>
            </table>
            <div className="pagination">
                {renderPageNumbers}
            </div>
            <button onClick={handleSubmit} disabled={!isModified}>
                Sauvegarder les modifications
            </button>
        </div>
    );
}

export default VisitEmployees;
