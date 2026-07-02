import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

/* Hook que da acceso comodo al contexto de autenticacion.

   En vez de escribir useContext(AuthContext) en cada componente, escribimos
   useAuth(). Devuelve { token, usuario, login, logout }.

   Ejemplo de uso en un componente:
     const { usuario, logout } = useAuth()
*/
export const useAuth = () => {
    return useContext(AuthContext)
}
