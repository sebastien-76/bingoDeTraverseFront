import React from 'react'
import {Link} from 'react-router-dom'
import './retourAccueil.css'

const RetourAccueil = () => {
  return (
    <p><Link to="/" className="retour_accueil">Retour a l'accueil</Link></p>
  )
}

export default RetourAccueil