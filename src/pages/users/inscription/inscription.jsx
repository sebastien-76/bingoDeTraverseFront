import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css';

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        email: '',
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
                await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials.email,
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
            <h1 className='h1Inscription'>Inscription</h1>
            {errorPwd && <p className='errorPwd'>{errorPwd}</p>}
            {errorEmail && <p className='errorEmail'>{errorEmail}</p>}
            <form onSubmit={handleSubmitInscription} id="formInscription" className='inscriptionForm'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} placeholder="Entrez votre email" className='inputInscription' required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Entrez votre mot de passe" autoComplete="off" className='inputInscription' required />
                <label htmlFor="password">Vérification du mot de passe</label>
                <input type="password" name="confirmationPassword" id="confirmationPassword" value={credentials.confirmationPassword} onChange={onChange} autoComplete="off" placeholder="Entrez à nouveau votre mot de passe" className='inputInscription' required />
                <input type="submit" value="S'inscrire" className='submitInscription' />
            </form>
        </>
    )
}

export default SignUp