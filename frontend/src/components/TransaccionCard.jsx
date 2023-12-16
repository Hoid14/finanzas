import {useNavigate} from 'react-router-dom'
export function TransaccionCard( {transaccion,user}) {
    
    const navigate = useNavigate()

    return (
        <div 

        className='bg-blue-500 p-3 hover:bg-blue-700 hover:cursor-pointer'
        
        onClick={()=>{//Al dar un click a esta tarjeta, navegara hacia esa tarjeta
            navigate(`/${user}/transacciones/${transaccion.id}`)
        }}
        >
            <h1 className='font-bold uppercase'>{transaccion.descripcion}</h1>
            <p className="text-white">{transaccion.tipo}</p>
            <p className="text-white">{transaccion.monto}</p>
        </div>
    )
}