import React, { useState } from 'react'
import './openModal.css'
import { baseUrl } from '../../services/serviceAppel';
import Bouton from '../boutons/bouton';
import { recuperationItem } from '../../services/localStorage';

const OpenModalProfil = ({ id, name, type, uid, defaultValue, setEtat, majProfil }) => {

    const [profil, setProfil] = useState({});
    const token = recuperationItem('jetonUtilisateur');

    const onSubmitModifProfile = async (event) => {
        event.preventDefault();
        await fetch(`${baseUrl}/users/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profil)
        });
        setEtat(false);
    }

    const onChange = (event) => {
        setProfil({ ...profil, [event.target.name]: event.target.value })
    }

    return (
        <div className='modal'> 
            <form onSubmit={onSubmitModifProfile} className="modal-content">

                <h2>Modifier le <span>{name}</span></h2>
                <input className='inputModifInfo' type={type} name={id} id={id} defaultValue={defaultValue} onChange={onChange} />
                <div className="modalModif">
                    <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', fontWeight: 'bold', margin: '1em auto', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} />
                    <Bouton type="submit" onClick={() => setEtat(false)} text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto', backgroundColor: 'var(--purple-pastel)', border: '1px solid var(--purple-pastel)' }} />
                </div>

            </form>
        </div>
    )
}

export default OpenModalProfil