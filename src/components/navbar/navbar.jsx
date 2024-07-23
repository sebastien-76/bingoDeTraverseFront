import './navbar.css';
import React, { useState } from 'react';

export default function Navbar({toggleMenu, menuBurger}) {


    return (
        <div className="navBar">
            <img className="navBarLogo" src="../../images/cheminTraverse.png" alt="logo" />

            <h1 className="navBarH1">Bienvenue joueur</h1>

            {menuBurger ? <div onClick={toggleMenu} className="menuBurger">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            : <div className="menuBurger">
                <p onClick={toggleMenu} className='closeMenu'>X</p>
            </div>
        }   
        </div>
    )
}