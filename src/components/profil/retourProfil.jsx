import React from 'react'
import { Link } from 'react-router-dom'
import './retourProfil.css'
import { recuperationId } from '../../services/Auth'

const RetourProfil = () => {
    const uid = recuperationId();
    const retourProfil = `/profil/${uid}`
    return (
        <p><Link to={retourProfil} className="retour_profil">Retour au profil</Link></p>
    )
}

export default RetourProfil