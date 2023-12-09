import axios from 'axios'
export const getAllTransacciones = () => {
    return axios.get('https://transacciones-2lp8.onrender.com/api/Transacciones/')
}