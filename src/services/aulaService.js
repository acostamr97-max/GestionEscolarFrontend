import { API_URL } from '../config/api.js'

export async function obtenerAulas(token) {
    const respuesta = await fetch(`${API_URL}/aula`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function obtenerMisAulas(token) {
    const respuesta = await fetch(`${API_URL}/aula/mis-aulas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function crearAula(token, datos) {
    const respuesta = await fetch(`${API_URL}/aula`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

export async function actualizarAula(token, aulaId, datos) {
    const respuesta = await fetch(`${API_URL}/aula/${aulaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

export async function eliminarAula(token, aulaId) {
    const respuesta = await fetch(`${API_URL}/aula/${aulaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}
