import React, { useState } from 'react';
import './Signup.css';
import Axios from 'axios'; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [matricule, setMatricule] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [service, setService] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier les champs obligatoires
        if (!fullName || !matricule || !birthDate || !service || !password) {
            showToast("Veuillez remplir tous les champs", "error");
            return;
        }

        Axios.post('http://localhost:3000/auth/signup', {
            fullName,
            matricule,
            birthDate,
            service,
            password,
        }).then(response => {
            if (response.data.status) {
                showToast("Inscription réussie", "success");
                setFullName('');
                setMatricule('');
                setBirthDate('');
                setService('');
                setPassword('');

                // Show the toast for a short duration, then show the loading spinner and navigate
                setTimeout(() => {
                    setLoading(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000); // Delay to show the spinner before navigating
                }, 500); // Duration to show the toast
            } else {
                showToast(response.data.message, "error");
            }
        }).catch(err => {
            showToast("Une erreur s'est produite. Veuillez réessayer.", "error");
        });
    };

    const showToast = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => {
            setToastMessage('');
            setToastType('');
        }, 3000);
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Bonjour!</h2>
                <p>Veuillez vous inscrire pour continuer...</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nom & Prénom"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="matricule"
                            placeholder="Matricule"
                            value={matricule}
                            onChange={(e) => setMatricule(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="date"
                            name="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value="">Service</option>
                            <option value="Equipe personnel">Equipe personnel</option>
                            <option value="Equipe hygiène">Equipe hygiène</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>
                <div>
                    <a href="/login">Vous avez déjà un compte ?</a>
                </div>
                {toastMessage && (
                    <div className={`toast ${toastType}`}>
                        {toastMessage}
                    </div>
                )}
                {loading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
