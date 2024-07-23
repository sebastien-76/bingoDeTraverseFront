import React, { useState, useEffect } from 'react';
import './inscription.css';

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmationPassword: '',
        lastname: '',
        firstname: '',
        pseudo: '',
        salles: [],
    })

    const [salles, setSalles] = useState([]);

    const fetchSalles = async () => {
        const response = await fetch('http://localhost:3000/api/salles');
        const dataSalles = await response.json();
        setSalles(dataSalles.data);
    }

    useEffect(() => {
        fetchSalles();
    }, [])

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const onChangeSalle = (event) => {
        event.target.checked ?
            setCredentials({ ...credentials, salles: [...credentials.salles, event.target.value] }) :
            setCredentials({ ...credentials, salles: credentials.salles.filter(salle => salle !== event.target.value) })

    }

    const handleSubmitInscription = async (event) => {
        event.preventDefault();
        console.log(credentials);
        await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                lastname: credentials.lastname,
                firstname: credentials.firstname,
                pseudo: credentials.pseudo,
                salles: credentials.salles
            }),
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setCredentials({
            email: '',
            password: '',
            confirmationPassword: '',
            lastname: '',
            firstname: '',
            pseudo: '',
            salles: [],
        })
        document.getElementById("formInscription").reset()

    }
    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmitInscription} id="formInscription" className='inscriptionForm'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} placeholder="Entrez votre email" className='inputInscription' />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Entrez votre mot de passe" autoComplete="off" className='inputInscription' />
                <label htmlFor="password">Vérification du mot de passe</label>
                <input type="password" name="confirmationPassword" id="confirmationPassword" value={credentials.confirmationPassword} onChange={onChange} autoComplete="off" placeholder="Entrez à nouveau votre mot de passe" className='inputInscription' />
                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" id="lastname" placeholder="Entrez votre nom" value={credentials.lastname} onChange={onChange} className='inputInscription' />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" name="firstname" id="firstname" placeholder="Entrez votre prénom" value={credentials.firstname} onChange={onChange} className='inputInscription' />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" placeholder="Entrez votre pseudo" value={credentials.pseudo} onChange={onChange} className='inputInscription' />
                <div className='salles'>
                    <legend className='legendInscription'>Salle où vous êtes formé(e)</legend>
                    {salles.map((salle) => (
                        <div key={salle.id}>
                            <input type="checkbox" name="salle" id={salle.id} value={salle.id} onChange={onChangeSalle} />
                            <label htmlFor={salle.id}>{salle.name}</label>
                        </div>
                    ))}
                </div>
                <input type="submit" value="S'inscrire" className='submitInscription' />
            </form>
        </>
    )
}

export default SignUp