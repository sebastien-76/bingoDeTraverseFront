import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './connexion.css';
import { connexionUtilisateur } from "../../../services/Auth";
import { sauvegardeItem } from "../../../services/localStorage";
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
    const [inputPass, setInputPass] = useState('password');
    const [visibilitePass, setVisibilitePass] = useState('/images/icons8-visible-24.png');

    const navigate = useNavigate();

    const { setIsLogged } = useContext(authContext);

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

    const onClickOeil = () => {
        visibilitePass === "/images/icons8-visible-24.png" ? setVisibilitePass("/images/pngegg.png") : setVisibilitePass("/images/icons8-visible-24.png");
        inputPass === 'password' ? setInputPass('text') : setInputPass('password');    
    }

    return (
        <>
            <RetourAccueil />
            <h1>Connexion</h1>
            {errorConnexion && <p className="error_connexion">{errorConnexion}</p>}
            <form id="form_connexion" onSubmit={handleSubmitConnexion} className="form_connexion">
                <label htmlFor="email">Email</label>
                <div className="input">
                    <input type="email" id="email" name="email" value={credentials.email} placeholder="Entrez votre email" onChange={onChange} required />
                </div>
                <label htmlFor="password">Mot de passe</label>
                <div className="input">
                    <input type={inputPass} id="password" name="password" value={credentials.password} placeholder="Entrez votre mot de passe" autoComplete="off" onChange={onChange} required />
                    <img src={visibilitePass} alt="icone d'oeil" onClick={onClickOeil}/>
                </div>
                <Bouton text="Se connecter" style={{ height: '3em', marginTop: '2rem', width: '150px', backgroundColor: 'var(--purple-pastel)', border: '2px solid var(--purple-pastel)' }} onClick={handleSubmitConnexion} />
            </form>

        </>
    )
}

export default Connexion