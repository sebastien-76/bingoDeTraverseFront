import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { estIdentifie, pseudoUtilisateur, roleAdmin, recuperationId, deconnexion } from './services/Auth';
import { recuperationItem } from './services/localStorage';

function App() {

  const [menuBurger, setMenuBurger] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [isLogged, setIsLogged] = useState(estIdentifie());

  const [pseudo, setPseudo] = useState(pseudoUtilisateur());

  const [isAdmin, setIsAdmin] = useState(roleAdmin());

  useEffect(() => {
    setIsLogged(estIdentifie());
    setPseudo(pseudoUtilisateur());
    setIsAdmin(roleAdmin());
  }, [isLogged, pseudo, isAdmin])


  const value = {
    isLogged,
    setIsLogged,
    pseudo,
    setPseudo,
    isAdmin,
    setIsAdmin,
  }

  const toggleMenu = () => {
    setMenuBurger(!menuBurger);
    setOpenModal(!openModal);
  }
  const id = recuperationId();
  const lienProfil = `/profil/${id}`;

  const handleDeconnexion = () => {
    setIsLogged(false);
    deconnexion();
  }

  const imageProfil = recuperationItem('imageProfil');
  const imageProfilNavBar = imageProfil? imageProfil : '../../images/cheminTraverse.png';

  return (
    <div className="App">
      <authContext.Provider value={value}>
      <main className={isLogged ? 'mainApp' : ''} >
      {isLogged && <Navbar menuBurger={menuBurger} toggleMenu={toggleMenu} />}
        <Router>
          <Routes>
            <Route path='/' element={<Accueil />} />
            <Route path='/phrases' element={<Phrases />} />
            <Route path='/salles' element={<Salles />} />
            <Route path='/gamemaster' element={<Gamemaster />} />
            <Route path='/game' element={<RouteSecurisee composant={<Game />} />} />
            <Route path='/profil/:id' element={<RouteSecurisee composant={<Profil />} />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/inscription' element={<Inscription />} />
          </Routes>
        </Router>
        </main>
          {!isLogged && <Footer className="footerApp" />}

            {openModal && (
              <>
              <div className='modal-backdrop' onClick={() => toggleMenu()}>
              </div>
              <div className="modalMenu">
                <img className="imageProfilNavBar" src={imageProfilNavBar} alt="image de profil" />
                <div className="navLinks">
                  <a className='navLink' href="/">Accueil</a>
                  <a className='navLink' href={lienProfil}>Profil</a>
                  <a className='navLink' href="/game">Bingo</a>
                  <p className='navLink deconnexion' onClick={handleDeconnexion}>Deconnexion</p>
                  {isAdmin && (
                    <div className='linksAdmin'>
                      <div className="separator"></div>
                      <h2 className='adminH2'>Pages Admin :</h2>
                      <a className='navLink' href="/phrases">Phrases</a>
                      <a className='navLink' href="/salles">Salles</a>
                      <a className='navLink' href="/gamemaster">Gamemasters</a>
                    </div>
                  )}
                </div>
              </div>
              </>
            )}

      </authContext.Provider>
    </div>
  );
}

export default App;
