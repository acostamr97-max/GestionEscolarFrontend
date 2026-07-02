import { createContext, useState } from 'react'

/* ============================================================================
   AuthContext: guarda el estado de autenticacion y lo comparte con toda la app.

   Que es un "Context": una forma de React de compartir datos entre muchos
   componentes sin tener que pasarlos manualmente uno por uno. Aca lo usamos
   para que cualquier pantalla sepa si hay un usuario logueado y quien es.

   Que guardamos:
   - token: el JWT que devuelve el backend al hacer login. Se manda en cada
     pedido protegido.
   - usuario: datos basicos (nombre, rol) para mostrar en pantalla y para
     decidir que puede hacer cada rol.

   Por que tambien usamos localStorage: el estado de React se borra al recargar
   la pagina (F5). Guardando una copia en localStorage, si la usuaria recarga,
   recuperamos el token y no la obligamos a loguearse de nuevo.
   ============================================================================ */

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    /* useState con una funcion: se ejecuta UNA sola vez al iniciar la app.
       Intenta leer el token guardado en localStorage. Si no hay, queda en null. */
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null
    })

    /* Lo mismo para el usuario. Como en localStorage todo se guarda como texto,
       lo parseamos con JSON.parse para volver a tenerlo como objeto. */
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('usuario')
        return guardado ? JSON.parse(guardado) : null
    })

    /* login: se llama cuando el backend nos da un token valido.
       Guarda el token y el usuario tanto en el estado (para usarlos ya)
       como en localStorage (para que sobrevivan a un recargar la pagina). */
    const login = (nuevoToken, datosUsuario) => {
        setToken(nuevoToken)
        setUsuario(datosUsuario)
        localStorage.setItem('token', nuevoToken)
        localStorage.setItem('usuario', JSON.stringify(datosUsuario))
    }

    /* logout: borra todo (cierra la sesion). */
    const logout = () => {
        setToken(null)
        setUsuario(null)
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
    }

    /* Todo lo que pongamos en "value" queda disponible para los componentes
       que usen este contexto (a traves del hook useAuth). */
    return (
        <AuthContext.Provider value={{ token, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
