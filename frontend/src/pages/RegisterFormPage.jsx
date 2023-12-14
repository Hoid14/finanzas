import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {createUsuario} from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
export function RegisterFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue //Me permite ponerle valores al formulario
    } = useForm()

    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit(async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
        try{
            await createUsuario(data)
            // navigate()
        }catch(error){
            if(error.response){ //detalles de la respuesta
                if(error.response.status === 400 && error.response.data.usuario){
                    toast.error('Este usuario ya existe.', {
                        style: {
                            background: "#101010",
                            color: "#fff"
                        }
                    })
                }
            }
        }
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
                placeholder="Nombre" 
                {...register("nombre", 
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
