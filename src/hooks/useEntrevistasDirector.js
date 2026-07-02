import { useState, useEffect } from 'react'
import { obtenerTodasLasEntrevistas, actualizarEntrevista } from '../services/entrevistaService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useEntrevistasDirector: logica de la pantalla de entrevistas para el DIRECTOR.
   Lista todas las solicitudes y permite programarlas o cancelarlas.
   ============================================================================ */
export function useEntrevistasDirector() {
    const { token } = useAuth()

    const [entrevistas, setEntrevistas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    /* Trae todas las entrevistas */
    const cargarEntrevistas = async () => {
        setCargando(true)
        setError(null)
        try {
            const respuesta = await obtenerTodasLasEntrevistas(token)
            if (respuesta.ok) {
                setEntrevistas(respuesta.data.entrevistas)
            } else {
                setError(respuesta.message)
            }
        } catch (problema) {
            console.error(problema)
            setError('No se pudieron cargar las entrevistas')
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarEntrevistas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* Cambiar el estado de una entrevista (programada o cancelada).
       estado = "programada" | "cancelada" */
    const cambiarEstado = async (entrevistaId, estado) => {
        try {
            const respuesta = await actualizarEntrevista(token, entrevistaId, { estado })
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }
            await cargarEntrevistas()
        } catch (problema) {
            console.error(problema)
            setError('No se pudo actualizar la entrevista')
        }
    }

    return { entrevistas, cargando, error, cambiarEstado }
}
