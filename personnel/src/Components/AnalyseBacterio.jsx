import React from 'react';
import { useNavigate } from 'react-router-dom';

function AnalyseBacterio() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/AjoutAnalyseBacterio'); // Remplacez par la route vers laquelle vous voulez rediriger
  };

  return (
    <div>
      <h1>Analyse Bactério</h1>
      <p>Hello world!</p>
      <button onClick={handleButtonClick}>Ajouter une Analyse Bactério</button>
    </div>
  );
}

export default AnalyseBacterio;
