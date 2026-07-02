import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/authService.js'
import { useAuth } from './useAuth.js'

export function useLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    const { login } = useAuth()

    const manejarLogin = async (evento) => {
        evento.preventDefault()

        setError(null)
        setCargando(true)

        try {
            const respuesta = await loginUsuario(email, password)
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            const token = respuesta.data.access_token
            const datosUsuario = respuesta.data.user

            login(token, datosUsuario)

            navigate('/home')

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        error,
        cargando,
        manejarLogin
    }
}
