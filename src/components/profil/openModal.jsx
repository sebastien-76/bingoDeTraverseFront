import React, { useState } from 'react'
import './openModal.css'
import { baseUrl } from '../../services/serviceAppel';
import Bouton from '../boutons/bouton';

const OpenModal = ({ id, name, type, uid, defaultValue, setEtat, majProfil }) => {

    const [profil, setProfil] = useState({});

    const onSubmitModifProfile = async (event) => {
        event.preventDefault();
        await fetch(`${baseUrl}/users/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profil)
        });
        setEtat(false);
    }

    const onChange = (event) => {
        setProfil({ ...profil, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={onSubmitModifProfile} className="formProfilModif">
            <h2>Modifier le profil</h2>
            <label htmlFor={id}>{name} : </label>
            <input type={type} name={id} id={id} defaultValue={defaultValue} onChange={onChange} />
            <div className="modalModif">
                <Bouton type="submit" onClick={() => setEtat(false)} text="Annuler" width="10%" />
                <Bouton type="submit" text="Modifier" width="10%" />
            </div>
        </form>
    )
}

export default OpenModal