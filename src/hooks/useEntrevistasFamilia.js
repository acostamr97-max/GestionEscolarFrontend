import { useState, useEffect } from 'react'
import { crearEntrevista, obtenerMisEntrevistas } from '../services/entrevistaService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useEntrevistasFamilia: logica de la pantalla de entrevistas para la FAMILIA.
   Permite crear una solicitud y ver las propias.
   ============================================================================ */
export function useEntrevistasFamilia() {
    const { token } = useAuth()

    const [entrevistas, setEntrevistas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    /* Trae las entrevistas que solicito esta familia */
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* Crear una solicitud nueva. datos = { fecha, motivo } */
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
