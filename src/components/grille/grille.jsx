import './grille.css';
import React, { useState, useEffect } from 'react';

export default function Grille() {
    const [listePhrase, setListePhrase] = useState([]);
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [caseGrille, setCaseGrille] = useState([]);
    const [valideCases, setValideCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
    const [lancementPartie, setLancementPartie] = useState(false);

    useEffect(() => {
        fetchListePhrase();
    }, []);

    const fetchListePhrase = async () => {
        const response = await fetch('http://localhost:3000/api/phrases');
        const dataPhrase = await response.json();
        setListePhrase(dataPhrase.data);
    }

    const generateListePhraseId = () => {
        // Générer une liste aléatoire de 25 phrases
        let shuffledPhrases = [...listePhrase].sort(() => Math.random() - 0.5).slice(0, 25);
        // Trier les phrases par ordre croissant d'ID pour l'affichage
        shuffledPhrases.sort((a, b) => a.id - b.id);
        setSelectedPhrases(shuffledPhrases);
        // Extraire les IDs
        let ids = shuffledPhrases.map(phrase => phrase.id);
        // Mélanger les IDs pour la grille
        let shuffledIds = ids.sort(() => Math.random() - 0.5);
        setCaseGrille(shuffledIds);
        setValideCases(Array(25).fill(false));
    }

    const openModal = (index) => {
        if (!valideCases[index]) {
            setSelectedCaseIndex(index);
            setIsModalOpen(true);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCaseIndex(null);
    }

    const confirmValidation = () => {
        const newValideCases = [...valideCases];
        if (selectedCaseIndex !== null) {
            newValideCases[selectedCaseIndex] = true;
            setValideCases(newValideCases);
        }
        closeModal();
    }

    const confirmLancementPartie = () => {
        setLancementPartie(true);
        generateListePhraseId();
    }

    const handlePhraseClick = (phraseId) => {
        const index = caseGrille.indexOf(phraseId);
        if (index !== -1) {
            openModal(index);
        }
    }

    return (
        <>
            {!lancementPartie ? 
            <div className='lancementPartie'>
                <h2 className='lancementPartieH2'>Veux tu lancer la partie ?</h2>
                <div className="choixLancementPartie">
                    <button onClick={confirmLancementPartie} className='buttonValidation'>Oui</button>
                </div>
            </div> :
            <div>
                <div className='listePhrase'>
                    {selectedPhrases.map((phrase) => (
                        <div key={phrase.id} className='phraseItem'>
                            <p onClick={() => handlePhraseClick(phrase.id)}>{phrase.id} - {phrase.text}</p>
                        </div>
                    ))}
                </div>
                <div className='grille'>
                    {caseGrille.map((caseNumber, index) => 
                        <div
                        key={caseNumber}
                        className={valideCases[index] ? 'caseGrille valide' : 'caseGrille'}
                        onClick={() => openModal(index)}>
                            {caseNumber}
                        </div>
                    )}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>Voulez-vous vraiment valider la phrase : </p>
                                <p style={{fontWeight: 'bold'}}>"{listePhrase[caseGrille[selectedCaseIndex] - 1].text}"</p>
                                <button className='buttonValidation' onClick={confirmValidation}>Oui</button>
                                <button className='buttonValidation' onClick={closeModal}>Non</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            }
        </>
    )
}
