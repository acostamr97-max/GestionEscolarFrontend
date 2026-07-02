import { useState, useEffect } from 'react'
import { obtenerAlumnosDeAula, crearAlumno, eliminarAlumno } from '../services/alumnoService.js'
import { useAuth } from './useAuth.js'
/* los alumnos de este nivel (nivel inicial )pertenecen a un aula/sala */

export function useAlumnos(aulaId) {
    const { token } = useAuth()

    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const cargarAlumnos = async () => {
        if (!aulaId) return   
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
    }, [aulaId])

    /* Agregar un alumno al aula actual. datos = { nombre, apellido, dni-opcional-(null) } */
    const agregarAlumno = async (datos) => {
        try {
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
