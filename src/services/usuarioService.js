import { API_URL } from '../config/api.js'

/* ============================================================================
   usuarioService: llamadas a la API de usuarios.
   Por ahora solo necesitamos listar los docentes (para poder elegir a quien
   asignar un aula). Tambien va protegido con token de director.
   ============================================================================ */

/* Obtener la lista de docentes (id, nombre, email) */
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