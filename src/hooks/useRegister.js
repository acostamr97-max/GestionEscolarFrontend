import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/authService.js'

export function useRegister() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('familia')   

    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)       
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    const manejarRegistro = async (evento) => {
        evento.preventDefault()
        setError(null)
        setExito(null)
        setCargando(true)

        try {
            const respuesta = await registrarUsuario({ nombre, email, password, role })

            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }

            setExito('Cuenta creada. Revisá tu correo para verificar la cuenta antes de iniciar sesión.')

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
