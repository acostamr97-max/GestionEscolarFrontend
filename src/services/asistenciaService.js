import { API_URL } from '../config/api.js'

/* ============================================================================
   asistenciaService: llamadas a la API de asistencia.
   El docente registra, por fecha, si cada alumno estuvo presente o ausente.
   ============================================================================ */

/* Asistencia de un aula en una fecha concreta.
   fecha es un texto tipo "2026-06-29" (formato YYYY-MM-DD).
   Si no se pasa fecha, el backend usa la de hoy. */
export async function obtenerAsistenciaDeAula(token, aulaId, fecha) {
    /* Armamos la URL con el parametro fecha si se proporciono */
    const url = fecha
        ? `${API_URL}/asistencia/aula/${aulaId}?fecha=${fecha}`
        : `${API_URL}/asistencia/aula/${aulaId}`

    const respuesta = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* Registrar la asistencia de un alumno.
   datos = { alumno, estado, fecha }  (estado: "presente" o "ausente") */
export async function registrarAsistencia(token, datos) {
    const respuesta = await fetch(`${API_URL}/asistencia`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

/* Corregir una asistencia ya registrada (cambiar su estado).
   datos = { estado } */
export async function actualizarAsistencia(token, asistenciaId, datos) {
    const respuesta = await fetch(`${API_URL}/asistencia/${asistenciaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}
