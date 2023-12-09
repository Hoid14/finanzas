import { useEffect, useState } from "react"
import {getAllTransacciones} from '../api/transacciones.api'
import {TransaccionCard} from './TransaccionCard'
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
                <TransaccionCard key ={transaccion.id} transaccion={transaccion} />
            ))}
        </div>
        
        
)}