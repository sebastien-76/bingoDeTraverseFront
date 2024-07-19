import React, { useState, useEffect } from "react";
import './phrases.css';

export default function Phrases() {
    const [phrases, setPhrase] = useState([]);
    const [newPhraseText, setNewPhraseText] = useState(""); // Utiliser un état pour le nom de la nouvelle salle

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/phrases');
        const dataPhrase = await response.json();
        console.log(dataPhrase.data);
        setPhrase(dataPhrase.data);
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

    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>Liste des phrases</h1>

            <button onClick={fetchData}>Actualiser</button>

            <div className="phrasesListe">
                {phrases.map((phrase) => (
                    <li key={phrase.id}>
                        <button className="deletePhrase" onClick={() => deletePhrase(phrase.id)}>X</button>
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
        </>
    );
}
