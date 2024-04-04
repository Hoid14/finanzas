import { useAuth } from '../context/AuthProvider'

export const Balance = () => {
    
    const {ingreso,gasto} =useAuth()
    

  return (
    <>
        { ingreso && gasto &&(
        <>
            <div>Ingreso: {ingreso}</div>
            <div> Gasto: {gasto}</div>
            <div>Balance: {ingreso-gasto}</div>
        </>
        )}
    </>
    
    
    

  )
}
