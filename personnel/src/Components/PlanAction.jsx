// PlanAction.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlanAction() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Plan d'Action</h1>
      <button onClick={() => navigate('/add-plan')}>Ajouter Plan d'action</button>
      <button>Ajouter action corrective</button>
    </div>
  );
}

export default PlanAction;
