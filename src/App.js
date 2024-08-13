import { useState, Children, useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Connexion from './pages//users/connexion/connexion';
import Inscription from './pages/users/inscription/inscription';
import Accueil from './pages/users/accueil/accueil'

import Salles from './pages/admin/salles/salles';
import Phrases from './pages/admin/phrases/phrases';
import Gamemaster from './pages/admin/gamemasters/gamemasters';

import Game from './pages/users/game/game';
import Profil from './pages/users/profil/profil';

import RouteSecurisee from './components/routeSecurisee/routeSecurisee';

import authContext from './hooks/useAuth';
import { estIdentifie, pseudoUtilisateur, isAdmin, recuperationId, deconnexion } from './services/Auth';

function App() {

  const [menuBurger, setMenuBurger] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [estConnecte, setEstConnecte] = useState(estIdentifie());
  const [pseudo, setPseudo] = useState('');


  const [adminVerified, setAdminVerified] = useState(false);

  const value = {
    estConnecte,
    setEstConnecte,
    pseudo,
    setPseudo,
    adminVerified,
    setAdminVerified
  }

  useEffect( () => {
    setEstConnecte(estIdentifie());
    setPseudo(pseudoUtilisateur());
    setAdminVerified(isAdmin());
  }, [estConnecte, pseudo, adminVerified])

  console.log(value);

  const toggleMenu = () => {
    setMenuBurger(!menuBurger);
    setOpenModal(!openModal);
  }
  const id = recuperationId();
  const lienProfil = `/profil/${id}`;

  const handleDeconnexion = () => {
    setEstConnecte(false);
    deconnexion();
 }

  return (
    <div className="App">
      <authContext.Provider value={value}>
        { (estConnecte) && <Navbar menuBurger={menuBurger} toggleMenu={toggleMenu} />}
        <Router>
          <Routes>
            <Route path='/' element={<Accueil />} />
            <Route path='/phrases' element={<Phrases />} />
            <Route path='/salles' element={<Salles />} />
            <Route path='/gamemaster' element={<Gamemaster />} />
            <Route path='/game' element={<RouteSecurisee composant={<Game />} />} />
            <Route path='/profil/:id' element={<RouteSecurisee composant={<Profil id={Children} />} />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/inscription' element={<Inscription />} />
          </Routes>
        </Router>
      </authContext.Provider>
      
      {(!estConnecte) && <Footer />}

      {openModal ? <div className="modalMenu">
        <img src="../../images/cheminTraverse.png" alt="" />
        <div className="navLinks">

          <a className='navLink' href="/">Accueil</a>
          <a className='navLink' href={lienProfil}>Profil</a>
          <a className='navLink' href="/game">Game</a>
          <p className='navLink' onClick={handleDeconnexion}>Deconnexion</p>

          {adminVerified ? <div className='linksAdmin'>
            <div className="separator"></div>
            <h2 className='adminH2'>Pages Admin :</h2>
            <a className='navLink' href="/phrases">Phrases</a>
            <a className='navLink' href="/salles">Salles</a>
            <a className='navLink' href="/gamemaster">Gamemasters</a>
          </div>
            : null}
        </div>
      </div> :
        null
      }

    </div>
  );
}

export default App;
