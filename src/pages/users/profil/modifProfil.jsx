import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './modifProfil.css';
import { baseUrl } from "../../../services/serviceAppel";
import OpenModal from "../../../components/profil/openModal";
import FormData from "../../../components/profil/formData";
import RetourProfil from "../../../components/profil/retourProfil";
import { recuperationId } from '../../../services/Auth';

const ModifProfil = () => {
    const id = useParams();
    const [profil, setProfil] = useState([]);
    const [openModalModif, setOpenModalModif] = useState(false);
    const [openModalEmail, setOpenModalEmail] = useState(false);
    const [openModalLastName, setOpenModalLastName] = useState(false);
    const [openModalFirstName, setOpenModalFirstName] = useState(false);
    const [openModalPseudo, setOpenModalPseudo] = useState(false);
    const uid = recuperationId();

    const fetchProfil = async (id) => {
        const response = await fetch(`${baseUrl}/users/${id}`);
        const dataProfil = await response.json();
        setProfil(dataProfil.data);
    }

    useEffect(() => {
        fetchProfil(id.id)
    }, [id, openModalEmail, openModalLastName, openModalFirstName, openModalPseudo]);

    const onChange = (event) => setProfil({ ...profil, [event.target.name]: event.target.value })

    const onSubmitModifProfile = async (event) => {
        event.preventDefault();
        await fetch(`${baseUrl}/users/${id.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profil)
        });
        fetchProfil(id.id);
        setOpenModalModif(false);
    }

    if (id.id == uid) {
    return (
        /* Formulaire d'affichage du profil */
        <div className="profil">
            <RetourProfil />
            <h1>Modification du profil</h1>
            <form id="formProfil" className="formProfil">
            <FormData id="lastname" name="Nom" setEtat={setOpenModalLastName} value={profil.lastname} />
            <FormData id="firstname" name="Prénom" setEtat={setOpenModalFirstName} value={profil.firstname} />
            <FormData id="pseudo" name="Pseudo" setEtat={setOpenModalPseudo} value={profil.pseudo} />
            </form>

            <button onClick={() => setOpenModalModif(true)}>Modifier</button>

            {/* Modal de modification du mail */}
            {openModalEmail ?
                <OpenModal id="email" name="Email" type="email" uid={id.id} defaultValue={profil.email} setEtat={setOpenModalEmail} /> :
                null
            }

            {/* Modal de modification du nom */}
            {openModalLastName ?
                <OpenModal id="lastname" name="Nom" type="text" uid={id.id} defaultValue={profil.lastname} setEtat={setOpenModalLastName} majProfil={fetchProfil} /> :
                null
            }

            {/* Modal de modification du prenom */}
            {openModalFirstName ?
                <OpenModal id="firstname" name="Prénom" type="text" uid={id.id} defaultValue={profil.firstname} setEtat={setOpenModalFirstName} majProfil={fetchProfil} /> :
                null
            }

            {/* Modal de modification du pseudo */}
            {openModalPseudo ?
                <OpenModal id="pseudo" name="Pseudo" type="text" uid={id.id} defaultValue={profil.pseudo} setEtat={setOpenModalPseudo} majProfil={fetchProfil} /> :
                null
            }
        </div>
    ) }
    else {
        window.location = `/modification-profil/${uid}`;
    }
}

export default ModifProfil