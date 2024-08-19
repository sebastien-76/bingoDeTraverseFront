import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './accueil.css';

import authContext from "../../../hooks/useAuth";

const Accueil = () => {

    const { isLogged } = useContext(authContext);

    return (
        <>
            <img src="../../../images/cheminTraverse.png" alt="logo chemin de tarverse" className="logo_accueil" />
            <h1 className="titre_accueil">Bienvenue sur le <br /><span>Bingo de traverse!</span></h1>
            {(!isLogged) &&
                <div>
                    < button className="btn_connexion"><Link to="/connexion" className="btn_connexion_link">Connexion</Link></button >
                    <p className="p_accueil">Pas encore inscrit, c'est par <Link to="/inscription" className="lien_accueil">ici</Link></p>
                </div>
            }
        </>
    )

}

export default Accueil