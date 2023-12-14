import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {getAllUsuarios} from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
export function LoginFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue //Me permite ponerle valores al formulario
    } = useForm()
    //Establecemos variables de usuario
    
    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit( async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
        
        const res = await getAllUsuarios();
        console.log(res)
        // navigate()
        
        })
        
    return(
        <div>
            <form onSubmit={onSubmit}>
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