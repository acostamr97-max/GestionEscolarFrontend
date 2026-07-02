import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null
    })

    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('usuario')
        return guardado ? JSON.parse(guardado) : null
    })

    const login = (nuevoToken, datosUsuario) => {
        setToken(nuevoToken)
        setUsuario(datosUsuario)
        localStorage.setItem('token', nuevoToken)
        localStorage.setItem('usuario', JSON.stringify(datosUsuario))
    }

    const logout = () => {
        setToken(null)
        setUsuario(null)
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
    }

    return (
        <AuthContext.Provider value={{ token, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
