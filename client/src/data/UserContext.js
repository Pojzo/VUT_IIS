import { createContext, useState } from "react";


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({name: 'unknown', role: 'guest'});

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}