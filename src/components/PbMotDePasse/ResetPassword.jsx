// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/Auth';
import Bouton from '../boutons/bouton';
import './forgotPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [inputPass, setInputPass] = useState('password');
    const [visibilitePass, setVisibilitePass] = useState('/images/icons8-visible-24.png');

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

    const onClickOeil = () => {
        visibilitePass === "/images/icons8-visible-24.png" ? setVisibilitePass("/images/pngegg.png") : setVisibilitePass("/images/icons8-visible-24.png");
        inputPass === 'password' ? setInputPass('text') : setInputPass('password');    
    }

    return (
        <div>
            <h1>Réinitialiser votre mot de passe</h1>
            {error && <p>{error}</p>}
            <form className="form-container" onSubmit={handleSubmit}>
                <label>
                    Nouveau mot de passe:
                </label>
                <div className="input">
                    <input
                        type={inputPass}
                        placeholder="Entrez votre mot de passe" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <img src={visibilitePass} alt="icone d'oeil" onClick={onClickOeil}/>
                </div>
                <Bouton type="submit" text="Réinitialiser" style={{ height: '3em', width: "auto", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} />
            </form>
        </div>
    );
};

export default ResetPassword;
