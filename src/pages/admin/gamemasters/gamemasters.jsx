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

    const fetchGamemasters = async () => {
        getGamemasters()
            .then(res => res.json())
            .then(dataGamemasters => setGamemasters(dataGamemasters.data))
    }

    const confirmDeleteGamemaster = async (GamemasterId) => {
        deleteGamemaster(GamemasterId)
        setShowModal(false);
        setSelectedGamemaster(null);
        fetchGamemasters();
    }

    const addGamemaster = async () => {
            postGamemaster(newGamemaster)
            fetchGamemasters();
            setNewGamemaster("");
    }

    const handleDeleteClick = (gamemaster) => {
        setSelectedGamemaster(gamemaster);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedGamemaster(null);
        setShowModal(false);
    }

    useEffect(() => { fetchGamemasters() }, [gamemasters]);

    return (
        <>

            <div>
                <h2>Ajouter un gamemaster</h2>
                <input
                    className="gamemasterInput"
                    placeholder="Email du gamemaster"
                    type="text"
                    value={newGamemaster}
                    onChange={(e) => setNewGamemaster(e.target.value)}
                />
                <Bouton text="Ajouter" style={{ marginBottom: "20px", width: "100px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={addGamemaster} />
            </div>

            <h1>Liste des gamemasters</h1>

            <Bouton text="Actualiser" style={{ marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={fetchGamemasters} />

            <div className="gamemastersListe">
                {gamemasters && gamemasters.map((gamemaster) => (
                    <div className="gamemasterAG" key={gamemaster.id}>
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
                        <Bouton style={{ width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="oui" onClick={() => confirmDeleteGamemaster(selectedGamemaster.id)} />
                        <Bouton style={{ width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="non" onClick={handleCancelDelete} />

                    </div>
                </div>
            )}
        </>
    );
}
