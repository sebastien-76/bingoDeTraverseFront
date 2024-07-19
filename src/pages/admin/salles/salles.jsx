import React, { useState, useEffect } from "react";
import './salles.css';

export default function Salles() {
    const [salles, setSalle] = useState([]);
    const [newSalleName, setNewSalleName] = useState(""); // Utiliser un état pour le nom de la nouvelle salle

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/salles');
        const dataSalle = await response.json();
        setSalle(dataSalle.data);
    }

    const deleteSalle = async (salleId) => {
        await fetch(`http://localhost:3000/api/salles/${salleId}`, {
            method: 'DELETE',
        });
        fetchData();
    }

    const addSalle = async () => {
        await fetch('http://localhost:3000/api/salles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajout de l'en-tête Content-Type
            },
            body: JSON.stringify({
                name: newSalleName // Utilisation de l'état pour obtenir la valeur
            }),
        });
        fetchData();
        setNewSalleName(""); // Réinitialiser l'input après l'ajout
    }

    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>Liste des salles</h1>

            <button onClick={fetchData}>Actualiser</button>

            <div className="sallesListe">
                {salles.map((salle) => (
                    <li key={salle.id}>
                        <button className="deleteSalle" onClick={() => deleteSalle(salle.id)}>X</button>
                        {salle.name}
                    </li>
                ))}
            </div>

            <div>
                <h2>Ajouter une salle</h2>
                <input
                    placeholder="Nom de la salle"
                    type="text"
                    value={newSalleName} // Lier l'input à l'état
                    onChange={(e) => setNewSalleName(e.target.value)} // Mettre à jour l'état lors de la modification de l'input
                />
                <button type="submit" onClick={addSalle}>Ajouter</button>
            </div>
        </>
    );
}
