import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className='liens'>
                <a href="https://www.lechemindetraverse-escapegame.fr/"><img className='logoChemin' src="../../../images/cheminTraverse.png" alt="" /></a>
                
                <div className='liensReseaux'>
                    <a href="https://www.facebook.com/LeCheminDeTraverseEscapeGame/?ref=br_rs">
                        <img className='lienReseau' src="../../../images/facebook.png" alt="" />
                    </a>
                    <a href="https://www.linkedin.com/company/le-chemin-de-traverse-escape-game-arras/">
                        <img className='lienReseau' src="../../../images/linkedin.png" alt="" />
                    </a>
                </div>
            </div>
            <div className='copyright'>
                <p>© 2024 - Tous droits réservés</p>
                <p>Réalisation par MAILLET Sébastien et CREMEAUX Emma</p>
            </div>
        </div>
    )
}