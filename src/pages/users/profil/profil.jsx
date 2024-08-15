import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from '../../../services/serviceAppel';
import Bouton from '../../../components/boutons/bouton';

const Profil = () => {
    const id = useParams();

    const navigate = useNavigate();

    const [profil, setProfil] = useState([]);

    const fetchUser = async (id) => {
        const response = await fetch(`${baseUrl}/users/${id}`);
        const dataUser = await response.json();
        setProfil(dataUser.data);
    }

    useEffect(() => {
        setProfil(fetchUser(id.id));
    }, [id]);

    const dateDebut = new Date(profil.createdAt);
    const salles = profil.Salles

    const onClickModifProfil = () => {
        navigate (`/modification-profil/${id.id}`);
    }


    return (
        <>
            <h1>Profil</h1>

            <p> Email : {profil.email}</p>
            <p> Pseudo :  {profil.pseudo}</p>
            <p> Bingo(s) gagné(s) : {profil.points}</p>
            <p> Joue depuis le : {dateDebut.toLocaleDateString('fr-FR')}</p>
            <p> Salles : </p>
            <ul>
                {salles && salles.map((salle) => (
                    <li key={salle.id} className='salleList'>{salle.name}</li>
                ))}
            </ul>

            <Bouton onClick={onClickModifProfil} text="Modifier mon profil" />


        </>
    )
}

export default Profil