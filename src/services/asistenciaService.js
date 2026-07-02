import { API_URL } from '../config/api.js'

export async function obtenerAsistenciaDeAula(token, aulaId, fecha) {
    
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
