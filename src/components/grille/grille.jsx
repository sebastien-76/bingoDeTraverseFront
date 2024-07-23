
import './grille.css';
import React, { useState } from 'react';

export default function Grille() {

    let caseGrille = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25];
    
    
    const [valideCases, setValideCases] = useState(Array(caseGrille.length).fill(false));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
    const [lancementPartie, setLancementPartie] = useState(false);

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
    }
    
    return (
        <>
            {!lancementPartie ? 
            <div className='lancementPartie'>
                <h2 className='lancementPartieH2'>Veut tu lancer la partie ?</h2>
                <div className="choixLancementPartie">
                    <button onClick={confirmLancementPartie} className='buttonValidation'>Oui</button>
                </div>
            </div>:
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
                            <p>Voulez-vous vraiment valider la case {caseGrille[selectedCaseIndex]} ?</p>
                            <button className='buttonValidation' onClick={confirmValidation}>Oui</button>
                            <button className='buttonValidation' onClick={closeModal}>Non</button>
                        </div>
                    </div>
                )}
            </div>
            }
        </>
    )
}