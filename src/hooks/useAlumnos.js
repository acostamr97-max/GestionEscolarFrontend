import { useState, useEffect } from 'react'
import { obtenerAlumnosDeAula, crearAlumno, eliminarAlumno } from '../services/alumnoService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useAlumnos: hook con la logica de los alumnos de UN aula.

   Recibe el aulaId como parametro porque los alumnos siempre pertenecen a un
   aula. Cuando ese aulaId cambia (el docente elige otra aula), se vuelven a
   cargar los alumnos correspondientes.
   ============================================================================ */
export function useAlumnos(aulaId) {
    const { token } = useAuth()

    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    /* Trae los alumnos del aula actual */
    const cargarAlumnos = async () => {
        if (!aulaId) return   /* si todavia no se eligio aula, no hacemos nada */
        setCargando(true)
        setError(null)
        try {
            const respuesta = await obtenerAlumnosDeAula(token, aulaId)
            if (respuesta.ok) {
                setAlumnos(respuesta.data.alumnos)
            } else {
                setError(respuesta.message)
            }
        } catch (problema) {
            console.error(problema)
            setError('No se pudieron cargar los alumnos')
        } finally {
            setCargando(false)
        }
    }

    /* Se ejecuta cada vez que cambia aulaId (al elegir otra aula) */
    useEffect(() => {
        cargarAlumnos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aulaId])

    /* Agregar un alumno al aula actual. datos = { nombre, apellido, dni } */
    const agregarAlumno = async (datos) => {
        try {
            /* Sumamos el aula actual a los datos antes de mandar */
            const respuesta = await crearAlumno(token, { ...datos, aula: aulaId })
            if (!respuesta.ok) {
                setError(respuesta.message)
                return false
            }
            await cargarAlumnos()
            return true
        } catch (problema) {
            console.error(problema)
            setError('No se pudo agregar el alumno')
            return false
        }
    }

    /* Quitar un alumno */
    const quitarAlumno = async (alumnoId) => {
        try {
            const respuesta = await eliminarAlumno(token, alumnoId)
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }
            await cargarAlumnos()
        } catch (problema) {
            console.error(problema)
            setError('No se pudo quitar el alumno')
        }
    }

    return { alumnos, cargando, error, agregarAlumno, quitarAlumno, setAlumnos }
}
