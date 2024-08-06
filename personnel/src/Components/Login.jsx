import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from '../context/UserContext';
import "./Login.css";

const Login = () => {
    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/auth/login", {
            matricule,
            password,
        }).then(response => {
            if (response.data.status) {
                const user = response.data.user;
                setUser(user); // Mise à jour du contexte utilisateur
                showToast("Connexion réussie", "success");

                // Show the toast for a short duration, then show the loading spinner and navigate
                setTimeout(() => {
                    setLoading(true);
                    setTimeout(() => {
                        if (user.service === "Equipe hygiène") {
                            navigate('/dashboardHyg');
                        } else if (user.service === "Equipe personnel") {
                            navigate('/dashboardPers');
                        } else {
                            navigate('/'); // Default route if service is unknown
                        }
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
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Connectez-vous à votre compte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            id="matricule"
                            type="text"
                            className="form-control"
                            placeholder="Matricule"
                            value={matricule}
                            onChange={(e) => setMatricule(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Se Connecter</button>
                    <div className="center">
                        <a href="/signup">Créer un Compte ?</a>
                    </div>
                </form>
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
};

export default Login;
