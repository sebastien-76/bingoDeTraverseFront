import React, { useState, useEffect, useMemo } from 'react';
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
    const [sallesAFiltrer, setSallesAFiltrer] = useState([]);
    const [sallesAAjouter, setSallesAAjouter] = useState([]);


    const fetchUser = async (id) => {
        const response = await fetch(`${baseUrl}/users/${id}`);
        const dataUser = await response.json();
        setProfil(dataUser.data);
    }
    
    const sallesUser = profil.Salles

    const fetchSalles = async () => {
        const response = await fetch(`${baseUrl}/salles`);
        const dataSalles = await response.json();
        setSalles(dataSalles.data);
    }

    useEffect(() => {
        setProfil(fetchUser(id.id));
    }, [id]);

    const dateDebut = new Date(profil.createdAt);



    const onClickModifProfil = () => {
        navigate(`/modification-profil/${id.id}`);
    }
    const onChangeSalle = (event) => {
    }


    if (id.id == uid) {
        return (
            <>
                <h1>Profil</h1>
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
            </>
        )
    } else {
        window.location = `/profil/${uid}`;
    }
}
export default Profil