
/* import { useState } from 'react'; */
import { jwtDecode } from 'jwt-decode';
import {  recuperationItem, suppressionItem } from './localStorage';
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

export function inscriptionUtilisateur(credentials) {
    return fetch('${baseUrl}/utilisateurs', credentials)
}

export async function recupUtilisateur(id) {
    return await fetch(`${baseUrl}/utilisateurs/${id}`)
}

export function deconnexion() {
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
    }
    return resultat;
}


