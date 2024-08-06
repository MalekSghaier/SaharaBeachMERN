// src/Components/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
        navigate('/login'); // Redirect to login page after successful logout
      } catch (err) {
        console.error('Error logging out:', err);
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging out...</p>; // Optional: Display a message or loading indicator
};

export default Logout;
