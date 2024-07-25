import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AddEmployee.css'; // Create and import CSS for styling

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    birthDate: '',
    service: '',
    sexe: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add-employee', formData)
      .then(response => {
        alert('Employé ajouté avec succès!');
        navigate('/employeeList'); // Redirect to the employees page
      })
      .catch(error => {
        console.error('There was an error adding the employee!', error);
      });
  };

  return (
    <div className='dashboard-Add'>
      <div className="add-employee-form">
        <h1>Ajouter Employé</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="matricule" placeholder="Matricule" onChange={handleChange} required />
          <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
          <input type="date" name="birthDate" onChange={handleChange} required />
          <select name="service" onChange={handleChange} required>
            <option value="">Service</option>
            <option value="Direction">Direction</option>
            <option value="Bars">Bars</option>
            <option value="Cuisine">Cuisine</option>
            <option value="Réception">Réception</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Nettoyage">Nettoyage</option>
            <option value="Entretien">Entretien</option>
            <option value="Finance & Comptabilité">Finance & Comptabilité</option>
            <option value="Contrôle">Contrôle</option>
            <option value="Personnel">Personnel</option>
            <option value="Stewarding">Stewarding</option>
            <option value="Jardin">Jardin</option>
            <option value="Qualité et Hygiène">Qualité et Hygiène</option>
            <option value="Informatique">Informatique</option>
            <option value="Étages">Étages</option>
            <option value="Approvisionnement">Approvisionnement</option>
          </select>
          <select name="sexe" onChange={handleChange} required>
            <option value="">Sexe</option>
            <option value="H">Homme</option>
            <option value="F">Femme</option>
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
