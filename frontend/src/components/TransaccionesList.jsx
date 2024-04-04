import {TransaccionCard} from './TransaccionCard'
import { useAuth } from "../context/AuthProvider"
export function Transaccioneslist() {

    const {transacciones} = useAuth()


    return (
        <div className="grid grid-cols-3 gap-3">
            {transacciones.map(transaccion=>(
                <TransaccionCard key ={transaccion.id} transaccion={transaccion} />
            ))}
        </div>
        
        
)}