import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './profil.css';

const Profile = () => {
    const id = useParams();
    const [profil, setProfil] = useState([]);
    const [openModalModif, setOpenModalModif] = useState(false);

    const fetchProfil = async (id) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const dataProfil = await response.json();
        setProfil(dataProfil.data);
    }

    useEffect(() => {
        fetchProfil(id.id)
    }, [id]);

    const onChange = (event) => setProfil({ ...profil, [event.target.name]: event.target.value })

    const onSubmitModifProfile = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:3000/api/users/${id.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profil)
        });
        fetchProfil(id.id);
        setOpenModalModif(false);
    }

    return (
        <div className="profil">
            <h1>Profil</h1>
            <form id="formProfil" className="formProfil">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={profil.email} />
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" defaultValue={profil.lastname} />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" defaultValue={profil.firstname} />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" defaultValue={profil.pseudo} />
                { (profil.Salles && profil.Salles.length>0) ? <h3>Salles associées :</h3> : <p>Aucune salle associée</p>}
                <ul>
                    {profil.Salles && profil.Salles.map(salle =>
                        <li key={salle.id} className="salleList">{salle.name}</li>)}
                </ul>
            </form>

            <button onClick={() => setOpenModalModif(true)}>Modifier</button>

            {openModalModif ? 
                <form id="formProfilModif" onSubmit={onSubmitModifProfile}  className="formProfilModif">
                <h2>Modifier les informations</h2>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" defaultValue={profil.email} onChange={onChange} />
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" defaultValue={profil.lastname} onChange={onChange} />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" defaultValue={profil.firstname} onChange={onChange} />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" defaultValue={profil.pseudo} onChange={onChange} />
                <label htmlFor="password">Mot de passe</label>
                <input type="text" id="password" name="password" defaultValue="" autoComplete="off" onChange={onChange} />
                <input type="submit" id="submit" value="Valider" />
                </form>
                : null}


        </div>
    )
}

export default Profile