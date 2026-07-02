import { useState } from 'react'
import { pedirRecuperacion } from '../services/authService.js'

/* ============================================================================
   useOlvideContrasena: logica de la pantalla "olvidé mi contraseña".
   La persona ingresa su email y el backend le manda un mail con el link.
   ============================================================================ */
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

            /* El backend responde el mismo mensaje exista o no el email
               (para no revelar que cuentas estan registradas). */
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
