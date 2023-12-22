import axios from 'axios'

const usuariosApi = axios.create({
    //baseURL: 'https://transacciones-2lp8.onrender.com/api/Usuarios/'
    baseURL: 'http://127.0.0.1:8000/api/Usuarios/'
}
)

export const getAllUsuarios = () => usuariosApi.get('/')

export const getUsuario = (usuario) => usuariosApi.get(`/${usuario}`)

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)