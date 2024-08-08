import './grille.css';
import React, { useState, useEffect } from 'react';

export default function Grille() {
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [caseGrille, setCaseGrille] = useState([]);
    const [valideCases, setValideCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
    const [lancementPartie, setLancementPartie] = useState(false);
    const [grilleId, setGrilleId] = useState(null);

    const userId = 2; // Remplacer par l'ID réel de l'utilisateur

    useEffect(() => {
        fetchGrille();
    }, []);

    const fetchGrille = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/grilles/user/${userId}`);
            console.log(response.ok)
            if (response.ok) {
                setLancementPartie(true);

                // Changer la suite pour recuperer direct en BDD et non dans l'api:
                
                const dataGrille = await response.json();
                const { grille } = dataGrille.data;
                setGrilleId(grille.id);
                const selectedPhraseIds = grille.case.map(c => c.phraseId);
                setCaseGrille(selectedPhraseIds);
                setValideCases(grille.validatedCases);
                const responsePhrases = await fetch('http://localhost:3000/api/phrases');
                const dataPhrases = await responsePhrases.json();
                const selectedPhrases = dataPhrases.data.filter(p => selectedPhraseIds.includes(p.id)).sort((a, b) => a.id - b.id);
                setSelectedPhrases(selectedPhrases);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération ou de la création de la grille :", error);
        }
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

    const confirmValidation = async () => {
        const updatedCaseId = caseGrille[selectedCaseIndex]
    if (grilleId === null) {
        console.error('ID de la grille non défini');
        return;
    }

    const updatedValidatedCases = [...valideCases];
    updatedValidatedCases[selectedCaseIndex] = true; // Mettre à jour le tableau des cases validées

    try {
        const response = await fetch(`http://localhost:3000/api/grilles/${grilleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({phraseId: updatedCaseId, validatedCases: updatedValidatedCases }) // Envoyer le tableau des cases validées
        });

        if (response.ok) {
            const data = await response.json();
            setValideCases(data.data.validatedCases);
        } else {
            console.error('Erreur lors de la validation de la case');
        }
    } catch (error) {
        console.error('Erreur de connexion:', error);
    }

    closeModal();
}

    const confirmLancementPartie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/grilles/user/${userId}`, { method: 'POST' });
            if (response.ok) {
                const dataGrille = await response.json();
                const { grille, selectedPhrases } = dataGrille.data;
                setGrilleId(grille.id);
                const selectedPhraseIds = grille.case.map(c => c.phraseId);
                setCaseGrille(selectedPhraseIds);
                setValideCases(grille.validatedCases);
                setSelectedPhrases(selectedPhrases.sort((a, b) => a.id - b.id));
                setLancementPartie(true);
            } else {
                console.error('Erreur lors du lancement de la partie');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération ou de la création de la grille :", error);
        }
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
                <h2 className='lancementPartieH2'>Veux-tu lancer la partie ?</h2>
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
                        key={index}
                        className={valideCases[index] ? 'caseGrille valide' : 'caseGrille'}
                        onClick={() => openModal(index)}>
                            {caseNumber}
                        </div>
                    )}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>Voulez-vous vraiment valider la phrase :</p>
                                <p style={{fontWeight: 'bold'}}>"{selectedPhrases.find(p => p.id === caseGrille[selectedCaseIndex]).text}"</p>
                                <button className='buttonValidation' onClick={confirmValidation}>Oui</button>
                                <button className='buttonValidation' onClick={closeModal}>Non</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            }
        </>
    );
}
