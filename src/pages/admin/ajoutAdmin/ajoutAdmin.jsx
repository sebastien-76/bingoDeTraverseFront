import { useEffect, useState } from "react"
import { getUsers, putUser } from "../../../services/serviceAppel"
import Bouton from "../../../components/boutons/bouton"
import './ajoutAdmin.css'
import { recuperationItem } from "../../../services/localStorage"


const AjoutAdmin = () => {
    //Définition de l'état stockant les users
    const [users, setUsers] = useState([])
    const [userSelected, setUserSelected] = useState("")

    const token = recuperationItem('jetonUtilisateur')

    //Récupération des users
    const fetchUsers = () => {
        getUsers()
            .then(res => res.json())
            .then(dataUsers => setUsers(dataUsers.data))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const selectAdmin = (e) => {
        const idx = e.target.selectedIndex
        setUserSelected(e.target.options[idx].value)
    }

    const ajoutAdmin = () => {
        const user = users.find(user => user.email === userSelected)
        const uid = user.id
        const role = "ADMIN"
        const params = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Roles: role
            })
        }
        const fetchPutUser = () => {
            putUser(uid, params)
        }
        fetchPutUser()
        document.getElementById("userSelect").selectedIndex = 0
    }

    const deleteAdmin = () => {
        const user = users.find(user => user.email === userSelected)
        const uid = user.id
        const role = "ADMIN"
        const params = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                deletedRoles: role
            })
        }
        const fetchDelUser = () => {
            putUser(uid, params)
        }
        fetchDelUser()
        document.getElementById("userDeletedSelect").selectedIndex= 0
    }

    return (
        <>
            <h2 className="titreh2">Liste et role(s) des joueurs :</h2>
            <ul className="usersListContainer">
                {users.map(user => {
                    const roles = user.Roles;
                    return (
                        <li key={user.id} className="usersList">
                            {user.email} :
                            <ul>
                                {roles.map(role => {
                                    return (
                                        <li key={role.id} className="roleList">{role.name}</li>
                                    )
                                })
                                }
                            </ul>
                        </li>
                    )
                }
                )}
            </ul>
            <h4 className="titreh4">Ajouter le role d'admin</h4>
            <div>
                <select className="userSelect" name="ajoutAdmin" id="userSelect" onChange={selectAdmin}>
                    <option value="">Choisissez un joueur</option>
                    {users.map(user =>
                        <option key={user.id} value={user.email} >
                            {user.email}
                        </option>)}
                </select>
            </div>
            <Bouton onClick={ajoutAdmin} text="Ajouter" style={{ height: '3em', width: '10em', margin: '0.5em auto', fontSize: '0.9em', backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} />
            <h4 className="titreh4">Enlever le role d'admin</h4>
            <div>
                <select className="userSelect" name="deleteAdmin" id="userDeletedSelect" onChange={selectAdmin}>
                    <option value="">Choisissez un joueur</option>
                    {users.map(user =>
                        <option key={user.id} value={user.email} >
                            {user.email}
                        </option>)}
                </select>
            </div>
            <Bouton onClick={deleteAdmin} text="Supprimer le role" style={{ height: '3em', width: '10em', margin: '0.5em auto', fontSize: '0.9em', backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} />
        </>
    )

}

export default AjoutAdmin