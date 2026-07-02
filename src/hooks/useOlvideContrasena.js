import { useState } from 'react'
import { pedirRecuperacion } from '../services/authService.js'

/* para poder recuoerar la contraseña */
export function useOlvideContrasena() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [cargando, setCargando] = useState(false)

    const manejarEnvio = async (evento) => {
        evento.preventDefault()
        setError(null)
        setExito(null)
        setCargando(true)

        try {
            const respuesta = await pedirRecuperacion(email)

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            setExito(respuesta.message)

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    return { email, setEmail, error, exito, cargando, manejarEnvio }
}
