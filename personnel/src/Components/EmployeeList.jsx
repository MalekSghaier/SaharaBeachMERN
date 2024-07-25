import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Importing the plus and trash icons
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import Sidebar from '../layout/SidebarPers/Sidebar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    sexe: '',
    service: '',
    nom: '',
    matricule: ''
  });
  const employeesPerPage = 5;
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchEmployees();
  }, [filters, currentPage]);

  const fetchEmployees = () => {
    const params = {
      ...filters,
      offset: currentPage * employeesPerPage,
      limit: employeesPerPage
    };

    // Convert matricule to a number if it's a valid number
    if (params.matricule && !isNaN(params.matricule)) {
      params.matricule = Number(params.matricule);
    }

    axios.get('http://localhost:3000/auth/employees', { params })
      .then(response => {
        setEmployees(response.data.employees);
        setTotalEmployees(response.data.total);
      })
      .catch(error => {
        console.error("There was an error fetching the employees!", error);
      });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setCurrentPage(0); // Reset to first page when filters change
  };

  const handleDelete = (matricule) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      axios.delete(`http://localhost:3000/auth/delete-employee/${matricule}`)
        .then(response => {
          alert('Employé supprimé avec succès!');
          fetchEmployees(); // Refresh the employee list
        })
        .catch(error => {
          console.error('There was an error deleting the employee!', error);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar selected="Liste des Employés" className='dashboardPers-sidebar' />
      <div className="employee-list-container">
        <div className="employee-list">
          <h1>Liste des Employés</h1>
          <div className="filters">
            <select name="sexe" onChange={handleFilterChange} value={filters.sexe}>
              <option value="">Sexe</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
            <select name="service" onChange={handleFilterChange} value={filters.service}>
              <option value="">Service</option>
              <option value="Direction">Direction</option>
              <option value="Bars">Bars</option>
              <option value="Cuisines">Cuisine</option>
              <option value="Reception">Réception</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Nettoyage">Nettoyage</option>
              <option value="Entretien">Entretien</option>
              <option value="FINANCE & COMPTABILI">Finance & Comptabilité</option>
              <option value="Controle">Contrôle</option>
              <option value="Personnel">Personnel</option>
              <option value="Stewarding">Stewarding</option>
              <option value="Jardin">Jardin</option>
              <option value="Qualite et Hygiene">Qualité et Hygiène</option>
              <option value="Maitre Nageur">Maître Nageur</option>
              <option value="Informatique">Informatique</option>
              <option value="Etages">Étages</option>
              <option value="Approvisionnement">Approvisionnement</option>
            </select>
            <input type="text" name="nom" placeholder="Nom" onChange={handleFilterChange} value={filters.nom} />
            <div className="matricule-filter">
              <input type="text" name="matricule" placeholder="Matricule" onChange={handleFilterChange} value={filters.matricule} />
              <button className="add-employee-button" onClick={() => navigate('/add-employee')}>
                <FaPlus />
                Ajouter Employé
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                
                <th>Numéro Matricule</th>
                <th>Nom & Prénom</th>
                <th>Date de Naissance</th>
                <th>Service</th>
                <th>Genre</th>
                <th>Action</th> {/* New column for the delete button */}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.MATRIC}>

                  <td>{employee.MATRIC}</td>
                  <td>{employee.NOMPRE}</td>
                  <td>{new Date(employee.DATNAI).toLocaleDateString()}</td>
                  <td>{employee.DEPDES}</td>
                  <td>{employee.FHF}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(employee.MATRIC)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={Math.ceil(totalEmployees / employeesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
