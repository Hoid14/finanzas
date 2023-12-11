import {useForm} from 'react-hook-form'
import {createTransaccion,deleteTransaccion} from '../api/transacciones.api'
import {useNavigate, useParams} from 'react-router-dom'
export function TransaccionesFormPage(){
    
    const {register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate()
    const params = useParams() // Extrae los parametros de la URL como un objeto JSON(en este caso solo tiene una propiedad "id"), es decir, los marcadores de posicion con dos puntos de App.js
    console.log(params)

    const onSubmit = handleSubmit(async data => { //Cuando se ejecuta handlesubmit, me va a dar datos
       await createTransaccion(data) // data es el formulario que se envia
       navigate('/transacciones') //despues de enviar el formulario, redirecciona hacia transacciones
    })

    return(
        <div>

            <form onSubmit={onSubmit}>
                <input type="text" 
                placeholder="descripcion" 
                {...register("descripcion", 
                {required: true})}/>
                
                {errors.titulo && <span>Titulo es requerido</span>}

                <input type="number" 
                placeholder="ingrese monto" 
                {...register("monto", 
                {required: true, min:0})}/>
                
                {errors.monto && <span>Monto es requerido</span>}


                <select {...register("tipo", { required: true })}>
                    <option value="">Seleccione una opción</option>
                    <option value="Gasto">Gasto</option>
                    <option value="Ingreso">Ingreso</option>
                </select>
                {errors.tipo && <span>Tipo es requerido</span>}
               
                <button>Save</button>
            </form>

            {
                params.id &&
                <button onClick ={async ()=>{
                    const accepted = window.confirm("Estas seguro?")
                    if(accepted){
                        await deleteTransaccion(params.id)
                        navigate('/transacciones')
                    }
                }}
                >
                    Delete
                </button> // Si params.id existe, entonces muestrame ese boton
            }

        </div>
    )
}