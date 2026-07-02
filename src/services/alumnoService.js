import { API_URL } from '../config/api.js'

export async function obtenerAlumnosDeAula(token, aulaId) {
    const respuesta = await fetch(`${API_URL}/alumno/aula/${aulaId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function crearAlumno(token, datos) {
    const respuesta = await fetch(`${API_URL}/alumno`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

export async function eliminarAlumno(token, alumnoId) {
    const respuesta = await fetch(`${API_URL}/alumno/${alumnoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}
