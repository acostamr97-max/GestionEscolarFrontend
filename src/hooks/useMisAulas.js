import { useState, useEffect } from 'react'
import { obtenerMisAulas } from '../services/aulaService.js'
import { useAuth } from './useAuth.js'

/* ============================================================================
   useMisAulas: hook para la vista del docente.
   Trae las aulas que tiene asignadas el docente logueado.
   ============================================================================ */
export function useMisAulas() {
    const { token } = useAuth()

    const [aulas, setAulas] = useState([])
    const [cargandoAulas, setCargandoAulas] = useState(true)
    const [errorAulas, setErrorAulas] = useState(null)

    useEffect(() => {
        const cargar = async () => {
            setCargandoAulas(true)
            setErrorAulas(null)
            try {
                const respuesta = await obtenerMisAulas(token)
                if (respuesta.ok) {
                    setAulas(respuesta.data.aulas)
                } else {
                    setErrorAulas(respuesta.message)
                }
            } catch (problema) {
                console.error(problema)
                setErrorAulas('No se pudieron cargar tus aulas')
            } finally {
                setCargandoAulas(false)
            }
        }
        cargar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { aulas, cargandoAulas, errorAulas }
}
