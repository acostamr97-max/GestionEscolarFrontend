import { useState, useEffect } from 'react'
import { obtenerAsistenciaDeAula, registrarAsistencia, actualizarAsistencia } from '../services/asistenciaService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useAsistencia: hook con la logica de la asistencia de un aula en una fecha.

   Recibe el aulaId y la fecha. Cuando cambian, trae los registros de asistencia
   de ese aula ese dia. Permite marcar (presente/ausente) y corregir.
   ============================================================================ */
export function useAsistencia(aulaId, fecha) {
    const { token } = useAuth()

    const [asistencias, setAsistencias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    /* Trae la asistencia del aula para la fecha elegida */
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

    /* Se recarga al cambiar de aula o de fecha */
    useEffect(() => {
        cargarAsistencia()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aulaId, fecha])

    /* Marcar la asistencia de un alumno (crear un registro nuevo).
       datos = { alumno, estado, fecha } */
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

    /* Cambiar el estado de una asistencia ya registrada */
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
