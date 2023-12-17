import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider ({ children }){
    const [isLogin, setLogin] = useState(false)
    const [user, setUser] =useState(null)

    const loginAuth = (userData) => {
        //Logica de inicio de sesion exitoso
        if(userData){
            setLogin(true)
            setUser(userData)
        }
    }

    const logoutAuth = () => {
        //Logica de cierre de sesion
        setLogin(false)
        setUser(null)
    }

    return(
        <AuthContext.Provider value = {{ isLogin,user, loginAuth, logoutAuth}} >
            {children}
        </AuthContext.Provider>       
    )
}


export const useAuth = () => useContext(AuthContext)