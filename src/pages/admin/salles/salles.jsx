import React, { useState, useEffect } from "react";
import './salles.css';


export default function Salles() {
    const [salles, setSalle] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/salles');
        const dataSalle = await response.json();
        setSalle(dataSalle.data);
    }
    useEffect(() => {fetchData()}, []);
    
  return (
    <>
      <h1>Salles</h1>

      <div className="sallesListe">
      {salles.map((salle) => (
          <li key={salle.id}>
          {salle.name}
        </li>
      ))}
      </div>
    </>
  );
}