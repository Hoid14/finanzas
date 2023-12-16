// Esto iba en el componente Navigation
import {Link, useLocation} from 'react-router-dom'

export function NavigationMainPageBar() {
    const location = useLocation() //Guarda la ruta actual
    const isNavBarMain = /^(\/inicio|\/register|\/login)$/.test(location.pathname)
    return(
            <div>
                {isNavBarMain && (
                    <div className='flex flex-col py-3'>
                        <div className='flex justify-between'>
                            <div>
                                <Link to='/'>
                                    <h1 className='font-bold text-3xl mb-4'>Transaccion App</h1>
                                </Link>
                            </div>
                            <div>
                                <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg mr-4'>
                                    <Link to="/register">Registro de usuario</Link>
                                </button>
                                <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg'>
                                    <Link to="/login">Login</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
                
            )
    }

    
