import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './profile.css';

const Profile = (props) => {
    const id = useParams();
    const [profile, setProfile] = useState([]);

    const fetchProfile = async (id) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const dataProfile = await response.json();
        setProfile(dataProfile.data);
    }

    useEffect(() => {
        fetchProfile(id.id);
    }, [id])

    console.log(profile)

    return (
        <div>
            <h1>Profil</h1>
            <form className="formProfile">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={profile.email} readOnly />
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" value={profile.lastname} readOnly />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" value={profile.firstname} readOnly />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" value={profile.pseudo} readOnly />
            </form>

        </div>
    )
}

export default Profile