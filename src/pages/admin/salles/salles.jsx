import React, { useState, useEffect } from "react";
import './salles.css';
import { baseUrl } from "../../../services/serviceAppel";
import Bouton from "../../../components/boutons/bouton";

export default function Salles() {
    // state pour la liste des salles
    const [salles, setSalle] = useState([]);
    // state pour l'ajout d'une nouvelle salle
    const [newSalleName, setNewSalleName] = useState("");
    // state pour le modal
    const [showModal, setShowModal] = useState(false);
    // state pour la selection de la salle à supprimer
    const [selectedSalle, setSelectedSalle] = useState(null);

    const fetchData = async () => {
        const response = await fetch(baseUrl + '/salles');
        const dataSalle = await response.json();
        setSalle(dataSalle.data);
    }

    const confirmDeleteSalle = async (salleId) => {
        await fetch(baseUrl + `/salles/${salleId}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        setSelectedSalle(null);
        fetchData();
    }

    const addSalle = async () => {
        if (newSalleName) {
        
        const response = await fetch(baseUrl + '/salles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newSalleName
            }),
        });
        if (response.ok) {
            fetchData();
            setNewSalleName("");
        } else {
            console.error('Erreur lors de l\'ajout de la salle');
        }
    }
    }

    const handleDeleteClick = (salle) => {
        setSelectedSalle(salle);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedSalle(null);
        setShowModal(false);
    }

    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>Liste des salles</h1>

            <Bouton text="Actualiser" onClick={fetchData} />

            <div className="sallesListe">
                {salles && salles.map((salle) => (
                    <li key={salle.id}>
                        <Bouton style={{ marginRight: '10px' }} text="X" onClick={() => handleDeleteClick(salle)} />
                        {salle.name}
                    </li>
                ))}
            </div>

            <div>
                <h2>Ajouter une salle</h2>
                <input
                    className="salleInput"
                    placeholder="Nom de la salle"
                    type="text"
                    value={newSalleName}
                    onChange={(e) => setNewSalleName(e.target.value)}
                />
                <Bouton text="Ajouter" onClick={addSalle} />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer la salle {selectedSalle.name} ?</p>
                        <Bouton style={{width: "60px"}} text="Oui" onClick={() => confirmDeleteSalle(selectedSalle.id)} />
                        <Bouton style={{width: "60px"}} text="Non" onClick={handleCancelDelete} />
                    </div>
                </div>
            )}
        </>
    );
}
