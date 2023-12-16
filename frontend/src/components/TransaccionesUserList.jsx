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
    }, [])

    return (
        <div>
            <div className='flex flex-col py-3'>
                <div className='flex justify-between'>
                    <div>
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
            <div>
                <div className="grid grid-cols-3 gap-3">
                    {transacciones.map(transaccion=>(
                        <TransaccionCard key ={transaccion.id} transaccion={transaccion} user={params.user}/>
                    ))}
                </div>
            </div>
            


        </div>
            
        
        
)}