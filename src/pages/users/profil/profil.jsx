import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './profil.css';

const Profile = (props) => {
    const id = useParams();
    const [profil, setProfil] = useState([]);

    const fetchProfil = async (id) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const dataProfil = await response.json();
        setProfil(dataProfil.data);
    }

    useEffect(() => {
        fetchProfil(id.id);
    }, [id])

    const onChange = (event) => setProfil({ ...profil, [event.target.name]: event.target.value }) 


    return (
        <div className="profil">
            <h1>Profil</h1>
            <form className="formProfil">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={profil.email}  onChange={onChange}/>
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" value={profil.lastname} onChange={onChange} />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" value={profil.firstname} onChange={onChange}/>
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" value={profil.pseudo} onChange={onChange} />
            </form>

        </div>
    )
}

export default Profile