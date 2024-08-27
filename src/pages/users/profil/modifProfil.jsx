import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './modifProfil.css';
import { baseUrl } from "../../../services/serviceAppel";
import OpenModalProfil from "../../../components/profil/openModal";
import FormData from "../../../components/profil/formData";
import RetourProfil from "../../../components/profil/retourProfil";
import Bouton from "../../../components/boutons/bouton";
import { recuperationId } from '../../../services/Auth';
import { recuperationItem } from "../../../services/localStorage";

const ModifProfil = () => {
    const id = useParams();
    const [profil, setProfil] = useState([]);
    const [openModalLastName, setOpenModalLastName] = useState(false);
    const [openModalFirstName, setOpenModalFirstName] = useState(false);
    const [openModalPseudo, setOpenModalPseudo] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [errorPassword, setErrorPassword] = useState('');

    const uid = recuperationId();
    const token = recuperationItem('jetonUtilisateur');

    useEffect(() => {
        setCredentials({ email: profil.email })
    }, [profil]);

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
    }, [id, openModalLastName, openModalFirstName, openModalPseudo]);

    const onChange = (event) => setProfil({ ...profil, [event.target.name]: event.target.value })

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

    if (id.id == uid) {
        return (
            /* Formulaire d'affichage du profil */
            <div className="profil">
                <RetourProfil />
                <h1>Modification des infos</h1>

                <form id="formProfil" className="formProfil">
                    <FormData id="lastname" name="Nom" setEtat={setOpenModalLastName} value={profil.lastname} />
                    <FormData id="firstname" name="Prénom" setEtat={setOpenModalFirstName} value={profil.firstname} />
                    <FormData id="pseudo" name="Pseudo" setEtat={setOpenModalPseudo} value={profil.pseudo} />
                    <div className="divModifPassword">
                        <p className="labelModif">Mot de passe :</p>
                        <img src="/images/modification.png"
                            alt="icone de modification"
                            className="modification"
                            onClick={() => setOpenModalPassword(true)}
                        />
                    </div>
                </form>


                {/* Modal de modification du nom */}
                {openModalLastName &&
                    <OpenModalProfil id="lastname" name="Nom" type="text" uid={id.id} defaultValue={profil.lastname} setEtat={setOpenModalLastName} majProfil={fetchProfil} />}

                {/* Modal de modification du prenom */}
                {openModalFirstName &&
                    <OpenModalProfil id="firstname" name="Prénom" type="text" uid={id.id} defaultValue={profil.firstname} setEtat={setOpenModalFirstName} majProfil={fetchProfil} />}

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
                                <div className="modalModif">
                                    <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto' }} />
                                    <Bouton type="submit" text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto' }} onClick={() => setOpenModalPassword(false)} />
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        )
    }
    else {
        window.location = `/modification-profil/${uid}`;
    }
}

export default ModifProfil