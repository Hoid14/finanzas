import {Link} from 'react-router-dom'
export function Navigation() {
    return(
        <div className='flex justify-between py-3'>
            <Link to='/'>
                <h1 className='font-bold text-3xl mb-4'>Transaccion App</h1>
            </Link>
        <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg'>
            <Link to="/transacciones-create">crear transaccion</Link>
        </button>
            
        </div>
    )
}

