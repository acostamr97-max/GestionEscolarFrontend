import { API_URL } from '../config/api.js'

/* ============================================================================
   aulaService: llamadas a la API de aulas.

   Todas las rutas de aulas estan protegidas, asi que cada pedido lleva el token
   en el header Authorization con la forma:  "Bearer <token>".
   Por eso cada funcion recibe el token como parametro (se lo pasa el hook).

   Recordatorio de la forma de respuesta del backend: { ok, status, message, data }
   ============================================================================ */

/* Listar todas las aulas (solo director) */
export async function obtenerAulas(token) {
    const respuesta = await fetch(`${API_URL}/aula`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* Listar las aulas del docente logueado (solo docente).
   El backend sabe quien es el docente por el token, no hace falta pasar id. */
export async function obtenerMisAulas(token) {
    const respuesta = await fetch(`${API_URL}/aula/mis-aulas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* Crear un aula. datos = { nombre, docente, turno, descripcion } */
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

/* Actualizar un aula existente. datos = campos a cambiar */
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

/* Eliminar un aula (baja logica en el backend) */
export async function eliminarAula(token, aulaId) {
    const respuesta = await fetch(`${API_URL}/aula/${aulaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}
