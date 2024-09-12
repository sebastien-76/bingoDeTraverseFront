import { jwtDecode } from 'jwt-decode';
import { recuperationItem, suppressionItem } from './localStorage';
import { baseUrl } from './serviceAppel';

export const connexionUtilisateur = async (credentials) => {
    const getReponse = await fetch(`${baseUrl}/connexion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        }),
    })
    return getReponse;
}

export const inscriptionUtilisateur = async (credentials) => {
    const getReponse = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            pseudo: credentials.pseudo,
            password: credentials.password,
            Salles: credentials.Salles
        }),
    })
    return getReponse;
}

export function deconnexion() {
    suppressionItem('rememberMe')
    suppressionItem('jetonUtilisateur');
    window.location = "/";
}

export function validiteJeton(jeton) {
    const exp = jwtDecode(jeton).exp;
    const date = new Date().getTime();
    return (exp * 1000) > date ? true : false
}


export function recuperationId() {
    const jeton = recuperationItem('jetonUtilisateur');
    return jeton ? jwtDecode(jeton).userId : ('');
}

export function estIdentifie() {
    const jeton = recuperationItem('jetonUtilisateur');
    const resultat = jeton ? validiteJeton(jeton) : false;
    if (resultat === false) {
        suppressionItem('jetonUtilisateur');
        suppressionItem('rememberMe');
    }
    return resultat;
}

export function pseudoUtilisateur() {
    const jeton = recuperationItem('jetonUtilisateur');
    return jeton ? jwtDecode(jeton).pseudo : ('');
}

export function roleAdmin() {
    const jeton = recuperationItem('jetonUtilisateur');
    const role = jeton ? jwtDecode(jeton).role : ('');
    const roleAdmin = role ? role.includes('ADMIN') : false;
    return roleAdmin;
}


