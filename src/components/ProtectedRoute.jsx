import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
/* este component pide roles especificos por ej director, si el usuario no tiene ese rol, se lo manda a la home */

export const ProtectedRoute = ({ children, roles }) => {
    const { token, usuario } = useAuth()
    if (!token) {
        return <Navigate to='/login' />
    }
    if (roles && !roles.includes(usuario?.role)) {
        return <Navigate to='/home' />
    }

    return children
}
