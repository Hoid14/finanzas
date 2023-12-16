import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {createTransaccion,deleteTransaccion, updateTransaccion, getTransaccion} from '../api/transacciones.api'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'


export function TransaccionesFormPage(){
    
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue //Me permite ponerle valores al formulario
    } = useForm()


    const navigate = useNavigate()
    const params = useParams() // Extrae los parametros de la URL como un objeto JSON(en este caso solo tiene una propiedad "id"), es decir, los marcadores de posicion con dos puntos de App.js
    

    const onSubmit = handleSubmit(async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
       if (params.id) {
        await updateTransaccion(params.id, data)
        if(data.tipo === 'Gasto') { 
            toast.success('Gasto actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            }) 

        }
        else if (data.tipo === 'Ingreso'){
            toast.success('Ingreso actualizado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }   
    }
       else{
        await createTransaccion(data) // data es el formulario que se envia
        
        //Ejecuta el metodo success de toast que muestra un mensaje
        if(data.tipo === 'Gasto') { 
            toast.success('Gasto creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            }) 

        }
        else if (data.tipo === 'Ingreso'){
            toast.success('Ingreso creado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        
       }
       navigate('/transacciones') //despues de enviar el formulario, redirecciona hacia transacciones
        
    })

    useEffect(() => {
        async function loadTransaccion () {
            if (params.id) {
                const res = await getTransaccion(params.id)
                setValue('descripcion', res.data.descripcion)
                setValue('monto', res.data.monto)
                setValue('tipo', res.data.tipo)
            }
        }
        loadTransaccion()
    }, [])
    
    return(
        <div>
            <div className='flex flex-col py-3'>
                <div className='flex justify-between'>
                    <div>
                        {params.user}
                        <Link to={`/${params.user}/transacciones`}>
                            <h1 className='font-bold text-3xl mb-4'>Transaccion App</h1>
                        </Link>
                    </div>
                    <div>
                        <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg'>
                            <Link to="/">Cerrar sesion</Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className='max-w-xl mx-auto'>

            <form onSubmit={onSubmit}>
                <input type="text" 
                placeholder="Descripcion" 
                {...register("descripcion", 
                {required: true})}
                className='w-full px-4 py-2 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue mb-3'
                />
                
                {errors.titulo && <span>Titulo es requerido</span>}

                <input type="number" 
                placeholder="Ingrese monto" 
                {...register("monto", 
                {required: true, min:0})}
                className='w-full px-4 py-2 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue mb-3'
                />
                
                {errors.monto && <span>Monto es requerido</span>}


                <select {...register("tipo", { required: true })}
                className='w-full px-4 py-2 leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue mb-3'
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Gasto">Gasto</option>
                    <option value="Ingreso">Ingreso</option>
                </select>
                {errors.tipo && <span>Tipo es requerido</span>}
            
                <button
                className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg'
                >Save</button>
            </form>

            {
                params.id &&
                <button 
                
                onClick ={async ()=>{
                    const accepted = window.confirm("Estas seguro?")
                    if(accepted){
                        await deleteTransaccion(params.id)
                            toast.success('Transaccion eliminada', {
                                position: "bottom-right",
                                style: {
                                    background: "#101010",
                                    color: "#fff"
                                }
                            })

                        navigate('/transacciones')
                    }
                }}
                className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 my-2 rounded-lg'
                >
                    Delete
                </button> // Si params.id existe, entonces muestrame ese boton
            }

            </div>
        </div>
        
    )
}