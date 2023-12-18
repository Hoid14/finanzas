import { useEffect, useState } from 'react'
import {get, useForm} from 'react-hook-form'
import {getAllUsuarios} from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useAuth} from '../context/AuthProvider'
export function LoginFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue //Me permite ponerle valores al formulario
    } = useForm()
    //Establecemos variables de usuario
    const [listaUsuarios, setListaUsuarios] = useState([])
    useEffect(() => { async function getUsuarios() {
        const lista = await getAllUsuarios()
        setListaUsuarios(lista.data)
    }
    getUsuarios()
    
    },[])

    const { loginAuth } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const login = handleSubmit( async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
        let usuarioDetectado = listaUsuarios.find(function(usuario){
            return usuario.usuario === data.usuario && usuario.clave === data.clave
        })

        if (usuarioDetectado) {
            loginAuth(usuarioDetectado)
            navigate(`/${usuarioDetectado.usuario}/transacciones/${"todo"}`)
        }else{
            toast.error("no encontrado")
        }
        })
        
        
        
    
        
    return(
        <div>
            <form onSubmit={login}>
                <input type="text" 
                placeholder="Usuario" 
                {...register("usuario", 
                {required: true})}
                />
                <input type="text" 
                placeholder="Clave" 
                {...register("clave", 
                {required: true})}
                />
                <button>Save</button>
            </form>
        </div>
    )
    }