import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './accueil.css';
import Bouton from "../../../components/boutons/bouton";
import { getUsers } from "../../../services/serviceAppel";
import authContext from "../../../hooks/useAuth";

const Accueil = () => {

    const [rang, setRang] = useState([]);
    const { isLogged } = useContext(authContext);

    useEffect(() => {
        if (isLogged) { fetchPoints()};
    }, [isLogged]);

    const toConnexion = () => {
        window.location.href = "/connexion";
    }

    const fetchPoints = async () => {
        try {
            getUsers()
                .then(res => res.json())
                .then(data => {
                const filteredUsers = data.data.filter(user => user.email !== 'testBingodetraverse@gmail.com');

                // Récupérer les pseudo et points des utilisateurs
                const pseudoPoints = filteredUsers.map(user => ({ pseudo: user.pseudo, points: user.points }));

                // Trier par ordre décroissant
                const sortedPseudoPoints = pseudoPoints.sort((a, b) => b.points - a.points);

                // Mettre à jour le state du rang avec la liste triée
                setRang(sortedPseudoPoints);
                    
                });
            
        } catch (error) {
            console.error("Erreur lors de la récupération des points:", error);
        }
    }

    return (
        <>
            {(!isLogged) ?
                <a href="https://www.lechemindetraverse-escapegame.fr/">
                    <img src="../../../images/cheminTraverse.png" alt="logo chemin de traverse" className="logo_accueil" />
                </a>
                :
                <img src="../../../images/cheminTraverse.png" alt="logo chemin de traverse" className="logo_accueil" />
            }
            <h1 className="titre_accueil">Bienvenue sur le <br /><span className="span_accueil">Bingo de traverse!</span></h1>

            {(!isLogged) ?
                <>
                    <div>
                        <p className="explication_accueil">
                            Seuls les <b>gamemasters</b> du
                            <b> Chemin de traverse</b> à <b>Arras </b>
                            sont autorisés à accéder au jeu. <br />
                            Si vous cherchez le <b> site</b> de l'escape game,
                            cliquez sur le <b> logo</b>.
                        </p>
                    </div>

                    <div>
                        <Bouton style={{ width: '160px', height: '3em', backgroundColor: 'var(--blue-pastel)', marginTop: '40px', border: '2px solid var(--blue-pastel)' }} text="Connexion" onClick={toConnexion} />
                        <p className="p_accueil">Pas encore inscrit ? C'est par <Link to="/inscription" className="lien_accueil">ici</Link></p>
                    </div>
                </>
                :
                <div className="classementContainer">
                    {/* Affichage du classement */}
                    <h2 className="h2_accueil">Classement :</h2>
                    <table className="table_accueil">
                        <thead>
                            <tr>
                                <th>Rang</th>
                                <th>Pseudo</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rang.map((user, index) => (
                                <tr key={index} className={index === 0 && user.points > 0 ? "first-place" : ""}>
                                    <td >{index + 1}</td>
                                    <td>{user.pseudo}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </>
    )
}

export default Accueil;
