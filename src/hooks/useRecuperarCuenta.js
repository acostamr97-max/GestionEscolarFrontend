import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetearPassword, entrarConTokenRecuperacion } from '../services/authService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useRecuperarCuenta: logica de la pantalla a la que lleva el link del mail.

   Esa pantalla ofrece DOS opciones:
   - Cambiar la contrasena (escribe una nueva).
   - Entrar directo (sin cambiarla).

   El token de recuperacion viene en la URL (?token=...). Lo leemos aca y lo
   usamos en las dos acciones.
   ============================================================================ */
export function useRecuperarCuenta() {
    /* El token viaja en la URL: /recuperar-cuenta?token=... */
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    /* OPCION A: cambiar la contrasena */
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
            /* Tras cambiarla, la llevamos al login despues de unos segundos */
            setTimeout(() => navigate('/login'), 2500)

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    /* OPCION B: entrar directo sin cambiar la contrasena */
    const entrarDirecto = async () => {
        setError(null)
        setCargando(true)

        try {
            const respuesta = await entrarConTokenRecuperacion(token)

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            /* Igual que en el login: guardamos sesion y vamos al home */
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
