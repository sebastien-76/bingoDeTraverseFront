import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css';
import RetourAccueil from '../../../components/retourAccueil/retourAccueil';
import Bouton from '../../../components/boutons/bouton';
import { inscriptionUtilisateur, recuperationId } from '../../../services/Auth';
import { sauvegardeItem } from '../../../services/localStorage';
import authContext from '../../../hooks/useAuth';
import { getSalles } from '../../../services/serviceAppel';

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        pseudo: '',
        password: '',
        confirmationPassword: '',
        Salles: []
    })
    const [salles, setSalles] = useState([]);
    const [sallesAAjouter, setSallesAAjouter] = useState([]);

    const { setIsLogged } = useContext(authContext);

    const [errorPwd, setErrorPwd] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const navigate = useNavigate();

    const fetchSalles = () => {
        getSalles()
            .then(response => response.json())
            .then(data => {
                const listeSalles = data.data.filter(salle =>
                    salle.id != 1
                )
                setSalles(listeSalles)
            })
    }

    useEffect(() => {
        fetchSalles();
    }, [])

    const onCheckSalles = (event) => {
        const sallechecked = parseInt(event.target.id);
        if (event.target.checked) {
            setSallesAAjouter([...sallesAAjouter, sallechecked]);
        }
        else {
            setSallesAAjouter(sallesAAjouter.filter(salle => salle !== sallechecked));
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const validatePassword = (password) => {
        const reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        return reg.test(password)
    }

    const handleSubmitInscription = async (event) => {
        event.preventDefault();
        setErrorPwd('');
        credentials.Salles = sallesAAjouter
        if (!validatePassword(credentials.password)) {
            setErrorPwd("Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial")
        }
        if (credentials.password === credentials.confirmationPassword) {
            if (!validatePassword(credentials.password)) {
                setErrorPwd("Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial")
            }
            else {
                delete credentials.confirmationPassword;
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
                        Salles: []
                    })
                    document.getElementById("formInscription").reset()
                } catch (error) {
                    console.log(error);
                }
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
                <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} placeholder="Entrez votre email" className='pageInput' required />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" value={credentials.pseudo} onChange={onChange} placeholder="Entrez votre pseudo" className='pageInput' required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="Entrez votre mot de passe" autoComplete="off" className='pageInput' required />
                <label htmlFor="password">Vérification du mot de passe</label>
                <input type="password" name="confirmationPassword" id="confirmationPassword" value={credentials.confirmationPassword} onChange={onChange} autoComplete="off" placeholder="Repetez votre mot de passe" className='pageInput' required />
                <div>
                    <label htmlFor="salle">Salles</label>
                    <ul className='salleListInscription'>
                        {salles.map((salle) => (
                            <li key={salle.id} className='salleInscription'>
                                <input type="checkbox" id={salle.id} name={salle.id} onChange={onCheckSalles} />{salle.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <Bouton style={{ height: '3em', width: '150px', marginTop: '20px', backgroundColor: 'var(--purple-pastel)', border: '2px solid var(--purple-pastel)' }} text="S'inscrire" onClick={handleSubmitInscription} />
            </form>
        </>
    )
}

export default SignUp