import React, { useState } from 'react';
import { sendForgotPasswordRequest } from "../../services/Auth";
import Bouton from '../boutons/bouton';
import './forgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendForgotPasswordRequest(email);
            setMessage(response.message);
        } catch (error) {
            setMessage("Une erreur est survenue");
        }
    };

    return (
        <div>
            <h1>Mot de passe oublié</h1>

                <form className="form-container" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        className="inputForgot"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <Bouton type="submit" text="Envoyer le lien de réinitialisation" style={{ height: '3em', width: "auto", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} />
                </form>
                {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
