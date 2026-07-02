import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetearPassword, entrarConTokenRecuperacion } from '../services/authService.js'
import { useAuth } from './useAuth.js'

export function useRecuperarCuenta() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const cambiarContrasena = async (evento) => {
        evento.preventDefault()
        setError(null)
        setExito(null)
        setCargando(true)

        try {
            const respuesta = await resetearPassword(token, password)

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            setExito(respuesta.message)
            setTimeout(() => navigate('/login'), 2500)

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    const entrarDirecto = async () => {
        setError(null)
        setCargando(true)

        try {
            const respuesta = await entrarConTokenRecuperacion(token)

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            login(respuesta.data.access_token, respuesta.data.user)
            navigate('/home')

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    return {
        token,
        password, setPassword,
        error, exito, cargando,
        cambiarContrasena, entrarDirecto
    }
}
