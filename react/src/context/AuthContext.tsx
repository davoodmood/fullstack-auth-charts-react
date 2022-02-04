import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>({});

export default function SearchProvider({children}) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

function useProvideAuth() {
    const [user, setUser] = useState({})
    const [auth, setAuth] = useState(false)
    const toggleAuth = (status : boolean) : void => setAuth(status)
    return {
        auth,
        user,
        toggleAuth,
        setUser
    }
}
