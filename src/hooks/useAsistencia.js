import { useState, useEffect } from 'react'
import { obtenerAsistenciaDeAula, registrarAsistencia, actualizarAsistencia } from '../services/asistenciaService.js'
import { useAuth } from './useAuth.js'

export function useAsistencia(aulaId, fecha) {
    const { token } = useAuth()

    const [asistencias, setAsistencias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const cargarAsistencia = async () => {
        if (!aulaId) return
        setCargando(true)
        setError(null)
        try {
            const respuesta = await obtenerAsistenciaDeAula(token, aulaId, fecha)
            if (respuesta.ok) {
                setAsistencias(respuesta.data.asistencias)
            } else {
                setError(respuesta.message)
            }
        } catch (problema) {
            console.error(problema)
            setError('No se pudo cargar la asistencia')
        } finally {
            setCargando(false)
        }
    }

    
    useEffect(() => {
        cargarAsistencia()
    }, [aulaId, fecha])


    const marcarAsistencia = async (alumnoId, estado) => {
        try {
            const respuesta = await registrarAsistencia(token, {
                alumno: alumnoId,
                estado: estado,
                fecha: fecha
            })
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }
            await cargarAsistencia()
        } catch (problema) {
            console.error(problema)
            setError('No se pudo registrar la asistencia')
        }
    }

    const corregirAsistencia = async (asistenciaId, estado) => {
        try {
            const respuesta = await actualizarAsistencia(token, asistenciaId, { estado })
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }
            await cargarAsistencia()
        } catch (problema) {
            console.error(problema)
            setError('No se pudo corregir la asistencia')
        }
    }

    return { asistencias, cargando, error, marcarAsistencia, corregirAsistencia }
}
