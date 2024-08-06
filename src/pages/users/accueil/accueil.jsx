import React from "react";
import { Link } from "react-router-dom";
import './accueil.css';

const Accueil = () => {

    return (
        <>
            <img src="../../../images/cheminTraverse.png" alt="logo chemin de tarverse" className="logo_accueil" />
            <h1 className="titre_accueil">Bienvenue sur le <br/><span>Bingo de traverse!</span></h1>
            <p className="p_accueil">Pas encore inscrit, cliquer <Link to="/inscription" className="lien_accueil">ici</Link></p>
            <p className="p_accueil">Pour vous connecter, c'est par <Link to="/connexion" className="lien_accueil">ici</Link></p>
        </>
    )

}

export default Accueil