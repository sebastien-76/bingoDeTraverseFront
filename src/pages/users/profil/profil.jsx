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
    }, [id.id, sallesAAjouter, isOpenModalAvatar]);

    useEffect(() => {
        fetchSalles();
        setSallesUser(profil.Salles);
    }, [profil]);

    const dateDebut = new Date(profil.createdAt);

    useEffect(() => {
        const ajoutSalleData = salles.filter(salle => sallesUser.every(salleUser => salleUser.id !== salle.id))
        setListeSallesAjout(ajoutSalleData);
    }, [sallesUser]);

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

                <div className='infosProfil'>
                    <div className='infosDiv win'>
                        <p className='infos'> Bingo(s) gagné(s) :</p>
                        <p className='donnees point'> {profil.points}</p>
                    </div>
                    <div className='infosDiv email'>
                        <p className='infos'> Email :</p>
                        <p className='donnees'> {profil.email}</p>
                    </div>
                    <div className='infosDiv nom'>
                        <p className='infos'> Nom :</p>
                        <p className='donnees nomDonnees'> {profil.lastname}</p>
                    </div>
                    <div className='infosDiv prenom'>
                        <p className='infos'> Prénom :</p>
                        <p className='donnees prenomDonnees'> {profil.firstname}</p>
                    </div>
                    <div className='infosDiv pseudo'>
                        <p className='infos'> Pseudo :</p>
                        <p className='donnees pseudoDonnees'>  {profil.pseudo}</p>
                    </div>
                    <div className='infosDiv date'>
                        <p className='infos'> Joue depuis le :</p>
                        <p className='donnees dateDonnees'> {dateDebut.toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>
                


                <Bouton onClick={onClickModifProfil} text="Modifier mes infos" style={{marginBottom: "20px", marginTop: "20px", width: "200px", backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)"}} />
                <p className='titreSalles'> Salles :</p>
                <div className='salleListProfil'>
                    {sallesUser && sallesUser.map((salle) => (
                        <p key={salle.id} className='salleList'>{salle.name}</p>
                    ))}
                </div>
                <Bouton onClick={onChangeSalle} text="Ajouter une salle" style={{ height: '3em', width: '10em', margin: '0.5em auto', fontSize: '0.9em', backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)" }} />

                {isOpenModalAvatar && (
                    <div className="modal">
                        <div className="modal-content">
                        <p className="retour_profil" onClick={retourProfil}>
                            <img src="../../../../images/flecheGauche.png" alt="" />  
                            Retour au profil
                        </p>
                            <h2>Modifier mon avatar</h2>
                            <input className='inputAvatar' type="file" id="avatar" name="avatar" />
                            <Bouton onClick={ajoutAvatar} text="Ajouter" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.9em', backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)" }} />
                        </div>
                    </div>
                )
                }

                {isOpenModalSalles && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="retour_profil" onClick={retourProfil}>
                                <img src="../../../../images/flecheGauche.png" alt="" />  
                                Retour au profil
                            </p>
                            <h2>Salles à ajouter</h2>
                            <ul>
                                {listeSallesAjout && listeSallesAjout.map((salle) => (
                                    <li key={salle.id} className='salleListModal'>
                                        <input type="checkbox" id={salle.id} onChange={onCheckSalles} />{salle.name}
                                    </li>
                                ))}
                            </ul>
                            <Bouton onClick={ajoutSalles} text="Valider" style={{ height: '3em', width: '10em', margin: '0.2em auto', fontSize: '0.8em', backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)" }} />
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