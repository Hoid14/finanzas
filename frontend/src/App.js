import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TransaccionesPage} from './pages/TransaccionesPage'
import {TransaccionesFormPage} from './pages/TransaccionesFormPage'
import {Navigation} from './components/Navigation'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter basename='/finanzas'>
      <div className="container mx-auto ">
        <Navigation/> {/*Esto crea los botones para ir hacia las rutas*/}
        <Routes>
        {/*
          Definición de ruta en React utilizando React Router.
          La ruta "/transacciones" está mapeada al componente TransaccionesPage
          usando la etiqueta <Route>. Esto establece que cuando la URL coincida
          con "/transacciones", se renderizará el componente TransaccionesPage.
        */}
          <Route path='/' element={<Navigate to='/transacciones' />} /> {/*Esta es la ruta inicial que se muestra, esto me envia a la ruta transacciones*/}
          <Route path="/transacciones" element = {<TransaccionesPage/>} />
          <Route path="/transacciones-create" element = {<TransaccionesFormPage/>} />
          <Route path="/transacciones/:id" element = {<TransaccionesFormPage/>} /> {/*:id = alli va a ir un valor dinamico, los dos puntos representan un marcador de posicion que identifica ese parametro*/}
        </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  )
}

export default App