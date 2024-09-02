import './game.css';
import React, { useState, useEffect } from 'react';
import Bouton from '../../../components/boutons/bouton';
import { baseUrl } from '../../../services/serviceAppel';
import { recuperationId } from '../../../services/Auth';
import FlecheScroll from '../../../components/flecheScroll/flecheScroll';
import FinPartie from '../../../components/FinPartie/FinPartie';
import { recuperationItem } from '../../../services/localStorage';

export default function Game() {
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [caseGrille, setCaseGrille] = useState([]);
    const [valideCases, setValideCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
    const [lancementPartie, setLancementPartie] = useState(false);
    const [grilleId, setGrilleId] = useState(null);
    const [finPartie, setFinPartie] = useState(false);

    const [nomSallesUser, setNomSallesUser] = useState([]);
    const [groupedPhrases, setGroupedPhrases] = useState({});

    // ID de l'utilisateur
    const userId = recuperationId();

    //Récupération du token jwt
    const token = recuperationItem('jetonUtilisateur');

    useEffect(() => {
        fetchGrille();


    }, []);

    // Récupération de la grille dans la BDD
    const fetchGrille = async () => {
        try {
            const response = await fetch(baseUrl + `/grilles/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
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

                // Récupération des noms des salles
                const sallesIds = selectedPhrases.map((phrase) => phrase.SalleId);
                const sallesUser = sallesIds.filter((salleId, index) => sallesIds.indexOf(salleId) === index);

                const sallesResponse = await fetch(baseUrl + '/salles');
                const dataSalles = await sallesResponse.json();
                const sallesNom = dataSalles.data.filter(salle => sallesUser.includes(salle.id));
                setNomSallesUser(sallesNom);

                // Grouper les phrases par salle
                const grouped = sallesNom.reduce((salleObject, salle) => {
                    salleObject[salle.name] = selectedPhrases.filter(phrase => phrase.SalleId === salle.id);
                    return salleObject;
                }, {});

                setGroupedPhrases(grouped);
                
            }
        } catch (error) {
            console.error("Erreur lors de la récupération ou de la création de la grille :", error);
        }
    };


    const openModal = (index) => {
        if (!valideCases[index]) {
            setSelectedCaseIndex(index);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCaseIndex(null);
    };

    // verification de fin de partie
    const checkBingo = async () => {
        try {
        const response = await fetch(baseUrl + `/grilles/${grilleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // Envoie du tableau des cases validées
            body: JSON.stringify({ phraseId: null, validatedCases: valideCases })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.data.finished) {
                setFinPartie(true);
                window.scrollTo({ top: 0 });
            }
        }

        } catch (error) {
            console.error("Erreur lors de la verification du bingo :", error);
        }
    };
    

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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Envoie du tableau des cases validées
                body: JSON.stringify({ phraseId: updatedCaseId, validatedCases: updatedValidatedCases })
            });

            if (response.ok) {
                const data = await response.json();
                setValideCases(data.data.validatedCases);

                if (data.data.finished) {
                    setFinPartie(true);
                    window.scrollTo({ top: 0 });
                }

            } else {
                console.error('Erreur lors de la validation de la case');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }

        closeModal();
    };

    // Lancement de la partie
    const confirmLancementPartie = async () => {
        window.location.reload();
        try {
            const response = await fetch(baseUrl + `/grilles/user/${userId}`, {
                method: 'POST',
                'Authorization': `Bearer ${token}`
            });
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
    };

    const handlePhraseClick = (phraseId) => {
        const index = caseGrille.indexOf(phraseId);
        if (index !== -1) {
            openModal(index);
        }
    };

    return (
        <>
            {!lancementPartie ? 
            <div className='lancementPartie'>
                <h2 className="h2_regles">Explication du jeu :</h2>
                <p className="explication_regles">
                    <ul>
                        <li className="li_accueil">Les phrases utilisées dans la grille sont en fonction des salles apprises.</li>
                        <li className="li_accueil">Chaque grille est générée aléatoirement.</li>
                        <li className="li_accueil">Quand quelqu'un gagne, toutes les grilles en cours se terminent.</li>
                        <li className="li_accueil">Lors d'un Bingo, vous gagnez un point.</li>
                        <li className="li_accueil">Le classement sera affiché dans l'accueil.</li>
                    </ul>
                </p>
                <div className="choixLancementPartie">
                    <Bouton style={{width: '200px', backgroundColor: 'var(--blue-pastel)', border: '2px solid var(--blue-pastel)'}} text="Lancer la partie" onClick={confirmLancementPartie}/>
                </div>
            </div> :
            
            <div>
            {!finPartie ? 
                <>
                {/* ajout d'une fleche en bas a droite de l'ecran pour aller vers le haut */}
                <FlecheScroll />

                <div className="checkBingoContainer">
                    <Bouton 
                        style={{width: '150px', backgroundColor: 'var(--blue-pastel)', border: '2px solid var(--blue-pastel)'}} 
                        text="Vérifier Bingo" 
                        onClick={checkBingo} 
                    />
                </div>

                            <div className='listeSalles'>
                                {nomSallesUser.map((salle) => (
                                    <a key={salle.name} href={`#${salle.name}`}><p key={salle.id}>{salle.name}</p>
                                    </a>
                                ))}
                            </div>

                            {/* Liste des phrases groupées par salle */}
                            <div className='listePhrase'>
                                {Object.keys(groupedPhrases).map((salleName) => (
                                    <div key={salleName} >
                                        <h3 className='salleNomGame' id={salleName}>{salleName}</h3>
                                        {groupedPhrases[salleName].map((phrase) => (
                                            <p
                                                key={phrase.id}
                                                id={phrase.id}
                                                onClick={() => handlePhraseClick(phrase.id)}
                                                className={valideCases[caseGrille.indexOf(phrase.id)] ? 'selectedPhrase' : ''}>
                                                {phrase.id} - {phrase.text}
                                            </p>
                                        ))}
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
                                            <p style={{ fontWeight: 'bold' }}>"{selectedPhrases.find(p => p.id === caseGrille[selectedCaseIndex]).text}"</p>
                                            <Bouton style={{ width: '80px', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} text="Oui" onClick={confirmValidation} />
                                            <Bouton style={{ width: '80px', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} text="Non" onClick={closeModal} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </> :
                        <div className='finPartie'>
                            <h2 className='finPartieH2'> BINGO !!! </h2>
                            <FinPartie />
                            <div className='rejouer'>
                                <p><b>Si tu veux retenter ta chance :</b></p>
                                <Bouton style={{ width: '150px', marginTop: '10px', backgroundColor: 'var(--blue-pastel)', border: '2px solid var(--blue-pastel)' }} text="Rejouer" onClick={confirmLancementPartie} />
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
}
