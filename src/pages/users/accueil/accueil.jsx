import React from "react";
import { Link } from "react-router-dom";
import './accueil.css';

const Accueil = () => {

    return (
        <>
            <h1 className="titre_accueil">Bienvenu(e) sur le Bingo de traverse!</h1>
            <p className="p_accueil">Pas encore inscrit, cliquer <Link to="/inscription" className="lien_accueil">içi</Link></p>
            <p className="p_accueil">Pour vous connecter, c'est par <Link to="/connexion" className="lien_accueil">içi</Link></p>
        </>
    )

}

export default Accueil