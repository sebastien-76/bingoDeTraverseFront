import React from "react";

import './flecheScroll.css';

export default function FlecheScroll() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div onClick={scrollToTop} className='fleche'>
            <img src='../../../images/fleche.png' alt="fleche" />
        </div>
    ) 
}