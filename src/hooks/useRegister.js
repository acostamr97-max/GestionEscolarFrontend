import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/authService.js'

/* ============================================================================
   useRegister: hook con la logica de la pantalla de registro.

   Maneja los 4 campos del formulario (nombre, email, password, role),
   el estado de carga, los mensajes de error y de exito, y la llamada al backend.
   ============================================================================ */
export function useRegister() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('familia')   /* rol elegido por defecto */

    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)        /* mensaje cuando sale bien */
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    const manejarRegistro = async (evento) => {
        evento.preventDefault()
        setError(null)
        setExito(null)
        setCargando(true)

        try {
            /* Mandamos los datos al backend. role es uno de: director, docente, familia */
            const respuesta = await registrarUsuario({ nombre, email, password, role })

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            /* Registro ok: el backend ya envio el mail de verificacion.
               Mostramos un mensaje avisando que revise el correo. */
            setExito('Cuenta creada. Revisá tu correo para verificar la cuenta antes de iniciar sesión.')

            /* Esperamos unos segundos y la llevamos al login */
            setTimeout(() => {
                navigate('/login')
            }, 3000)

        } catch (problema) {
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    return {
        nombre, email, password, role,
        setNombre, setEmail, setPassword, setRole,
        error, exito, cargando,
        manejarRegistro
    }
}
