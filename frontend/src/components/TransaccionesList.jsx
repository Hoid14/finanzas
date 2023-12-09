import { useEffect } from "react"
import {getAllTransacciones} from '../api/transacciones.api'
export function Transaccioneslist() {

    {/*Este useEffect se va a ejecutar apenas cargue la pagina */}
    useEffect(() => {
        
        async function loadTransacciones() {
            const res = await getAllTransacciones()
            console.log(res)
        }
        loadTransacciones()
    }, [])

    return (
        <div>TransaccionesList</div>
    )
}