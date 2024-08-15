import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css';
import { baseUrl } from '../../../services/serviceAppel';
import RetourAccueil from '../../../components/retourAccueil/retourAccueil';
import Bouton from '../../../components/boutons/bouton';

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        pseudo: '',
        password: '',
        confirmationPassword: '',
    })

    const [errorPwd, setErrorPwd] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const navigate = useNavigate();


    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmitInscription = async (event) => {
        event.preventDefault();
        setErrorPwd('');
        if (credentials.password === credentials.confirmationPassword) {
            try {
                await fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        pseudo: credentials.pseudo,
                        password: credentials.password,
                        }),
                })
                    .then(res => {
                        if (res.status === 403) {
                            res.json()
                                .then(res => setErrorEmail(res.message))
                        } else {
                            res.json()
                                .then(res => {
                                    const uid = res.data.id
                                    navigate(`/profil/${uid}`)
                                })
                        }
                    })
                    .catch(err => console.log(err));
                setCredentials({
                    email: '',
                    password: '',
                    pseudo: '',
                    confirmationPassword: '',
                })
                document.getElementById("formInscription").reset()
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setErrorPwd(`Les mots de passe ne sont pas identiques`);
        }
    }

    return (
        <>
            <RetourAccueil />
            <h1 className='h1Inscription'>Inscription</h1>
            {errorPwd && <p className='errorPwd'>{errorPwd}</p>}
            {errorEmail && <p className='errorEmail'>{errorEmail}</p>}
            <form onSubmit={handleSubmitInscription} id="formInscription" className='inscriptionForm'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} placeholder="Entrez votre email" className='inputInscription' required />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" value={credentials.pseudo} onChange={onChange} placeholder="Entrez votre pseudo" className='inputInscription' required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Entrez votre mot de passe" autoComplete="off" className='inputInscription' required />
                <label htmlFor="password">Vérification du mot de passe</label>
                <input type="password" name="confirmationPassword" id="confirmationPassword" value={credentials.confirmationPassword} onChange={onChange} autoComplete="off" placeholder="Entrez à nouveau votre mot de passe" className='inputInscription' required />
                <Bouton style={{ marginTop: '20px' }} text="S'inscrire" onClick={handleSubmitInscription} />
            </form>
        </>
    )
}

export default SignUp