export function TransaccionCard( {transaccion}) {
    return (
        <div>
            <h1>{transaccion.descripcion}</h1>
            <p>{transaccion.tipo}</p>
            <p>{transaccion.monto}</p>
            <hr />
        </div>
    )
}