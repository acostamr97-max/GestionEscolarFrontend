import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/authService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useLogin: hook con TODA la logica de la pantalla de login.

   La idea (que pidio la consigna): el componente de pantalla solo se ocupa de
   mostrar cosas; la logica vive aca en el hook. El componente va a usar lo que
   este hook devuelve.

   Devuelve:
   - email, password: los valores de los inputs.
   - setEmail, setPassword: para actualizarlos cuando la usuaria escribe.
   - error: mensaje de error a mostrar (o null si no hay).
   - cargando: true mientras se espera la respuesta del backend (para deshabilitar
     el boton y mostrar "Ingresando...").
   - manejarLogin: funcion que se dispara al enviar el formulario.
   ============================================================================ */
export function useLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    /* navigate sirve para cambiar de pantalla por codigo (sin que la usuaria
       haga click en un link). Lo usamos para mandarla al home tras loguearse. */
    const navigate = useNavigate()

    /* login viene del contexto: guarda el token y el usuario en toda la app. */
    const { login } = useAuth()

    const manejarLogin = async (evento) => {
        /* evita que el formulario recargue la pagina (comportamiento por defecto) */
        evento.preventDefault()

        setError(null)
        setCargando(true)

        try {
            /* 1. Llamamos al backend con el service */
            const respuesta = await loginUsuario(email, password)

            /* 2. Si el backend dice que algo salio mal (ok: false), mostramos su mensaje */
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            /* 3. Sacamos el token y los datos del usuario de la respuesta.
                  El backend ya nos manda el usuario listo (nombre, email, role),
                  asi que no hace falta leerlo del token. */
            const token = respuesta.data.access_token
            const datosUsuario = respuesta.data.user

            /* 4. Guardamos token + usuario en el contexto (y en localStorage) */
            login(token, datosUsuario)

            /* 5. Llevamos a la usuaria al home */
            navigate('/home')

        } catch (problema) {
            /* Este catch salta si falla la conexion (ej: backend apagado) */
            console.error(problema)
            setError('No se pudo conectar con el servidor')
        } finally {
            /* Pase lo que pase, dejamos de mostrar "cargando" */
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
