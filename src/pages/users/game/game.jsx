import './game.css';
import React, { useState, useEffect } from 'react';
import Bouton from '../../../components/boutons/bouton';
import { baseUrl } from '../../../services/serviceAppel';

export default function Game() {
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [caseGrille, setCaseGrille] = useState([]);
    const [valideCases, setValideCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
    const [lancementPartie, setLancementPartie] = useState(false);
    const [grilleId, setGrilleId] = useState(null);
    const [finPartie, setFinPartie] = useState(false);

    // ID en brut du user pour les tests
    const userId = 2; 

    useEffect(() => {
        fetchGrille();
    }, []);

    // Récupération de la grille dans la BDD
    const fetchGrille = async () => {
        try {
            const response = await fetch(baseUrl + `/grilles/user/${userId}`);
            if (response.ok) {
                setLancementPartie(true);
                const dataGrille = await response.json();                
                const grille = dataGrille.data;
                setGrilleId(grille.id);
                const selectedPhraseIds = grille.case.map(c => c.phraseId);
                setCaseGrille(selectedPhraseIds);
                setValideCases(grille.validatedCases);

                const responsePhrases = await fetch(baseUrl + '/phrases');
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

    // Validation de la case
    const confirmValidation = async () => {
        const updatedCaseId = caseGrille[selectedCaseIndex];
        if (grilleId === null) {
            console.error('ID de la grille non défini');
            return;
        }

        // Mise à jour de tableau des cases validées
        const updatedValidatedCases = [...valideCases];
        updatedValidatedCases[selectedCaseIndex] = true; 

        try {
            const response = await fetch(baseUrl + `/grilles/${grilleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Envoie du tableau des cases validées
                body: JSON.stringify({phraseId: updatedCaseId, validatedCases: updatedValidatedCases }) 
            });

            if (response.ok) {
                const data = await response.json();
                setValideCases(data.data.validatedCases);

                if (data.data.finished) {
                    setFinPartie(true);
                }

            } else {
                console.error('Erreur lors de la validation de la case');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }

        closeModal();
    }

    // Lancement de la partie
    const confirmLancementPartie = async () => {
        window.location.reload();
        try {
            const response = await fetch(baseUrl + `/grilles/user/${userId}`, { method: 'POST' });
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
                    <Bouton text="Oui" onClick={confirmLancementPartie}/>
                </div>
            </div> :
            
            <div>
            {!finPartie ? 
                <>
                <div className='listePhrase'>
                    {selectedPhrases.map((phrase) => (
                        <div key={phrase.id}>
                            <p 
                            id={phrase.id} 
                            onClick={() => handlePhraseClick(phrase.id)}
                            className={valideCases[caseGrille.indexOf(phrase.id)] ? 'selectedPhrase' : ''}>
                                {phrase.id} - {phrase.text} 
                            </p>
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
                    
                </div> </>:
                <div className='finPartie'>
                    <h2 className='finPartieH2'> BINGO !!! </h2>
                    <div className='finPartieP'>
                        <p> <b>Bien joué bidule</b> </p>
                        <p>Tu as devancé tout tes collegues et tu as gagné !</p>
                        <p>HAHA tu a le droit de te la péter..</p>
                        <p>Mais attention, n'abuse pas trop de ta victoire !</p>
                    </div>
                    <div className='rejouer'>
                        <p><b>Si tu veux les défier à nouveau, c'est par ici :</b></p>
                        <Bouton text="Rejouer" onClick={confirmLancementPartie}/>
                    </div>
                </div>
                }
                
            </div>
            
            
            }
        </>
    );
}
