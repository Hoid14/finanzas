import { useEffect, useState } from 'react'
import { getBalance } from '../api/transacciones.api'
import { useParams} from 'react-router-dom'

export const Balance = () => {
  const params = useParams()
  
    const [ingreso, setIngreso] = useState(0)
    const [gasto, setGasto] = useState(0)
    useEffect(() => {
          async function loadBalance() {
          const gasto = await getBalance(params.user,'Gasto','2023')
          await setGasto(gasto.data.suma)
          const ingreso = await getBalance(params.user,'Ingreso','2023')
          await setIngreso(ingreso.data.suma)
          
      }
      loadBalance()
      
      
  },[])

  console.log("i",ingreso)
  console.log("g",gasto)

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
