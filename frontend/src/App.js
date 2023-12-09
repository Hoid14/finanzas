import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TransaccionesPage} from './pages/TransaccionesPage'
import {TransaccionesFormPage} from './pages/TransaccionesFormPage'
import {Navigation} from './components/Navigation'
function App() {
  return (
    <BrowserRouter basename='/finanzas'>
      
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
      </Routes>
    </BrowserRouter>
  )
}

export default App