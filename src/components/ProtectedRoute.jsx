import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/* ============================================================================
   ProtectedRoute: "envoltorio" para proteger pantallas.

   Se usa en App.jsx envolviendo a una pantalla. Hace dos chequeos:

   1. Si NO hay token (nadie logueado) -> redirige al /login.
   2. Si la ruta pide roles especificos (ej: solo 'director') y el usuario no
      tiene ese rol -> lo manda al /home.

   Si pasa los chequeos, muestra la pantalla (children = lo que esta adentro).

   Ejemplo de uso en App.jsx:
     <ProtectedRoute roles={['director']}>
        <AulasScreen />
     </ProtectedRoute>
   ============================================================================ */
export const ProtectedRoute = ({ children, roles }) => {
    const { token, usuario } = useAuth()

    /* Sin token = sin sesion -> al login.
       <Navigate> es la forma de react-router de redirigir desde un componente. */
    if (!token) {
        return <Navigate to='/login' />
    }

    /* Si se paso una lista de roles permitidos y el usuario no esta en ella,
       no tiene permiso para ver esta pantalla -> lo mandamos al home. */
    if (roles && !roles.includes(usuario?.role)) {
        return <Navigate to='/home' />
    }

    /* Todo ok: mostramos la pantalla protegida */
    return children
}
