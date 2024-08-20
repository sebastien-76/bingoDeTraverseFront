import { createContext } from "react";

const authContext = createContext({
    isLogged: false,
    setIsLogged: () => {},
    pseudo:'',
    setPseudo: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
});


export default authContext