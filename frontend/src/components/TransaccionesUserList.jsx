import { useEffect, useState } from "react"
import {getAllTransacciones, getGraficaGastos, getGraficaIngresos} from '../api/transacciones.api'
import {TransaccionCard} from './TransaccionCard'
import {Link, useParams} from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"
export function TransaccionesUserlist() {
    const [transacciones,setTransacciones] = useState([])
    const [graficaGastos, setGraficaGastos] = useState(null)
    const [graficaIngresos,setGraficaIngresos] =useState(null) 
    const params = useParams()
    const { isLogin } = useAuth()
    /*Este useEffect se va a ejecutar apenas cargue la pagina */
    useEffect(() => {
        
        async function loadTransacciones() {
            const res = await getAllTransacciones()
            const transaccionesUser = await res.data.filter(function(transaccion){
                return params.user === transaccion.usuario
            })
            setTransacciones(transaccionesUser)
        }
        loadTransacciones()
    }, [params.user])

    useEffect(() => {
        async function loadGraficas() {
            const res = await getGraficaGastos(params.user,'Gasto','2023')
            await setGraficaGastos(res.data.grafico)
            const res1 = await getGraficaIngresos(params.user,'Ingreso','2023')
            await setGraficaIngresos(res1.data.grafico)
        }
        loadGraficas()
    }, [params])

    


    

    

    

    return (
        <div>
            {isLogin && (
                
                <>
                
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
                {params.tipo === "estadisticas" && (
                    <div>
                        <p className="text-2xl font-bold text-blue-500 my-5 text-center">Estadisticas</p>
                        <div>
                            <div>
                            {graficaGastos &&(
                                <div>
                                    <h2>Gastos</h2>
                                    <img src={`data:image/png;base64,${graficaGastos}`} alt="Gastos por mes" />
                                </div>
                            )}
                            </div>
                            <div>
                            {graficaIngresos &&(
                                <div>
                                    <h2>Ingresos</h2>
                                    <img src={`data:image/png;base64,${graficaIngresos}`} alt="Gastos por mes" />
                                </div>
                            )}
                            </div>
                            
                        </div>
                    </div>
                )}
                </>
            )}
            
            

        </div>
            
        
        
)}