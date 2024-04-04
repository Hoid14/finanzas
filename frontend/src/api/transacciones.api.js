import axios from 'axios'

const transaccionesApi = axios.create({
    //baseURL: 'https://transacciones-2lp8.onrender.com/api/Transacciones/'
    baseURL: 'http://127.0.0.1:8000/api/Transacciones/'
}
)
export const getAllTransacciones = () => transaccionesApi.get('/')

export const getTransaccion = (id) => transaccionesApi.get(`/${id}/`)

export const createTransaccion = (transaccion) => transaccionesApi.post('/', transaccion)

export const deleteTransaccion = (id) => transaccionesApi.delete(`/${id}`) //Es muy importante que vaya con el id, porque asi es como se consulta en el backend un objeto

export const updateTransaccion = (id, transaccion) => transaccionesApi.put(`/${id}/`,transaccion)

//obtener grafico

export const getGraficaGastos = (usuario, tipo, year) => transaccionesApi.get(`/estadisticas/${usuario}/${tipo}/${year}/`)

export const getGraficaIngresos = (usuario, tipo, year) => transaccionesApi.get(`/estadisticas/${usuario}/${tipo}/${year}/`)

//balance
//http://127.0.0.1:8000/api/Transacciones/suma/hoid/Gasto/2023/
export const getBalance = (usuario, tipo, year) => transaccionesApi.get(`/suma/${usuario}/${tipo}/${year}/`)
