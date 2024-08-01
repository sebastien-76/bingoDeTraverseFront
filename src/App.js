import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar/navbar';
import Connexion from './pages//users/connexion/connexion';
import Inscription from './pages/users/inscription/inscription';
import Accueil from './pages/users/accueil/accueil'

import Salles from './pages/admin/salles/salles';
import Phrases from './pages/admin/phrases/phrases';
import Gamemaster from './pages/admin/gamemasters/gamemasters';

import Game from './pages/users/game/game';
import Profil from './pages/users/profil/profil';
function App() {

  const [menuBurger, setMenuBurger] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [adminVerified, setAdminVerified] = useState(true);

  const toggleMenu = () => {
      setMenuBurger(!menuBurger);
      setOpenModal(!openModal);
  }
  
  return (
    <div className="App">
      <Navbar menuBurger={menuBurger} toggleMenu={toggleMenu}/>
      <Router>
        <Routes>
          <Route path='/' element={<Accueil/>}/>
          <Route path='/phrases' element={<Phrases/>}/>
          <Route path='/salles' element={<Salles/>}/>
          <Route path='/gamemaster' element={<Gamemaster/>}/>
          <Route path='/game' element={<Game/>}/>
          <Route path='/profil' element={<Profil/>}/>
          <Route path='/connexion' element={<Connexion/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
        </Routes>
      </Router>

      {openModal ? <div className="modalMenu">
        <img src="../../images/cheminTraverse.png" alt="" />
        <div className="navLinks">
          
          <a className='navLink' href="/">Accueil</a>
          <a className='navLink' href="/profil">Profil</a>
          <a className='navLink' href="/game">Game</a>

          {adminVerified? <div className='linksAdmin'>
            <div className="separator"></div>
            <h2 className='adminH2'>Pages Admin :</h2>
            <a className='navLink' href="/phrases">Phrases</a>
            <a className='navLink' href="/salles">Salles</a>
            <a className='navLink' href="/gamemaster">Gamemasters</a>
          </div>
        : null}
        </div>
      </div>:
      null
      }

    </div>
  );
}

export default App;
