import { useEffect, useState } from "react"
import {getAllTransacciones} from '../api/transacciones.api'
import {TransaccionCard} from './TransaccionCard'
import {useNavigate, useParams} from 'react-router-dom'
export function TransaccionesUserlist() {
    const [transacciones,setTransacciones] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    /*Este useEffect se va a ejecutar apenas cargue la pagina */
    useEffect(() => {
        
        async function loadTransacciones() {
            const res = await getAllTransacciones()
            console.log("res",res)
            const transaccionesUser = res.data.filter(function(transaccion){
                return params.user === transaccion.usuario
            })
            console.log("Estas son las transacciones del usuario",transaccionesUser)
            setTransacciones(transaccionesUser)
        }
        loadTransacciones()
    }, [])

    return (
        <div className="grid grid-cols-3 gap-3">
            {transacciones.map(transaccion=>(
                <TransaccionCard key ={transaccion.id} transaccion={transaccion} />
            ))}
        </div>
        
        
)}