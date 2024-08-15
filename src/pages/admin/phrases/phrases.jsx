import React, { useState, useEffect } from "react";
import './phrases.css';
import {baseUrl} from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';

export default function Phrases() {
    const [phrases, setPhrase] = useState([]);
    // Utiliser un état pour le nom de la nouvelle phrase
    const [newPhraseText, setNewPhraseText] = useState("");
    // state pour le modal
    const [showModal, setShowModal] = useState(false);
    // state pour la selection de la phrase à supprimer
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    // state pour la liste des salles
    const [salles, setSalles] = useState([]);
    // state pour l'association de la salle à la phrase
    const [SalleId, setSalleId] = useState(null);
    //
    const [visibilite, setVisibilite] = useState("invisible");


    const fetchPhrases = async () => {
        const response = await fetch(baseUrl + '/phrases');
        const dataPhrase = await response.json();
        setPhrase(dataPhrase.data);
    }

    const fetchSalles = async () => {
        const response = await fetch(baseUrl + '/salles');
        const dataSalles = await response.json();
        setSalles(dataSalles.data);
    }


    const confirmDeletePhrase = async (phraseId) => {
        await fetch(baseUrl + `/phrases/${phraseId}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        setSelectedPhrase(null);
        fetchPhrases();
    }

    const addPhraseValidee = async () => {
        await fetch(baseUrl + '/phrases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newPhraseText,
                SalleId: SalleId
            }),
        })
        // Recharger les phrases
        fetchPhrases();
        // Réinitialiser l'input après l'ajout
        setNewPhraseText("");
        setVisibilite("invisible");
    }

    const addPhrase = () => {
       (newPhraseText && SalleId) ? addPhraseValidee() : setVisibilite("visible");
    }



    const handleDeleteClick = (phrase) => {
        setSelectedPhrase(phrase);
        setShowModal(true);
    }

    const handleCancelDelete = () => {
        setSelectedPhrase(null);
        setShowModal(false);
    }

    useEffect(() => {
        fetchPhrases();
        fetchSalles();
    }, []);


    return (
        <>
            <h1>Liste des phrases</h1>

            <Bouton text="Actualiser" onClick={fetchPhrases}/>

            <div className="phrasesListe">
                {phrases && phrases.map((phrase) => (
                    <li key={phrase.id}>
                        <Bouton style={{marginRight: "10px", width: "35px"}} text="X" onClick={() => handleDeleteClick(phrase)}/>
                        {phrase.text} - Salle associée : {phrase.SalleId}
                    </li>
                ))}
            </div>
            <div>
                <h2>Ajouter une phrase</h2>
                <p className={visibilite}>Veuillez entrer une phrase et une salle!</p>
                <input
                    placeholder="Texte de la phrase"
                    type="text"
                    value={newPhraseText}
                    onChange={(e) => setNewPhraseText(e.target.value)}
                />
                <div className="salle">
                    {salles.map((salle) =>
                        <div key={salle.id} className="listeSalle">
                            <input
                                type="radio"
                                name="salle"
                                value={salle.id}
                                onChange={(e) => setSalleId(e.target.value)}
                            />
                            <label>{salle.id} - {salle.name}</label>
                        </div>
                    )}
                </div>
                <Bouton style={{marginBlock: "20px", width: "100px"}} text="Ajouter" onClick={addPhrase} />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer la salle {selectedPhrase.text} ?</p>
                        <Bouton style={{width: "60px"}} text="oui" onClick={() => confirmDeletePhrase(selectedPhrase.id)} />
                        <Bouton style={{width: "60px"}} text="non" onClick={handleCancelDelete} />
                    </div>
                </div>
            )}
        </>
    );
}
