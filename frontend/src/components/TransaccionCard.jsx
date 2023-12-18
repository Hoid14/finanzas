import {useNavigate} from 'react-router-dom'
export function TransaccionCard( {transaccion,user}) {
    
    const navigate = useNavigate()

    return (
        <div 

        className='bg-blue-500 p-3 hover:bg-blue-700 hover:cursor-pointer m-6'
        
        onClick={()=>{//Al dar un click a esta tarjeta, navegara hacia esa tarjeta
            navigate(`/${user}/transacciones/actualizar/${transaccion.id}`)
        }}
        >
            <h1 className='font-bold uppercase'>{transaccion.descripcion}</h1>
            <p className="text-white">{transaccion.tipo}</p>
            <p className="text-white">{transaccion.fecha}</p>
            <p className="text-white"><span className='font-bold'>Monto:</span> {transaccion.monto}</p>
        </div>
    )
}