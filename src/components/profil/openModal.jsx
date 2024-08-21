import React, { useState } from 'react'
import './openModal.css'
import { baseUrl } from '../../services/serviceAppel';
import Bouton from '../boutons/bouton';

const OpenModalProfil = ({ id, name, type, uid, defaultValue, setEtat, majProfil }) => {

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
        <div className='modal'>
            <form onSubmit={onSubmitModifProfile} className="modal-content">

                <h2>Modifier le <span>{name}</span></h2>
                {/*  <label htmlFor={id}> {name} : </label> */}
                <input type={type} name={id} id={id} defaultValue={defaultValue} onChange={onChange} />
                <div className="modalModif">
                    <Bouton type="submit" text="Modifier" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto' }} />
                    <Bouton type="submit" onClick={() => setEtat(false)} text="Annuler" style={{ height: '3em', width: "6em", fontSize: '0.8em', margin: '1em auto' }} />
                </div>

            </form>
        </div>
    )
}

export default OpenModalProfil