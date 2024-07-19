import React, { useState, useEffect } from "react";
import './phrases.css';

export default function Phrases() {
    const [phrases, setPhrase] = useState([]);
    // Utiliser un état pour le nom de la nouvelle phrase
    const [newPhraseText, setNewPhraseText] = useState("");
    // state pour le modal
    const [showModal, setShowModal] = useState(false);
    // state pour la selection de la phrase à supprimer
    const [selectedPhrase, setSelectedPhrase] = useState(null);

        const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/phrases');
        const dataPhrase = await response.json();
        setPhrase(dataPhrase.data);
    }

    const confirmDeletePhrase = async (phraseId) => {
        await fetch(`http://localhost:3000/api/phrases/${phraseId}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        setSelectedPhrase(null);
        fetchData();
    }

    const deletePhrase = async (PhraseId) => {
        await fetch(`http://localhost:3000/api/phrases/${PhraseId}`, {
            method: 'DELETE',
        });
        fetchData();
    }

    const addPhrase = async () => {
        await fetch('http://localhost:3000/api/phrases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newPhraseText
            }),
        });
        fetchData();
        // Réinitialiser l'input après l'ajout
        setNewPhraseText("");
    }

    const handleDeleteClick = (phrase) => {
        setSelectedPhrase(phrase);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedPhrase(null);
        setShowModal(false);
    }

    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>Liste des phrases</h1>

            <button onClick={fetchData}>Actualiser</button>

            <div className="phrasesListe">
                {phrases && phrases.map((phrase) => (
                    <li key={phrase.id}>
                        <button className="deletePhrase" onClick={() => handleDeleteClick(phrase)}>X</button>
                        {phrase.text}
                    </li>
                ))}
            </div>

            <div>
                <h2>Ajouter une phrase</h2>
                <input
                    placeholder="Texte de la phrase"
                    type="text"
                    value={newPhraseText}
                    onChange={(e) => setNewPhraseText(e.target.value)}
                />
                <button type="submit" onClick={addPhrase}>Ajouter</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer la salle {selectedPhrase.text} ?</p>
                        <button className="choixSuppression" onClick={() => confirmDeletePhrase(selectedPhrase.id)}>Oui</button>
                        <button className="choixSuppression" onClick={handleCancelDelete}>Non</button>
                    </div>
                </div>
            )}
        </>
    );
}
