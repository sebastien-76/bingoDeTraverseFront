import { createContext } from "react";

const authContext = createContext({connecte: false, setConnecte: () => {}, pseudo:'', setPseudo: () => {}, adminVerified: false, setAdminVerified: () => {}});

export default authContext