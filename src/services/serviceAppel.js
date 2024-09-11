import { recuperationItem } from "./localStorage";

export const baseUrl = "http://localhost:3002/api";

const token = recuperationItem('jetonUtilisateur')

//Récupération de tous les users
export const getUsers = async () => {
    return await fetch(`${baseUrl}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Récupération d'un seul user
export const getUser = async (id) => {
    return await fetch(`${baseUrl}/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Modification d'un user
export const putUser = async (id, params) => {
    return await fetch(`${baseUrl}/users/${id}`, params)
}

//Récurépartion des salles
export const getSalles = async (id) => {
    return await fetch(`${baseUrl}/salles`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Création d'une salle
export const postSalle = async (newSalleName) => {
    return await fetch(`${baseUrl}/salles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: newSalleName
        })
    }
    )
}

//Suppression d'une salle
export const deleteSalle = async (salleId) => {
    return await fetch(`${baseUrl}/salles/${salleId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Récupération des phrases
export const getPhrases = async () => {
    return await fetch(`${baseUrl}/phrases`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Suppression d'une phrase
export const deletePhrase = async (phraseId) => {
    return await fetch(`${baseUrl}/phrases/${phraseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Ajout d'une phrase
export const postPhrase = async (newPhraseText, salleId) => {
    return await fetch(`${baseUrl}/phrases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            text: newPhraseText,
            SalleId: salleId
        }),
    })
}

//Récupération des gamemasters
export const getGamemasters = async () => {
    return await fetch(`${baseUrl}/gamemasters`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//Delete d'un gamemaster
export const deleteGamemaster = async (gamemasterId) => {
    return await fetch(`${baseUrl}/gamemasters/${gamemasterId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }

    })
}

export const postGamemaster = async (newGamemaster) => {
    return await fetch(`${baseUrl}/gamemasters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            email: newGamemaster
        })
    })
}