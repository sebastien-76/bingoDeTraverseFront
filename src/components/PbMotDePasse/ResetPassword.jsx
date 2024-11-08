// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/Auth';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log('Token:', token);
            console.log('New Password:', newPassword);
            const result = await resetPassword(token, newPassword);
            if (result.message === 'Mot de passe réinitialisé avec succès.') {
                navigate('/connexion');
            } else {
                setError(result.message || 'Une erreur est survenue.');
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Une erreur est survenue.');
        }
    };

    return (
        <div>
            <h1>Réinitialiser votre mot de passe</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nouveau mot de passe:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Réinitialiser</button>
            </form>
        </div>
    );
};

export default ResetPassword;
