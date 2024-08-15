import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './AddPlanForm.css'; // Assurez-vous que le chemin est correct

function AddPlanForm() {
  const [numeroPlan, setNumeroPlan] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [designation, setDesignation] = useState('');
  const [source, setSource] = useState('accomodation');
  const [processus] = useState('restauration');
  const [site] = useState('Saharabeach');
  const [pieceJointe, setPieceJointe] = useState(null);
  const navigate = useNavigate(); // Initialisez useNavigate

  const handleFileChange = (e) => {
    setPieceJointe(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('numeroPlan', numeroPlan);
    formData.append('date', date);
    formData.append('designation', designation);
    formData.append('source', source);
    formData.append('processus', processus);
    formData.append('site', site);
    if (pieceJointe) {
      formData.append('pieceJointe', pieceJointe);
    }

    try {
      await axios.post('http://localhost:3000/api/planactions/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Plan d'action ajouté avec succès!");
      navigate('/PlanAction'); // Redirection après succès
    } catch (error) {
      console.error("Erreur lors de l'ajout du plan d'action:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="plan-action-container">
        <h2>Ajouter Plan d'Action</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="number"
              placeholder="Numéro de Plan d'action"
              value={numeroPlan}
              onChange={(e) => setNumeroPlan(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="date"
              placeholder="Date de création"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Désignation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </label>
          <label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            >
              <option value="accomodation">Accomodation</option>
              <option value="autocontrôle">Autocontrôle</option>
            </select>
          </label>
          <label>
            <input
              type="text"
              placeholder="Processus"
              value={processus}
              readOnly
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Site"
              value={site}
              readOnly
            />
          </label>
          <label>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Ajouter Plan d'action</button>
        </form>
      </div>
    </div>
  );
}

export default AddPlanForm;
