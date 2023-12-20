// Esto iba en el componente Navigation
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthProvider'
export function NavigationMainPageBar() {
    const {isLogin, user, logoutAuth} =useAuth()

    return(
            <div>
                {!isLogin && (
                    <div className='bg-gray-800 text-white py-3'>
                            <div className='container mx-auto flex justify-between items-center'>
                                <div className='ml-4'>
                                    <Link to='/' className='text-3xl font-bold'>
                                    Transaccion App
                                    </Link>
                                </div>
                        
                                <div className='flex items-center mr-4'>
                                    <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg mr-4'>
                                    <Link to='/ingresando/register'>Registro de usuario</Link>
                                    </button>
                                    <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-lg'>
                                    <Link to='/ingresando/login'>Login</Link>
                                    </button>
                                </div>
                            </div>
                    </div>
                )}
                {isLogin && (
                    <div className='flex flex-col py-3'>
                        <div className='container mx-auto flex justify-between items-center bg-gray-800 text-white py-3 h-full'>
                            <div className='ml-4'>
                                <Link to={`/${user.usuario}/transacciones/${"todo"}`} className='text-3xl font-bold'>
                                Transaccion App
                                </Link>
                            </div>

                            <div className='flex items-center mr-4'>
                                <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 mx-3 rounded-lg'>
                                <Link to={`/${user.usuario}/transacciones-create`}>Ingresar transacción</Link>
                                </button>
                                <button onClick={logoutAuth} className='bg-red-600 hover:bg-red-800 text-white font-bold px-3 py-2 rounded-lg'>
                                <Link to="/">Cerrar sesión</Link>
                                </button>
                            </div>
                        </div>

                        <p class="text-2xl font-bold text-blue-500 mb-5 text-center">Hola {user.nombre}</p>

                        <div className='px-3 flex justify-center'>
                            <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 mx-3 rounded-lg'>
                                <Link to={`/${user.usuario}/transacciones/${"todo"}`}>Mostrar todo</Link>
                            </button>
                            <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 mx-3 rounded-lg'>
                                <Link to={`/${user.usuario}/transacciones/${"gastos"}`}>Mostrar gastos</Link>
                            </button>
                            <button className='bg-gray-800 hover:bg-gray-600 text-white font-bold px-3 py-2 mx-3 rounded-lg'>
                                <Link to={`/${user.usuario}/transacciones/${"ingresos"}`}>Mostrar ingresos</Link>
                            </button>
                        </div>
                    </div>
                    
                )}

                </div>
                
            )
    }

    
