import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/* ============================================================================
   PublicRoute: lo opuesto a ProtectedRoute.

   Envuelve las pantallas que SOLO tienen sentido cuando NO hay sesion:
   login y registro. Si la persona ya esta logueada y entra a /login o
   /register (escribiendo la URL o por un link viejo), no tiene sentido
   mostrarle el formulario: la mandamos directo al /home.

   Asi evitamos el caso raro de "estoy logueada pero veo la pantalla de login".

   Uso en App.jsx:
     <PublicRoute>
        <LoginScreen />
     </PublicRoute>
   ============================================================================ */
export const PublicRoute = ({ children }) => {
    const { token } = useAuth()

    /* Si YA hay sesion, no mostramos login/registro: vamos al home. */
    if (token) {
        return <Navigate to='/home' />
    }

    /* Sin sesion: mostramos la pantalla publica (login o registro). */
    return children
}
