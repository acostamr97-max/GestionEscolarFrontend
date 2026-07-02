import { API_URL } from '../config/api.js'

export async function obtenerDocentes(token) {
    const respuesta = await fetch(`${API_URL}/usuario/docentes`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

export async function obtenerDocentesDisponibles(token) {
     const respuesta = await fetch(`${API_URL}/usuario/docentes-disponibles`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}