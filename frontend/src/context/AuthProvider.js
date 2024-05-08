import { createContext, useContext, useEffect, useState } from 'react'
import { getAllTransacciones} from '../api/transacciones.api'
import { getAllUsuarios } from '../api/usuarios.api'


const AuthContext = createContext()

export function AuthProvider ({ children }){
    const [isLogin, setLogin] = useState(false)
    const [user, setUser] =useState(null)
    const [transacciones,setTransacciones] = useState([])
    const [listaUsuarios, setListaUsuarios] = useState([])


    //Establecemos lista de usuarios
    useEffect(() => { async function getUsuarios() {
        const lista = await getAllUsuarios()
        setListaUsuarios(lista.data)
    }
    getUsuarios()
    
    },[])

    
    /*Este useEffect se va a ejecutar apenas cargue la pagina */
    useEffect(() => {
        if(user){
            async function loadTransacciones() {
                const res = await getAllTransacciones()
                const transaccionesUser = await res.data.filter(function(transaccion){
                    return user.usuario === transaccion.usuario
                })
                setTransacciones(transaccionesUser)
            }
            loadTransacciones()
        }
        
    },[user])

    

    


    const loginAuth = (userData) => {
        //Logica de inicio de sesion exitoso
        setLogin(true)
        setUser(userData)
       
    }

    const logoutAuth = () => {
        //Logica de cierre de sesion
        setLogin(false)
        setUser(null)
    }

    return(
        <AuthContext.Provider 
        value = {{ 
            isLogin,user, 
            loginAuth, 
            logoutAuth,
            transacciones, 
            listaUsuarios,
            }} >
            {children}
        </AuthContext.Provider>       
    )
}


export const useAuth = () => useContext(AuthContext)