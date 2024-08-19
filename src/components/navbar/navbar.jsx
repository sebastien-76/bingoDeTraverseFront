import './navbar.css';
import React from 'react';
import authContext from "../../hooks/useAuth";
import { useContext } from 'react';

export default function Navbar({toggleMenu, menuBurger}) {

    const userPseudo = useContext(authContext).pseudo;


    return (
        <div className="navBar">

            <h1 className="navBarH1">Bienvenue <b>{userPseudo}</b> </h1>

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