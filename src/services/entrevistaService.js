import { API_URL } from '../config/api.js'

/* ============================================================================
   entrevistaService: llamadas a la API de entrevistas.
   - La familia crea solicitudes y ve las suyas.
   - El director ve todas y las programa/cancela.
   ============================================================================ */

/* (FAMILIA) Crear una solicitud de entrevista. datos = { fecha, motivo } */
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

/* (FAMILIA) Ver las entrevistas que solicito la familia logueada */
export async function obtenerMisEntrevistas(token) {
    const respuesta = await fetch(`${API_URL}/entrevista/mias`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* (DIRECTOR) Ver todas las entrevistas */
export async function obtenerTodasLasEntrevistas(token) {
    const respuesta = await fetch(`${API_URL}/entrevista`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* (DIRECTOR) Programar o cancelar una entrevista.
   datos = { estado, fecha }  (estado: "programada" o "cancelada") */
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
