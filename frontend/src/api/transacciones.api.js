import axios from 'axios'

const transaccionesApi = axios.create({
    baseURL: 'https://transacciones-2lp8.onrender.com/api/Transacciones/'
}
)
export const getAllTransacciones = () => transaccionesApi.get('/')

export const createTransaccion = (transaccion) => transaccionesApi.post('/', transaccion)

export const deleteTransaccion = (id) => transaccionesApi.delete(`/${id}`) //Es muy importante que vaya con el id, porque asi es como se consulta en el backend un objeto
