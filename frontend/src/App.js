import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TransaccionesPage} from './pages/TransaccionesPage'
import {TransaccionesFormPage} from './pages/TransaccionesFormPage'
import {Navigation} from './components/Navigation'
import {AuthProvider} from './context/AuthProvider'
import {NavigationMainPageBar} from './components/NavigationMainPageBar'
import {LoginFormPage} from './pages/LoginFormPage'
import {RegisterFormPage} from './pages/RegisterFormPage'
import {Inicio} from './pages/Inicio'
import {Toaster} from 'react-hot-toast'
import {useParams} from 'react-router-dom'

function App() {
  const params = useParams()

  return (
    
    <BrowserRouter basename='/finanzas'>
      <div className="container mx-auto ">
        <AuthProvider>
          <NavigationMainPageBar/> {/*Esto crea los botones para ir hacia las rutas*/}
          <Routes>
          {/*
            Definición de ruta en React utilizando React Router.
            La ruta "/transacciones" está mapeada al componente TransaccionesPage
            usando la etiqueta <Route>. Esto establece que cuando la URL coincida
            con "/transacciones", se renderizará el componente TransaccionesPage.
          */}
            <Route path='/' element={<Navigate to='/inicio' />} /> {/*Esta es la ruta inicial que se muestra, esto me envia a la ruta transacciones*/}
            <Route path='/inicio' element={<Inicio/>}/>
            <Route path='/register' element={<RegisterFormPage/>} />
            <Route path='/login' element={<LoginFormPage/>} />
            <Route path="/:user/transacciones/:tipo" element = {<TransaccionesPage/>} />
            <Route path="/:user/transacciones-create" element = {<TransaccionesFormPage/>} />
            <Route path="/:user/transacciones/actualizar/:id" element = {<TransaccionesFormPage/>} /> {/*:id = alli va a ir un valor dinamico, los dos puntos representan un marcador de posicion que identifica ese parametro*/}
            
          </Routes>
          
          <Toaster/>
        </AuthProvider>
      
      </div>
    </BrowserRouter>
  )
}

export default App