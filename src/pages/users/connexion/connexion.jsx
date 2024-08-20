import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './connexion.css';
import { connexionUtilisateur } from "../../../services/Auth";
import { sauvegardeItem, suppressionItem } from "../../../services/localStorage";
import authContext from "../../../hooks/useAuth";
import RetourAccueil from "../../../components/retourAccueil/retourAccueil";
import Bouton from "../../../components/boutons/bouton";

const Connexion = () => {
    /* Etat des infos de connexion */
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [errorConnexion, setErrorConnexion] = useState('');

    const navigate = useNavigate();

    const { setIsLogged, setPersistence } = useContext(authContext);

    /* Mise a jour de l'etat des infos de connexion en fonction des entrées utilisateur  */
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }


    const handleSubmitConnexion = async (event) => {
        event.preventDefault();

        try {
            await connexionUtilisateur(credentials)
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                        sauvegardeItem('jetonUtilisateur', res.token)
                        setIsLogged(true)
                        navigate(`/game`)
                        setErrorConnexion('')
                    }
                    else {
                        const message = res.message ? res.message : res
                        setErrorConnexion(message)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <RetourAccueil />
            <h1>Connexion</h1>
            {errorConnexion && <p className="error_connexion">{errorConnexion}</p>}
            <form id="form_connexion" onSubmit={handleSubmitConnexion} className="form_connexion">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" value={credentials.password} autoComplete="off" onChange={onChange} required />
                <Bouton text="Se connecter" onClick={handleSubmitConnexion} />
            </form>
        </>
    )
}

export default Connexion