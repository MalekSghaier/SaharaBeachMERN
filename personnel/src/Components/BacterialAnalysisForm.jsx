import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BacterialAnalysisForm.css';

const BacterialAnalysisForm = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10),
        typeEchantillon: 'Alimentaire',
        alimentaire: Array(5).fill(''),
        surfaces: Array(2).fill(''),
        empreintesMains: Array(3).fill(''),
        eau: Array(3).fill(''),
        legionnelles: Array(10).fill(''),
    });
    const [step, setStep] = useState(1);
    const navigate = useNavigate(); // Add this line to use the navigation hook

    const handleChange = (e, index, key) => {
        const updatedField = [...formData[key]];
        updatedField[index] = e.target.value;
        setFormData({ ...formData, [key]: updatedField });
    };

    const handleTypeChange = (e) => {
        setFormData({ ...formData, typeEchantillon: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/api/bacterialAnalysis/add', formData);
            alert('Form submitted successfully.');
            navigate('/AnalyseBacterio'); // Navigate to the AnalyseBacterio page
        } catch (error) {
            alert('Error submitting form.');
        }
    };

    const handleAddAnalyse = (e) => {
        e.preventDefault();
        handleSubmit(); // Call the submit function
    };

    return (
        <div className="page-container">
            <form onSubmit={handleAddAnalyse} className="bacterial-analysis-container">
                <div>
                    <label>Date:</label>
                    <input type="date" value={formData.date} readOnly />
                </div>
                {step === 1 && (
                    <>
                        <label>Type Echantillon:</label>
                        <select value={formData.typeEchantillon} onChange={handleTypeChange}>
                            <option value="Alimentaire">Alimentaire</option>
                            <option value="eau">eau</option>
                            <option value="Légionnelles">Légionnelles</option>
                        </select>
                        <div>
                            <label>Vous devez saisir 09 denrées alimentaires:</label>
                            {formData.alimentaire.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleChange(e, index, 'alimentaire')}
                                />
                            ))}
                        </div>
                        <div>
                            <label>Vous devez saisir 02 surfaces:</label>
                            {formData.surfaces.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleChange(e, index, 'surfaces')}
                                />
                            ))}
                        </div>
                        <div>
                            <label>Vous devez saisir 03 empreintes de mains:</label>
                            {formData.empreintesMains.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleChange(e, index, 'empreintesMains')}
                                />
                            ))}
                        </div>
                        <button type="button" onClick={() => setStep(2)}>Passer aux analyses D'eau</button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <label>Type Echantillon:</label>
                        <select value="eau" readOnly>
                            <option value="eau">eau</option>
                        </select>
                        <div>
                            <label>Zones de saisie texte:</label>
                            {formData.eau.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleChange(e, index, 'eau')}
                                />
                            ))}
                        </div>
                        <button type="button" onClick={() => setStep(3)}>Passer aux analyses de Légionnelles</button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <label>Type Echantillon:</label>
                        <select value="Légionnelles" readOnly>
                            <option value="Légionnelles">Légionnelles</option>
                        </select>
                        <div>
                            <label>Zones de saisie texte:</label>
                            {formData.legionnelles.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleChange(e, index, 'legionnelles')}
                                />
                            ))}
                        </div>
                        <button type="submit">Envoyer le formulaire</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default BacterialAnalysisForm;
