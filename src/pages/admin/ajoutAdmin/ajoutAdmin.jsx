import { useEffect, useState } from "react"
import { getUsers, putUser } from "../../../services/serviceAppel"
import Bouton from "../../../components/boutons/bouton"
import './ajoutAdmin.css'
import { recuperationItem } from "../../../services/localStorage"


const AjoutAdmin = () => {
    //Définition de l'état stockant les users
    const [users, setUsers] = useState([])
    const [userSelected, setUserSelected] = useState("")
    const [visibilite, setVisibilite] = useState("invisible");

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

    const ajoutAdminValide = () => {
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
                .then(() => fetchUsers());
        }

        try {
            fetchPutUser()
            document.getElementById("userSelect").selectedIndex = 0
            setVisibilite("invisible")
            setUserSelected("")
        }
        catch (error) {
            console.error(error)
        }
    }

    const ajoutAdmin = () => {
        userSelected ? ajoutAdminValide() : setVisibilite("visible");
    }

    const deleteAdminValide = () => {
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
                .then(() => fetchUsers());
        }

        try {
            fetchDelUser()
            document.getElementById("userDeletedSelect").selectedIndex = 0
            setVisibilite("invisible")
            setUserSelected("")
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteAdmin = () => {
        userSelected ? deleteAdminValide() : setVisibilite("visible");
    }

    return (
        <>
            <h2 className="pageAdminH2">Ajouter le role d'admin</h2>
            <div>
                <select className="userSelect" name="ajoutAdmin" id="userSelect" onChange={selectAdmin}>
                    <option value="">Choisissez un joueur</option>
                    {users.map(user =>
                        <option key={user.id} value={user.email} >
                            {user.email}
                        </option>)}
                </select>
            </div>
            <Bouton onClick={ajoutAdmin} text="Ajouter" style={{ height: '3em', marginBottom: "20px", width: "130px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} />
            <h2 className="pageAdminH2">Enlever le role d'admin</h2>
            <div>
                <select className="userSelect" name="deleteAdmin" id="userDeletedSelect" onChange={selectAdmin}>
                    <option value="">Choisissez un joueur</option>
                    {users.map(user =>
                        <option key={user.id} value={user.email} >
                            {user.email}
                        </option>)}
                </select>
            </div>
            <Bouton onClick={deleteAdmin} text="Supprimer le role" style={{ height: '3em', marginBottom: "20px", width: "200px", backgroundColor: "var(--blue-pastel)", border: "1px solid var(--blue-pastel)" }} />
            <h1 className="pageAdminH1">Liste et role(s) des joueurs :</h1>
            <p className={visibilite}>Veuillez choisir un joueur!</p>
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

        </>
    )

}

export default AjoutAdmin