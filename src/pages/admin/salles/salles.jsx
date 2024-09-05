import React, { useState, useEffect } from "react";
import './salles.css';
import { getSalles, deleteSalle, postSalle } from "../../../services/serviceAppel";
import Bouton from "../../../components/boutons/bouton";

export default function Salles() {
    // state pour la liste des salles
    const [salles, setSalles] = useState([]);
    // state pour l'ajout d'une nouvelle salle
    const [newSalleName, setNewSalleName] = useState("");
    // state pour le modal
    const [showModal, setShowModal] = useState(false);
    // state pour la selection de la salle à supprimer
    const [selectedSalle, setSelectedSalle] = useState(null);

    const [visibilite, setVisibilite] = useState("invisible");

    const fetchData = async () => {
        getSalles()
            .then(res => res.json())
            .then(dataSalle => {
                //filtrer dans les salles pour ne pas avoir la salle 1
                const filteredSalles = dataSalle.data.filter(salle => salle.id !== 1);
                setSalles(filteredSalles);
            });
    }

    const confirmDeleteSalle = async (salleId) => {
        try {
            deleteSalle(salleId)
                .then(() => fetchData())
            setShowModal(false);
            setSelectedSalle(null);
            fetchData();
        }
        catch (error) {
            console.error(error);
        }
    }

    const addSalleValidee = () => {
        try {
            postSalle(newSalleName)
                .then(() => fetchData());
            setNewSalleName("");
        }
        catch (error) {
            console.error(error);
        }
    }

    const addSalle = () => {
        newSalleName ? addSalleValidee() : setVisibilite("visible");
    }

    const handleDeleteClick = (salle) => {
        setSelectedSalle(salle);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedSalle(null);
        setShowModal(false);
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <div className="addSalle">
                <h2 className="pageAdminH2">Ajouter une salle</h2>
                <p className={visibilite}>Veuillez entrer un nom de salle!</p>
                <input
                    className="pageInput"
                    placeholder="Nom de la salle"
                    type="text"
                    value={newSalleName}
                    onChange={(e) => setNewSalleName(e.target.value)}
                />
                <Bouton text="Ajouter" style={{ height: '3em', marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={addSalle} />
            </div>

            <h1 className="pageAdminH1">Liste des salles</h1>

            <div className="sallesListeAS">
                {salles && salles.map((salle) => (
                    <div className="listeAG" key={salle.id}>
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
                        <Bouton style={{height: "3em", width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="oui" onClick={() => confirmDeleteSalle(selectedSalle.id)} />
                        <Bouton style={{height: "3em", width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="non" onClick={handleCancelDelete} />
                    </div>
                </div>
            )}
        </>
    );
}
