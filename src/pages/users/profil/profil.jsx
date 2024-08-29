import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { baseUrl } from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';
import { recuperationId } from '../../../services/Auth';
import './profil.css';
import { sauvegardeItem, recuperationItem } from '../../../services/localStorage';
import OpenModalProfil from "../../../components/profil/openModal";

const Profil = () => {
    const id = useParams();
    const uid = recuperationId();
    const token = recuperationItem('jetonUtilisateur');

    const [profil, setProfil] = useState([]);
    const [salles, setSalles] = useState([]);
    const [sallesUser, setSallesUser] = useState([]);
    const [listeSallesAjout, setListeSallesAjout] = useState([]);
    const [sallesAAjouter, setSallesAAjouter] = useState([]);
    const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false);
    const [isOpenModalSalles, setIsOpenModalSalles] = useState(false);
    const [openModalPseudo, setOpenModalPseudo] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');

    const [credentials, setCredentials] = useState({
        password: '',
    })

    //Récupération du user
    const fetchUser = async (id) => {
        fetch(`${baseUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setProfil(data.data))
    }

    const fetchProfil = async (id) => {
        const response = await fetch(`${baseUrl}/users/${id}`, {
             method: 'GET',
             headers: {
                 'Authorization': `Bearer ${token}`
             }});
        const dataProfil = await response.json();
        setProfil(dataProfil.data);
    }

    useEffect(() => {
        fetchProfil(id.id)
        profil.imageProfilURL && sauvegardeItem('imageProfil', profil.imageProfilURL)
    }, [id, openModalPseudo]);

    const onChangePassword = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const onSubmitNewPassword = async (event) => {
        event.preventDefault();
        console.log(credentials)
        if (credentials.password === credentials.confirmationPassword) {
            try {
                
                await fetch(`${baseUrl}/users/${uid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });
                setOpenModalPassword(false);
                setErrorPassword('');
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            setErrorPassword('Les mots de passe sont différents, veuillez recommencer');
        }
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
            headers: {
                'Authorization': `Bearer ${token}`
            },
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
                <div>
                {profil.imageProfilURL === null ? 
                <Bouton style={{ height: '3em', width: "17em", fontSize: '0.9em', margin: '1em auto', backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)" }} onClick={onChangeAvatar} text="Ajouter votre image de profil"/>
                :
                <div>
                    <img src={profil.imageProfilURL} alt="Avatar" className='avatar' onClick={onChangeAvatar} />
                    <Bouton style={{ height: '3em', width: "17em", fontSize: '0.9em', margin: '1em auto', backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)" }} onClick={onChangeAvatar} text="Modifier votre image de profil"/>
                </div>
                }
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
                    <div className='infosDiv pseudo'>
                        <div className='pseudoDiv'>
                            <p className='infos'> Pseudo :</p>
                            <img 
                                src="/images/modification.png"
                                alt="icone de modification"
                                className="modification"
                                onClick={setOpenModalPseudo}
                            />
                        </div>
                        <p className='donnees pseudoDonnees'>{profil.pseudo}</p>
                    </div>
                    <div className='infosDiv date'>
                        <p className='infos'> Joue depuis le :</p>
                        <p className='donnees dateDonnees'> {dateDebut.toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>

                {/* Modal de modification du pseudo */}
                {openModalPseudo &&
                    <OpenModalProfil id="pseudo" name="Pseudo" type="text" uid={id.id} defaultValue={profil.pseudo} setEtat={setOpenModalPseudo} majProfil={fetchProfil} />
                }

        {/* Modal de modification du mot de passe */}
        {openModalPassword &&
                    (
                        <div className='modal'>
                            <form onSubmit={onSubmitNewPassword} className="modal-content">
                                <h2>Modifier le mot de passe</h2>
                                {errorPassword && <p className="errorPassword">{errorPassword}</p>}
                                <div className="infosPassword">
                                    <label>Nouveau mot de passe :</label>
                                    <input type="password" id="password" name="password" onChange={onChangePassword} autoComplete="off" />
                                    <label>Confirmer le nouveau mot de passe:</label>
                                    <input type="password" id="confirmationPassword" name="confirmationPassword" onChange={onChangePassword} autoComplete="off" />
                                </div>
                                <div className="boutonModifPassword">
                                    <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border :"1px solid var(--purple-pastel)" }} />
                                    <Bouton type="submit" text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border :"1px solid var(--purple-pastel)" }} onClick={() => setOpenModalPassword(false)} />
                                </div>
                            </form>
                        </div>
                    )
                }

                
                <Bouton onClick={() => setOpenModalPassword(true)} text="Modifier mon mot de passe" style={{marginBottom: "20px", marginTop: "20px", width: "200px", backgroundColor: "var(--blue-pastel)", border :"1px solid var(--blue-pastel)", fontSize: '0.9em'}} />
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
                        <div className="modal-contentSalle">
                            <p className="retour_profil" onClick={retourProfil}>
                                <img src="../../../../images/flecheGauche.png" alt="" />  
                                Retour au profil
                            </p>
                            <h2>Salles à ajouter</h2>
                            <ul className='salleUl'>
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