import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './accueil.css';
import Bouton from "../../../components/boutons/bouton";

import authContext from "../../../hooks/useAuth";

const Accueil = () => {

    const { isLogged } = useContext(authContext);

    // Bouton connexion
    const toConnexion = () => {
        window.location.href = "/connexion";
    }

    return (
        <>
        {(!isLogged) ?
        
            <a href="https://www.lechemindetraverse-escapegame.fr/">
                <img src="../../../images/cheminTraverse.png" alt="logo chemin de tarverse" className="logo_accueil" />
            </a>
            :
            <img src="../../../images/cheminTraverse.png" alt="logo chemin de tarverse" className="logo_accueil" />
        }    
            <h1 className="titre_accueil">Bienvenue sur le <br /><span className="span_accueil">Bingo de traverse!</span></h1>

            {(!isLogged) ?
            <>
                <div>
                    <p className="explication_accueil">
                        Seul les <b>gamemasters</b> du 
                        <b> Chemin de traverse</b> à <b>Arras </b>
                        sont autorisés à acceder au jeu. <br />
                        Si vous chercher le <b> site</b> de l'escape game,
                        cliquez sur le <b> logo</b>.
                    </p>
                </div>
            
                <div>
                    <Bouton style={{width: '160px', height: '6vh', backgroundColor: 'var(--blue-pastel)', marginTop: '40px', border: '2px solid var(--blue-pastel)'}} text="Connexion" onClick={toConnexion}/>
                    <p className="p_accueil">Pas encore inscrit, c'est par <Link to="/inscription" className="lien_accueil">ici</Link></p>
                </div>
            </>
            :
            <div>
                {/* mettre ici le classement */}
            </div>
            }
            
        </>
    )

}

export default Accueil