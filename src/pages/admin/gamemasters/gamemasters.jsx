import React, { useState, useEffect } from "react";
import './gamemasters.css';
import { baseUrl } from "../../../services/serviceAppel";

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
        const response = await fetch(`${baseUrl}/gamemasters`);
        const dataGamemasters = await response.json();
        setGamemasters(dataGamemasters.data);
    }

    const confirmDeleteGamemaster = async (GamemasterId) => {
        await fetch(`${baseUrl}/gamemasters/${GamemasterId}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        setSelectedGamemaster(null);
        fetchGamemasters();
    }

    const addGamemaster = async () => {
        if (newGamemaster) {
        
        const response = await fetch(`${baseUrl}/gamemasters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: newGamemaster
            }),
        });
        if (response.ok) {
            fetchGamemasters();
            setNewGamemaster("");
        } else {
            console.error('Erreur lors de l\'ajout du gamemaster');
        }
    }
    }

    const handleDeleteClick = (gamemaster) => {
        setSelectedGamemaster(gamemaster);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedGamemaster(null);
        setShowModal(false);
    }

    useEffect(() => { fetchGamemasters() }, []);

    return (
        <>
            <h1>Liste des gamemasters</h1>

            <button className="actualiser" onClick={fetchGamemasters}>Actualiser</button>

            <div className="sallesListe">
                {gamemasters && gamemasters.map((gamemaster) => (
                    <li key={gamemaster.id}>
                        <button className="deleteSalle" onClick={() => handleDeleteClick(gamemaster)}>X</button>
                        {gamemaster.email}
                    </li>
                ))}
            </div>

            <div>
                <h2>Ajouter un gamemaster</h2>
                <input
                    className="salleInput"
                    placeholder="Nom du gamemaster"
                    type="text"
                    value={newGamemaster}
                    onChange={(e) => setNewGamemaster(e.target.value)}
                />
                <button className="salleButton" type="submit" onClick={addGamemaster}>Ajouter</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer le gamemaster {selectedGamemaster.email} ?</p>
                        <button className="choixSuppression" onClick={() => confirmDeleteGamemaster(selectedGamemaster.id)}>Oui</button>
                        <button className="choixSuppression" onClick={handleCancelDelete}>Non</button>
                    </div>
                </div>
            )}
        </>
    );
}
