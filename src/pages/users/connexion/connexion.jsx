import React from "react";
import './connexion.css';

const Connexion = () => {
    return (
        <>
            <h1>Connexion</h1>
            <form className="form_connexion">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Se connecter</button>
            </form>
        </>
    )
}

export default Connexion