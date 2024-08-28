import React from 'react'
import {Link} from 'react-router-dom'
import './retourAccueil.css'

const RetourAccueil = () => {
  return (
      <Link to="/" className="retour_accueil" >
        <img src="../../../../images/flecheGauche.png" alt="" />
        Retour a l'accueil
      </Link>
  )
}

export default RetourAccueil