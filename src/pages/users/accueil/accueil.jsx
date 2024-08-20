import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './accueil.css';

import authContext from "../../../hooks/useAuth";

const Accueil = () => {

    const { isLogged } = useContext(authContext);

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
                    <p className="expliquation_accueil">
                        Seul les <b>gamemasters</b> du 
                        <b> Chemin de traverse</b> à <b>Arras </b>
                        sont autorisés à acceder au jeu. <br />
                        Si vous chercher le <b> site</b> de l'escape game,
                        cliquez sur le <b> logo</b>.
                    </p>
                </div>
            
                <div>
                    < button className="btn_connexion"><Link to="/connexion" className="btn_connexion_link">Connexion</Link></button >
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