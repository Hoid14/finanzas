import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {createUsuario} from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useAuth} from '../context/AuthProvider'
export function RegisterFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue, //Me permite ponerle valores al formulario
        watch, // Utilizado para observar los valores de los campos
    } = useForm()

    const { loginAuth } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit(async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
        try{
            await createUsuario(data)
            navigate(`/${data.usuario}/transacciones/${"todo"}`)
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

    const password = watch('clave', ''); // Obtén el valor del campo de contraseña
    
    // Agrega una función de validación para comparar contraseñas
    const validatePasswordConfirmation = (value) => {
        return value === password || 'Las contraseñas no coinciden';
    };
    return(
        <div>
            <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                    <input
                    type="text"
                    placeholder="Usuario"
                    {...register("usuario", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                    type="password"
                    placeholder="Clave"
                    {...register("clave", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                    type="password"
                    placeholder="Confirmar Clave"
                    {...register("confirmarClave", { 
                        required: true, 
                        validate: validatePasswordConfirmation, // Asigna la funcion de validacion
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                {errors.confirmarClave && (
                    <p className="text-red-500">{errors.confirmarClave.message}</p>
                )}
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                    Save
                </button>
            </form>

        </div>
    )
    }
