import { useState, useEffect } from 'react'
import { obtenerAulas, crearAula, actualizarAula, eliminarAula } from '../services/aulaService.js'
import { obtenerDocentesDisponibles } from '../services/usuarioService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useAulas: hook con TODA la logica de la pantalla de aulas (el CRUD completo).

   Esta es la "plantilla" a copiar para las otras entidades (alumnos, asistencia,
   entrevistas): misma estructura de estados y funciones, cambiando los services.

   Que maneja:
   - aulas: la lista que se muestra.
   - docentes: lista para el <select> al crear/editar un aula.
   - cargando: true mientras se traen los datos.
   - error: mensaje si algo falla.
   - cargarAulas / guardarAula / borrarAula: las acciones del CRUD.

   "CRUD" = Create (crear), Read (leer/listar), Update (editar), Delete (borrar).
   ============================================================================ */
export function useAulas() {
    const { token } = useAuth()   /* el token para mandar en cada pedido */

    const [aulas, setAulas] = useState([])
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    /* ------------------------------------------------------------------
       LEER (Read): traer la lista de aulas del backend.
       ------------------------------------------------------------------ */
    const cargarAulas = async () => {
        setCargando(true)
        setError(null)
        try {
            const respuesta = await obtenerAulas(token)
            if (respuesta.ok) {
                setAulas(respuesta.data.aulas)
            } else {
                setError(respuesta.message)
            }
        } catch (problema) {
            console.error(problema)
            setError('No se pudieron cargar las aulas')
        } finally {
            setCargando(false)
        }
    }

    /* Traer la lista de docentes (para el <select> del formulario) */
    const cargarDocentes = async () => {
        try {
            const respuesta = await obtenerDocentesDisponibles(token)
            if (respuesta.ok) {
                setDocentes(respuesta.data.docentes)
            }
        } catch (problema) {
            console.error(problema)
        }
    }

    /* useEffect con [] se ejecuta UNA vez, cuando la pantalla se muestra por
       primera vez. Lo usamos para cargar los datos iniciales. */
    useEffect(() => {
        cargarAulas()
        cargarDocentes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ------------------------------------------------------------------
       CREAR / EDITAR (Create / Update): una sola funcion para las dos cosas.
       Si recibe un aulaId, edita ese aula; si no, crea una nueva.
       Devuelve true si salio bien (para que la pantalla cierre el formulario).
       ------------------------------------------------------------------ */
    const guardarAula = async (datos, aulaId) => {
        try {
            let respuesta
            if (aulaId) {
                respuesta = await actualizarAula(token, aulaId, datos)
            } else {
                respuesta = await crearAula(token, datos)
            }

            if (!respuesta.ok) {
                setError(respuesta.message)
                return false
            }

            /* Si salio bien, recargamos la lista para ver el cambio */
            await cargarAulas()
            return true

        } catch (problema) {
            console.error(problema)
            setError('No se pudo guardar el aula')
            return false
        }
    }

    /* ------------------------------------------------------------------
       BORRAR (Delete): elimina un aula y recarga la lista.
       ------------------------------------------------------------------ */
    const borrarAula = async (aulaId) => {
        try {
            const respuesta = await eliminarAula(token, aulaId)
            if (!respuesta.ok) {
                setError(respuesta.message)
                return
            }
            await cargarAulas()
        } catch (problema) {
            console.error(problema)
            setError('No se pudo eliminar el aula')
        }
    }

    return {
        aulas,
        docentes,
        cargando,
        error,
        guardarAula,
        borrarAula
    }
}
