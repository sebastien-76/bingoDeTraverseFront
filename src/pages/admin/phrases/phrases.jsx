import React, { useState, useEffect } from "react";
import './phrases.css';
import { getPhrases, getSalles, deletePhrase, postPhrase } from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';
import FlecheScroll from '../../../components/flecheScroll/flecheScroll';

export default function Phrases() {
    const [phrases, setPhrase] = useState([]);
    const [newPhraseText, setNewPhraseText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [salles, setSalles] = useState([]);
    const [SalleId, setSalleId] = useState(null);
    const [visibilite, setVisibilite] = useState("invisible");


    const fetchPhrases = () => {
        getPhrases()
            .then(res => res.json())
            .then(dataPhrase => setPhrase(dataPhrase.data))
    }

    const fetchSalles = () => {
        getSalles()
            .then(res => res.json())
            .then(dataSalles => setSalles(dataSalles.data))
    }

    const confirmDeletePhrase = (phraseId) => {
        deletePhrase(phraseId)
        setShowModal(false);
        setSelectedPhrase(null);
    }

    const addPhraseValidee = (newPhraseText, SalleId) => {
        postPhrase(newPhraseText, SalleId);
        setNewPhraseText("");
        setVisibilite("invisible");
        document.getElementById("inputSalle").checked = false;
    }

    const addPhrase = () => {
        (newPhraseText && SalleId) ? addPhraseValidee(newPhraseText, SalleId) : setVisibilite("visible");
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
    }, [newPhraseText]);

    useEffect(() => {
        fetchSalles();
    }, [])

    // Grouping phrases by salle
    const groupedPhrases = salles.map(salle => ({
        salle,
        phrases: phrases.filter(phrase => phrase.SalleId === salle.id)
    }));

    return (
        <>
            <FlecheScroll />

            <div className="addPhrase">
                <h2>Ajouter une phrase</h2>
                <p className={visibilite}>Veuillez entrer une phrase et une salle!</p>
                <input
                    className="inputPhrase"
                    placeholder="Texte de la phrase"
                    type="text"
                    value={newPhraseText}
                    onChange={(e) => setNewPhraseText(e.target.value)}
                />
                <div className="salle">
                    {salles.map((salle) => (
                        <div key={salle.id} className="listeSalle">
                            <label>{salle.id} - {salle.name}</label>
                            <input
                                type="radio"
                                name="salle"
                                id="inputSalle"
                                value={salle.id}
                                onChange={(e) => setSalleId(e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <Bouton style={{ marginBottom: "20px", width: "100px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} text="Ajouter" onClick={addPhrase} />
            </div>
            <h1>Liste des phrases</h1>

            <Bouton text="Actualiser" style={{ marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={fetchPhrases} />

            {/* ancre avec le nom des salles */}
            <div className="sallesListeAP">
                {salles.map(salle => (
                    <a className="salleAncre" key={salle.id} href={`#${salle.name}`}>{salle.name}</a>
                ))}
            </div>

            {/* Liste des phrases groupées par salle */}
            <div className="phrasesListe">
                {groupedPhrases.map(({ salle, phrases }) => (
                    <div key={salle.id}>
                        <h2 className="salleNom" id={salle.name}>{salle.name}</h2>
                        {phrases.map(phrase => (
                            <div key={phrase.id} className="phraseContainer">
                                <div className="phraseSalle">
                                    <p>{phrase.text}</p>
                                </div>
                                <img src="../../../../images/supprimer.png" className="poubelle" alt="supprimer" onClick={() => handleDeleteClick(phrase)} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer la phrase {selectedPhrase.text} ?</p>
                        <Bouton style={{ width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="oui" onClick={() => confirmDeletePhrase(selectedPhrase.id)} />
                        <Bouton style={{ width: "70px", backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} text="non" onClick={handleCancelDelete} />
                    </div>
                </div>
            )}
        </>
    );
}
