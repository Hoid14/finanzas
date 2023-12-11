import {useNavigate} from 'react-router-dom'
export function TransaccionCard( {transaccion}) {
    
    const navigate = useNavigate()

    return (
        <div style={{background: "blue"}}
        
        onClick={()=>{//Al dar un click a esta tarjeta, navegara hacia esa tarjeta
            navigate(`/transacciones/${transaccion.id}`)
        }}
        >
            <h1>{transaccion.descripcion}</h1>
            <p>{transaccion.tipo}</p>
            <p>{transaccion.monto}</p>
            <hr />
        </div>
    )
}