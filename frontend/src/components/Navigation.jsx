import {Link} from 'react-router-dom'
export function Navigation() {
    return(
        <div>
            
            <Link to='/'>
                <h1>Transaccion App</h1>
            </Link>
            <Link to="/transacciones-create">create transaccion</Link>
        </div>
    )
}

