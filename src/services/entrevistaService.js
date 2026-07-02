import { API_URL } from '../config/api.js'

export async function crearEntrevista(token, datos) {
    const respuesta = await fetch(`${API_URL}/entrevista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

export async function obtenerMisEntrevistas(token) {
    const respuesta = await fetch(`${API_URL}/entrevista/mias`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function obtenerTodasLasEntrevistas(token) {
    const respuesta = await fetch(`${API_URL}/entrevista`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function actualizarEntrevista(token, entrevistaId, datos) {
    const respuesta = await fetch(`${API_URL}/entrevista/${entrevistaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}
