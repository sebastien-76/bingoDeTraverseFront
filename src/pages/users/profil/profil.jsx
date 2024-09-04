import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Bouton from '../../../components/boutons/bouton';
import { recuperationId } from '../../../services/Auth';
import './profil.css';
import { recuperationItem } from '../../../services/localStorage';
import { getUser, getSalles, putUser } from '../../../services/serviceAppel';
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


    const fetchUser = (id) => {
        getUser(id)
            .then(response => response.json())
            .then(data => setProfil(data.data))
    }

    useEffect(() => {
        fetchUser(id.id)
    }, [id, openModalPseudo, sallesAAjouter, isOpenModalAvatar]);


    //Mise à jour de l'état de changement du password
    const onChangePassword = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    //Fonction de mise à jour du password dans le profil
    const onSubmitNewPassword = (event) => {
        event.preventDefault();
        console.log(credentials)
        if (credentials.password === credentials.confirmationPassword) {
            const params = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            }

            try {
                putUser(uid, params)
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
        getSalles()
            .then(response => response.json())
            .then(data => setSalles(data.data))
    }

    useEffect(() => {
        fetchSalles();
        setSallesUser(profil.Salles);
    }, [profil]);

    //Mise en forme de la date de début pour l'affichage dans le profil
    const dateDebut = new Date(profil.createdAt);

    //Liste des salles à ajouter
    useEffect(() => {
        const ajoutSalleData = salles.filter(salle => sallesUser.every(salleUser => salleUser.id !== salle.id))
        setListeSallesAjout(ajoutSalleData);
    }, [sallesUser]);

    //Ouverture de la modale de modification de la photo de profil
    const onChangeAvatar = () => {
        setIsOpenModalAvatar(true);
    }

    //Fonction d'ajout de la photo de profil
    const ajoutAvatar = () => {
        const fileImput = document.getElementById('avatar');
        const avatar = fileImput.files[0];
        const formData = new FormData();
        formData.append('avatar', avatar);
        const params = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }

        try {
            putUser(id.id, params)
            setIsOpenModalAvatar(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    //Mise à jour des salles
    const onChangeSalle = (event) => {
        setIsOpenModalSalles(true);
    }

    //Fonction d'ajout des salles au profil
    const ajoutSalles = () => {
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Salles: [...sallesAAjouter]
            }),
        }

        try {
            putUser(id.id, params)
            setIsOpenModalSalles(false);
            setSallesAAjouter([]);
        }
        catch (error) {
            console.error(error);
        }
    }

    //Fonction de retour au profil
    const retourProfil = () => {
        setIsOpenModalSalles(false);
        setIsOpenModalAvatar(false);
    }

    //Fonction de mise à jour des salles à ajouter au profil
    const onCheckSalles = (event) => {
        if (event.target.checked) {
            setSallesAAjouter([...sallesAAjouter, ...event.target.id]);
        }
    }

    if (id.id == uid) {
        return (
            <>
                <h1 className='titreProfil'>Profil</h1>
                <div>
                    {profil.imageProfilURL === null ?
                        <Bouton style={{ height: '3em', width: "17em", fontSize: '0.9em', margin: '1em auto', backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={onChangeAvatar} text="Ajouter votre image de profil" />
                        :
                        <div>
                            <img src={profil.imageProfilURL} alt="Avatar" className='avatar' onClick={onChangeAvatar} />
                            <Bouton style={{ height: '3em', width: "17em", fontSize: '0.9em', margin: '1em auto', backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} onClick={onChangeAvatar} text="Modifier votre image de profil" />
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
                    <OpenModalProfil id="pseudo" name="Pseudo" type="text" uid={id.id} defaultValue={profil.pseudo} setEtat={setOpenModalPseudo} majProfil={fetchUser} />
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
                                    <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} />
                                    <Bouton type="submit" text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} onClick={() => setOpenModalPassword(false)} />
                                </div>
                            </form>
                        </div>
                    )
                }
                <Bouton onClick={() => setOpenModalPassword(true)} text="Modifier mon mot de passe" style={{ marginBottom: "20px", marginTop: "20px", width: "200px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)", fontSize: '0.9em' }} />

                <div className='salles'>
                    <p className='titreSalles'> Salles apprises :</p>
                    <div className='salleListProfil'>
                        {/* Afficher les salles de l'utilisateur sauf la salle 1 */}
                        {sallesUser && sallesUser.map((salle) => (
                            salle.id !== 1 &&
                            <p key={salle.id} className='salleList'>{salle.name}</p>
                        ))}
                    </div>
                </div>
                <Bouton onClick={onChangeSalle} text="Ajouter une salle" style={{ height: '3em', width: '10em', margin: '0.5em auto', fontSize: '0.9em', backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} />

                {isOpenModalAvatar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Modifier mon avatar</h2>
                            <input className='inputAvatar' type="file" id="avatar" name="avatar" />

                            <div className="boutonModifAvatar">
                                <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} onClick={ajoutAvatar} />
                                <Bouton type="submit" text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} onClick={retourProfil} />
                            </div>
                        </div>
                    </div>
                )
                }

                {isOpenModalSalles && (
                    <div className="modal">
                        <div className="modal-contentSalle">
                            <h2>Salles à ajouter</h2>
                            <ul className='salleUl'>
                                {listeSallesAjout && listeSallesAjout.map((salle) => (
                                    <li key={salle.id} className='salleListModal'>
                                        <input type="checkbox" id={salle.id} onChange={onCheckSalles} />{salle.name}
                                    </li>
                                ))}
                            </ul>

                            <div className="boutonModifSalle">
                                <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} onClick={ajoutSalles} />
                                <Bouton type="submit" text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: "var(--purple-pastel)", border: "1px solid var(--purple-pastel)" }} onClick={retourProfil} />
                            </div>
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