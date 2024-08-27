import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css';
import RetourAccueil from '../../../components/retourAccueil/retourAccueil';
import Bouton from '../../../components/boutons/bouton';
import { inscriptionUtilisateur, recuperationId } from '../../../services/Auth';
import { sauvegardeItem } from '../../../services/localStorage';
import authContext from '../../../hooks/useAuth';

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        pseudo: '',
        password: '',
        confirmationPassword: '',
    })

    const { setIsLogged } = useContext(authContext);

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
                inscriptionUtilisateur(credentials)
                    .then(res => {

                        if (res.status === 403) {
                            res.json()
                                .then(res => setErrorEmail(res.message))
                        } else {
                            res.json()
                                .then(res => {
                                    sauvegardeItem('jetonUtilisateur', res.token)
                                    setIsLogged(true)
                                })
                                .then(res => {
                                    const uid = recuperationId();
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
                <input type="password" name="confirmationPassword" id="confirmationPassword" value={credentials.confirmationPassword} onChange={onChange} autoComplete="off" placeholder="Repetez votre mot de passe" className='inputInscription' required />
            </form>
                <Bouton style={{ width: '150px', marginTop: '20px', backgroundColor: 'var(--purple-pastel)', border: '2px solid var(--purple-pastel)' }} text="S'inscrire" onClick={handleSubmitInscription} />
        </>
    )
}

export default SignUp