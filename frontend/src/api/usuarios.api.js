import axios from 'axios'

const usuariosApi = axios.create({
    baseURL: 'https://transacciones-2lp8.onrender.com/api/Usuarios/'
}
)

export const getAllUsuarios = () => usuariosApi.get('/')

export const getUsuario = (usuario) => usuariosApi.get(`/${usuario}`)

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)