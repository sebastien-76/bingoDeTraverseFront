import { Navigate } from "react-router-dom";

import authContext from "../../hooks/useAuth";
import { useContext } from "react";


const RouteSecurisee = ({ composant }) => {
    const { estConnecte } = useContext(authContext);
    
    return (
        estConnecte ? composant : <Navigate to="/connexion" />
    )
}

export default RouteSecurisee
    