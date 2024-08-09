import { createContext } from "react";

const authContext = createContext({connecte: false, setConnecte: () => {}});

export default authContext