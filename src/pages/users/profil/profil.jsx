import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';
import { recuperationId } from '../../../services/Auth';
import './profil.css';


const Profil = () => {
    const id = useParams();
    const uid = recuperationId();

    const navigate = useNavigate();

    const [profil, setProfil] = useState([]);
    const [salles, setSalles] = useState([]);
    const [sallesUser, setSallesUser] = useState([]);
    const [listeSallesAjout, setListeSallesAjout] = useState([]);
    const [sallesAAjouter, setSallesAAjouter] = useState([]);
    const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false);
    const [isOpenModalSalles, setIsOpenModalSalles] = useState(false);

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
    }, [id.id, sallesAAjouter]);


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

    const onChangeAvatar = () => {
        setIsOpenModalAvatar(true);
    }

    const ajoutAvatar = () => {
        const fileImput = document.getElementById('avatar');
        const avatar = fileImput.files[0];
        const formData = new FormData();
        formData.append('avatar', avatar);

        fetch(`${baseUrl}/users/${id.id}`, {
            method: 'PUT',
            body: formData
        })
        setIsOpenModalAvatar(false);
    }

    //Mise à jour des salles
    const onChangeSalle = (event) => {
        setIsOpenModalSalles(true);
    }

    const ajoutSalles = () => {
        fetch(`${baseUrl}/users/${id.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Salles: [...sallesAAjouter]
            }),
        });
        setIsOpenModalSalles(false);
        setSallesAAjouter([]);
    }

    const retourProfil = () => {
        setIsOpenModalSalles(false);
        setIsOpenModalAvatar(false);
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
                <div className='imageProfil'>
                    <img src={profil.imageProfilURL} alt="Avatar" className='avatar' onClick={onChangeAvatar} />
                </div>

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

                {isOpenModalAvatar && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="retour_profil" onClick={retourProfil}>Retour au profil</p>
                            <h2>Modifier mon avatar</h2>
                            <input type="file" id="avatar" name="avatar" />
                            <Bouton onClick={ajoutAvatar} text="Ajouter" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.7em' }} />
                        </div>
                    </div>
                )
                }

                {isOpenModalSalles && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="retour_profil" onClick={retourProfil}>Retour au profil</p>
                            <h2>Salles à ajouter</h2>
                            <ul>
                                {listeSallesAjout && listeSallesAjout.map((salle) => (
                                    <li key={salle.id} className='salleList'>
                                        <input type="checkbox" id={salle.id} onChange={onCheckSalles} />{salle.name}
                                    </li>
                                ))}
                            </ul>
                            <Bouton onClick={ajoutSalles} text="Valider" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.7em' }} />
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