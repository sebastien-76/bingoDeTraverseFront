import { Navigate } from "react-router-dom";

import authContext from "../../hooks/useAuth";
import { useContext } from "react";


const RouteSecurisee = ({ composant }) => {
    const { isLogged } = useContext(authContext);
    
    return (
        isLogged ? composant : <Navigate to="/connexion" />
    )
}

export default RouteSecurisee
    