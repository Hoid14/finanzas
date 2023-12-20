import { useEffect, useState } from 'react'
import {get, useForm} from 'react-hook-form'
import {getAllUsuarios,createUsuario, getUsuario} from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useAuth} from '../context/AuthProvider'
export function LoginFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue, //Me permite ponerle valores al formulario
        watch,
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
    const onSubmit = handleSubmit( async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
        if (params.ingreso==="login"){
            let usuarioDetectado = await listaUsuarios.find(function(usuario){
                return usuario.usuario === data.usuario && usuario.clave === data.clave
            })
    
            if (await usuarioDetectado) {
                loginAuth(usuarioDetectado)
                navigate(`/${usuarioDetectado.usuario}/transacciones/${"todo"}`)
                toast.success(`Ingreso exitoso`)
            }else{
                toast.error("no encontrado")
            }
        }
        else if (params.ingreso==="register"){
            try{
                await createUsuario(data)
                const usuarioDetectado = await getUsuario(data.usuario)
                await loginAuth(usuarioDetectado.data)
                await navigate(`/${usuarioDetectado.data.usuario}/transacciones/${"todo"}`)
                toast.success(`Usuario registrado exitosamente`)
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
        }
        
        })

        const password = watch('clave', ''); // Obtén el valor del campo de contraseña
    
        // Agrega una función de validación para comparar contraseñas
        const validatePasswordConfirmation = (value) => {
            return value === password || 'Las contraseñas no coinciden';
        };
        
        
        
    
        
    return(
        
        <div>
            {params.ingreso === "login" && (
                <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">Inicio de Sesión</h2>
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Usuario</label>
                        <input
                        type="text"
                        placeholder="Usuario"
                        {...register("usuario", { required: true })}
                        className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Clave</label>
                        <input
                        type="password"
                        placeholder="Clave"
                        {...register("clave", { required: true })}
                        className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                        Guardar
                    </button>
                </form>
            )}
            {params.ingreso === "register" && (
                <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">Registro</h2>

                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Usuario</label>
                    <input
                        type="text"
                        placeholder="Usuario"
                        {...register("usuario", { required: true })}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        {...register("nombre", { required: true })}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Clave</label>
                    <input
                        type="password"
                        placeholder="Clave"
                        {...register("clave", { required: true })}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Confirmar Clave</label>
                    <input
                        type="password"
                        placeholder="Confirmar Clave"
                        {...register("confirmarClave", { 
                            required: true, 
                            validate: validatePasswordConfirmation, // Asigna la función de validación
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    </div>

                    {errors.confirmarClave && (
                    <p className="text-red-500">{errors.confirmarClave.message}</p>
                    )}

                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                    Guardar
                    </button>
                </form>
                )}

            
        </div>
    )
    }