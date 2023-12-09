import { useEffect, useState } from "react"
import {getAllTransacciones} from '../api/transacciones.api'
export function Transaccioneslist() {
    const [transacciones,setTransacciones] = useState([])

    /*Este useEffect se va a ejecutar apenas cargue la pagina */
    useEffect(() => {
        
        async function loadTransacciones() {
            const res = await getAllTransacciones()
            console.log(res.data)
            setTransacciones(res.data)
        }
        loadTransacciones()
    }, [])

    return (
        <div>
            {transacciones.map(transaccion=>(
                <div>
                    <h1>{transaccion.tipo}</h1>
                    <p>{transaccion.descripcion}</p>
                    <p>{transaccion.monto}</p>
                </div>
            ))}
        </div>
        
        
)}