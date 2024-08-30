import { recuperationItem } from "./localStorage";

export const baseUrl = "http://localhost:3002/api";

const token = recuperationItem('jetonUtilisateur')

export const getUsers = async () => {
    return await fetch(`${baseUrl}/users`)
}

export const getUser =  async (id) => {
    return await fetch(`${baseUrl}/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

