import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className='logo'>
                <a href="https://www.lechemindetraverse-escapegame.fr/"><img className='logoChemin' src="../../../images/cheminTraverse.png" alt="" /></a>
            </div>
            <div className='copyright'>
                <p>© 2024 - Tous droits réservés</p>
                <p>Réalisation :</p>
                <p>CREMEAUX Emma et MAILLET Sébastien</p>
            </div>
            <div className='liensReseaux'>
                <a href="https://www.facebook.com/LeCheminDeTraverseEscapeGame/?ref=br_rs" className='lienReseau'>
                    <img src="../../../images/facebook.png" alt="logo de facebook" />
                </a>
                <a href="https://www.linkedin.com/company/le-chemin-de-traverse-escape-game-arras/" className='lienReseau'>
                    <img src="../../../images/linkedin.png" alt="logo de linkedin" />
                </a>
            </div>
        </div>
    )
}