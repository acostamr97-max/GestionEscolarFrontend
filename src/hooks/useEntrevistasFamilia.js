import { useState, useEffect } from 'react'
import { crearEntrevista, obtenerMisEntrevistas } from '../services/entrevistaService.js'
import { useAuth } from './useAuth.js'
/* las familias solivitan entrevistas por ej paraa anotar a su hijo al jardin */
export function useEntrevistasFamilia() {
    const { token } = useAuth()

    const [entrevistas, setEntrevistas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const cargarEntrevistas = async () => {
        setCargando(true)
        setError(null)
        try {
            const respuesta = await obtenerMisEntrevistas(token)
            if (respuesta.ok) {
                setEntrevistas(respuesta.data.entrevistas)
            } else {
                setError(respuesta.message)
            }
        } catch (problema) {
            console.error(problema)
            setError('No se pudieron cargar tus entrevistas')
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarEntrevistas()
    }, [])

    const solicitarEntrevista = async (datos) => {
        try {
            const respuesta = await crearEntrevista(token, datos)
            if (!respuesta.ok) {
                setError(respuesta.message)
                return false
            }
            await cargarEntrevistas()
            return true
        } catch (problema) {
            console.error(problema)
            setError('No se pudo solicitar la entrevista')
            return false
        }
    }

    return { entrevistas, cargando, error, solicitarEntrevista }
}
