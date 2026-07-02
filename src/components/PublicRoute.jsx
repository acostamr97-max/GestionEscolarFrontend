import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export const PublicRoute = ({ children }) => {
    const { token } = useAuth()

    if (token) {
        return <Navigate to='/home' />
    }
    return children
}
