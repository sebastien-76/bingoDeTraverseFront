import React, { useState, useContext, useEffect } from 'react';
import authContext from "../../hooks/useAuth";
import './finPartie.css';

export default function FinPartie() {
    const userPseudo = useContext(authContext).pseudo;
    const [messageAfficher, setMessageAfficher] = useState();

    const messages = [
        [
            <p>Bien joué(e) {userPseudo},</p>,
            <p>Tu as devancé(e) tous tes collègues</p>,
            <p>Et tu as gagné !</p>,
            <p>HAHA tu as le droit de te la péter...</p>,
            <p>Mais attention, n'abuse pas trop de ta victoire !</p>
        ],
        [
            <p>C'est ce que j'appelle</p>,
            <p>une victoire écrasante, {userPseudo} !</p>,
            <p>Tu mérites tous les éloges !</p>,
            <p>Je pense que tu peux crâner un peu devant tes collègues !</p>,
            <p>Fais-toi même payer une douceur, profite !</p>
        ],
        [
            <p>Oui oui, on sait {userPseudo}, tu as gagné(e) !</p>,
            <p>Pas besoin de le crier sur les toits,</p>,
            <p>ce n'est qu'un bingo entre collègues !</p>,
            <p>Ah, je te jure ces geeks !</p>,
            <p>Une victoire et ça y est, ça se pense imbattable !</p>
        ],
        [
            <p>Pssst, {userPseudo}?</p>,
            <p>Tu as gagné(e) !</p>,
            <p>Tu es incroyable, magique, parfait(e), magnifique, sublime, excellent(e), magnifiquement excellent(e)...</p>,
            <p>Ouais bon, ça va deux secondes les compliments !</p>,
            <p>Tu ne pensais quand même pas que j'allais continuer comme ça jusqu'en bas de la page si ?</p>
        ],
        [
            <p>Félicitations {userPseudo} !</p>,
            <p>On dirait que la chance était de ton côté aujourd'hui.</p>,
            <p>Ou peut-être as-tu simplement soudoyé(e) le jeu ?</p>,
            <p>Quoi qu'il en soit, profite bien de ta victoire !</p>,
            <p>Mais fait attention je t'ai quand même à l'œil !!</p>
        ],
        [
            <p>Attention, attention !</p>,
            <p>{userPseudo} vient de remporter une victoire légendaire !</p>,
            <p>Un jour les poètes écriront des chansons sur ton bingo !</p>,
            <p>Tes collègues pleureront à s'en souvenir</p>,
            <p>Et nommeront leur enfants (ou leur chien) en son honneur</p>,
            <p>Bon d'accord.. j'en fais trop !</p>
        ],
        [
            <p>Eh bien, {userPseudo}, tu as réussi !</p>,
            <p>Encore une victoire et tu pourras écrire un livre sur le sujet !</p>,
            <p>"Comment gagner au bingo et impressionner (ou humilier) ses collègues"</p>,
            <p>Ça ferait un best-seller, non ?</p>
        ],
        [
            <p>La victoire te va si bien, {userPseudo} !</p>,
            <p>Les autres joueurs peuvent aller se rhabiller.</p>,
            <p>Prêt(e) pour un nouveau défi ou tu préfères savourer ce moment ?</p>,
            <p>Le choix t'appartient, champion(ne) !</p>
        ]
    ];
    

    const tirerMessage = () => {
        const message = messages[Math.floor(Math.random() * messages.length)];
        return message;
    }

    useEffect(() => {
        setMessageAfficher(tirerMessage());
    }, []);

    return (
            <div className='finPartieP'>
                {messageAfficher}
            </div>
    );
}
