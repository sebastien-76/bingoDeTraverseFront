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

        //filtrer dans les salles pour ne pas avoir la salle 1
        const filteredSalles = dataSalle.data.filter(salle => salle.id !== 1);

        setSalle(filteredSalles);
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

            <div>
                <h2>Ajouter une salle</h2>
                <input
                    className="salleInput"
                    placeholder="Nom de la salle"
                    type="text"
                    value={newSalleName}
                    onChange={(e) => setNewSalleName(e.target.value)}
                />
                <Bouton text="Ajouter" style={{marginBottom: "20px", width: "100px", backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)"}} onClick={addSalle} />
            </div>

            <h1>Liste des salles</h1>

            <Bouton text="Actualiser" style={{marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)"}} onClick={fetchData} />

            <div className="sallesListeAS">
                {salles && salles.map((salle) => (
                    <div className="sallesAS" key={salle.id}>
                        <p> {salle.name} </p>

                        <img src="../../../../images/supprimer.png" className="poubelle" alt="supprimer" onClick={() => handleDeleteClick(salle)} />
                        
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer la salle {selectedSalle.name} ?</p>
                        <Bouton style={{width: "70px", backgroundColor: "var(--purple-pastel)", border :"1px solid var(--purple-pastel)" }} text="oui" onClick={() => confirmDeleteSalle(selectedSalle.id)} />
                        <Bouton style={{width: "70px", backgroundColor: "var(--purple-pastel)", border :"1px solid var(--purple-pastel)"}} text="non" onClick={handleCancelDelete} />
                    </div>
                </div>
            )}
        </>
    );
}
