import React, { useState, useEffect } from "react";
import './salles.css';


export default function Salles() {
    const [salles, setSalle] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/salles');
        const dataSalle = await response.json();
        setSalle(dataSalle.data);
    }
    

    const deleteSalle = async (salleId) => {
        const response = await fetch(`http://localhost:3000/api/salles/${salleId}`, {
            method: 'DELETE',
        });
        fetchData();
    }

    const addSalle = async () => {
        const response = await fetch('http://localhost:3000/api/salles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: document.getElementById('salleAjouter').value }),
        });
        const dataSalle = await response.json();
        setSalle(dataSalle.data);
    }

    useEffect(() => {fetchData()}, []);
    
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
        <input placeholder="Nom de la salle" id="salleAjouter" type="text" />
        <button type="submit" onClick={addSalle}>Ajouter</button>

      </div>
    </>
  );
}