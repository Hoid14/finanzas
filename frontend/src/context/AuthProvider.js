import { createContext, useContext, useEffect, useState } from 'react'
import { getAllTransacciones, getBalance } from '../api/transacciones.api'
import { getAllUsuarios } from '../api/usuarios.api'

const AuthContext = createContext()

export function AuthProvider ({ children }){
    const [isLogin, setLogin] = useState(false)
    const [user, setUser] =useState(null)
    const [ingreso, setIngreso] = useState(null)
    const [gasto, setGasto] = useState(null)
    const [transacciones,setTransacciones] = useState([])
    const [listaUsuarios, setListaUsuarios] = useState([])
    
    //Establecemos lista de usuarios
    useEffect(() => { async function getUsuarios() {
        const lista = await getAllUsuarios()
        setListaUsuarios(lista.data)
    }
    getUsuarios()
    
    },[])

    useEffect(() => {
        if(user){
            async function loadBalance() {
            const gasto = await getBalance(user.usuario,'Gasto','2023')
            await setGasto(gasto.data.suma)
            const ingreso = await getBalance(user.usuario,'Ingreso','2023')
            await setIngreso(ingreso.data.suma)
            
        }
        loadBalance()
        }
        
    }, [user, transacciones])

    
    /*Este useEffect se va a ejecutar apenas cargue la pagina */
    useEffect(() => {
        
        async function loadTransacciones() {
            const res = await getAllTransacciones()
            setTransacciones(res.data)
        }
        loadTransacciones()
    }, [])

    console.log(transacciones)
    
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
        <AuthContext.Provider value = {{ isLogin,user, loginAuth, logoutAuth,ingreso,gasto,transacciones, listaUsuarios}} >
            {children}
        </AuthContext.Provider>       
    )
}


export const useAuth = () => useContext(AuthContext)