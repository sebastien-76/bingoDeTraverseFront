// ForgotPassword.js
import React, { useState } from 'react';
import { sendForgotPasswordRequest } from "../../services/Auth";

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
        <>
            <h1>Mot de passe oublié</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Envoyer le lien de réinitialisation</button>
            </form>
            {message && <p>{message}</p>}
        </>
    );
};

export default ForgotPassword;
