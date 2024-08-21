import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';
import { recuperationId } from '../../../services/Auth';
import './profil.css';
import RetourProfil from '../../../components/profil/retourProfil';

const Profil = () => {
    const id = useParams();
    const uid = recuperationId();

    const navigate = useNavigate();

    const [profil, setProfil] = useState([]);
    const [salles, setSalles] = useState([]);
    const [sallesUser, setSallesUser] = useState([]);
    const [listeSallesAjout, setListeSallesAjout] = useState([]);
    const [sallesAAjouter, setSallesAAjouter] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    //Récupération du user
    const fetchUser = async (id) => {
        fetch(`${baseUrl}/users/${id}`)
            .then(response => response.json())
            .then(data => setProfil(data.data))
    }

    //Récupération des salles
    const fetchSalles = () => {
        fetch(`${baseUrl}/salles`)
            .then(response => response.json())
            .then(data => setSalles(data.data))
    }

    //Mise à jour du user en fonction de l'id
    useEffect(() => {
        fetchUser(id.id);
    }, [sallesAAjouter]);


    useEffect(() => {
        fetchSalles();
        setSallesUser(profil.Salles);
    }, [profil]);

    const dateDebut = new Date(profil.createdAt);


    useEffect(() => {
        setListeSallesAjout(salles.filter(salle => sallesUser.every(salleUser => salleUser.id !== salle.id)));
    }, [salles, sallesUser]);



    //Navigation vers la page de modification du profil
    const onClickModifProfil = () => {
        navigate(`/modification-profil/${id.id}`);
    }

    //Mise à jour des salles
    const onChangeSalle = (event) => {
        setIsOpenModal(true);
    }

    const onAjoutSalles = () => {
        fetch(`${baseUrl}/users/${id.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Salles: [...sallesAAjouter]
            }),
        });
        setIsOpenModal(false);
        setSallesAAjouter([]);
    }

    const retourProfil = () => {
        setIsOpenModal(false);
    }

    const onCheckSalles = (event) => {
        if (event.target.checked) {
            setSallesAAjouter([...sallesAAjouter, ...event.target.id]);
        }
    }


    if (id.id == uid) {
        return (
            <>
                <h1>Profil</h1>
                <p className='infos'> Email :</p>
                <p className='donnees'> {profil.email}</p>
                <p className='infos'> Nom :</p>
                <p className='donnees'> {profil.lastname}</p>
                <p className='infos'> Prénom :</p>
                <p className='donnees'> {profil.firstname}</p>
                <p className='infos'> Pseudo :</p>
                <p className='donnees'>  {profil.pseudo}</p>
                <p className='infos'> Bingo(s) gagné(s) :</p>
                <p className='donnees'> {profil.points}</p>
                <p className='infos'> Joue depuis le :</p>
                <p className='donnees'> {dateDebut.toLocaleDateString('fr-FR')}</p>
                <Bouton onClick={onClickModifProfil} text="Modifier mes infos" style={{ margin: '1em 0 1.5em 0' }} />
                <p className='infos'> Salles :</p>
                <ul>
                    {sallesUser && sallesUser.map((salle) => (
                        <li key={salle.id} className='salleList'>{salle.name}</li>
                    ))}
                </ul>
                <Bouton onClick={onChangeSalle} text="Ajouter une salle" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.7em' }} />

                {isOpenModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="retour_profil" onClick={retourProfil}>Retour au profil</p>
                            <h2>Salles à ajouter</h2>
                            <ul>
                                {listeSallesAjout.map((salle) => (
                                    <li key={salle.id} className='salleList'>
                                        <input type="checkbox" id={salle.id} onChange={onCheckSalles} />{salle.name}
                                    </li>
                                ))}
                            </ul>
                            <Bouton onClick={onAjoutSalles} text="Valider" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.7em' }} />
                        </div>
                    </div>
                )}
            </>
        )
    } else {
        window.location = `/profil/${uid}`;
    }
}
export default Profil