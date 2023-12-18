import { useEffect, useState } from "react"
import {getAllTransacciones} from '../api/transacciones.api'
import {TransaccionCard} from './TransaccionCard'
import {Link, useNavigate, useParams} from 'react-router-dom'
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
    }, [params.user])

    return (
        <div>
            {params.tipo === "todo" && (
                <div>
                    <p className="text-2xl font-bold text-blue-500 my-5 text-center">Gastos e ingresos</p>
                    <div className="grid grid-cols-3 gap-3">
                        {transacciones.map(transaccion=>(
                            <TransaccionCard key ={transaccion.id} transaccion={transaccion} user={params.user}/>
                        ))}
                    </div>
                </div>
            )}
            {params.tipo === "gastos" && (
                <div>
                    <p className="text-2xl font-bold text-blue-500 my-5 text-center">Gastos</p>
                    <div className="grid grid-cols-3 gap-3">
                        {transacciones
                        .filter(transaccion => transaccion.tipo === "Gasto")
                        .map(transaccion=>(
                            <TransaccionCard key ={transaccion.id} transaccion={transaccion} user={params.user}/>
                            
                        ))}
                    </div>
                </div>
            )}
            {params.tipo === "ingresos" && (
                <div>
                    <p className="text-2xl font-bold text-blue-500 my-5 text-center">Ingresos</p>
                    <div className="grid grid-cols-3 gap-3">
                        {transacciones
                        .filter(transaccion => transaccion.tipo === "Ingreso")
                        .map(transaccion=>(
                            <TransaccionCard key ={transaccion.id} transaccion={transaccion} user={params.user}/>
                            
                        ))}
                    </div>
                </div>
            )}
            
            


        </div>
            
        
        
)}