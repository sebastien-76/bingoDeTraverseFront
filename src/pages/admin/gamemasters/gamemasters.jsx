import React, { useState, useEffect } from "react";
import './gamemasters.css';
import { getGamemasters, deleteGamemaster, postGamemaster } from "../../../services/serviceAppel";
import Bouton from "../../../components/boutons/bouton";

export default function Gamemasters() {
    // state pour la liste des gamemasters
    const [gamemasters, setGamemasters] = useState([]);
    // state pour l'ajout d'un nouveau gamemaster
    const [newGamemaster, setNewGamemaster] = useState("");
    // state pour le modal
    const [showModal, setShowModal] = useState(false);
    // state pour la selection de la salle à supprimer
    const [selectedGamemaster, setSelectedGamemaster] = useState(null);

    const [visibilite, setVisibilite] = useState("invisible");

    const fetchGamemasters = async () => {
        getGamemasters()
            .then(res => res.json())
            .then(dataGamemasters => setGamemasters(dataGamemasters.data))
    }

    const confirmDeleteGamemaster = (GamemasterId) => {
        try {
            deleteGamemaster(GamemasterId)
                .then(() => fetchGamemasters());
            setShowModal(false);
            setSelectedGamemaster(null);
        }
        catch (error) {
            console.error(error)
        }
    }

    const addGamemasterValide = () => {
        try {
            postGamemaster(newGamemaster)
                .then(() => fetchGamemasters());
            setNewGamemaster("");
        }
        catch (error) {
            console.error(error)
        }
    }
    const addGamemaster = () => {
        newGamemaster ? addGamemasterValide() : setVisibilite("visible");
    }

    const handleDeleteClick = (gamemaster) => {
        setSelectedGamemaster(gamemaster);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedGamemaster(null);
        setShowModal(false);
    }

    useEffect(() => {
        fetchGamemasters()
    }, []);

    return (
        <>

            <div className="addGamemasters">
                <h2 className="pageAdminH2">Ajouter un gamemaster</h2>
                <p className={visibilite}>Veuillez entrer une phrase et une salle!</p>
                <input
                    className="pageInput"
                    placeholder="Email du gamemaster"
                    type="text"
                    value={newGamemaster}
                    onChange={(e) => setNewGamemaster(e.target.value)}
                />
                <Bouton text="Ajouter" style={{ height: '3em', marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={addGamemaster} />
            </div>

            <h1 className="pageAdminH1">Liste des gamemasters</h1>


            <div className="gamemastersListe">
                {gamemasters && gamemasters.map((gamemaster) => (
                    <div className="listeAG" key={gamemaster.id}>
                        {gamemaster.email}
                        <img src="../../../../images/supprimer.png" className="poubelle" alt="supprimer" onClick={() => handleDeleteClick(gamemaster)} />
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer le gamemaster {selectedGamemaster.email} ?</p>
                        <div className="modal-buttons">

                        <Bouton style={{height: "3em", width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="oui" onClick={() => confirmDeleteGamemaster(selectedGamemaster.id)} />
                        <Bouton style={{height: "3em", width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="non" onClick={handleCancelDelete} />
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
