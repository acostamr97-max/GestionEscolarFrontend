import { API_URL } from '../config/api.js'

/* ============================================================================
   alumnoService: llamadas a la API de alumnos.
   Los alumnos pertenecen a un aula. El docente gestiona los de SU aula.
   Todas las rutas van protegidas con token.
   ============================================================================ */

/* Listar los alumnos de un aula */
export async function obtenerAlumnosDeAula(token, aulaId) {
    const respuesta = await fetch(`${API_URL}/alumno/aula/${aulaId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}

/* Agregar un alumno a un aula. datos = { nombre, apellido, dni, aula } */
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

/* Quitar un alumno (baja logica en el backend) */
export async function eliminarAlumno(token, alumnoId) {
    const respuesta = await fetch(`${API_URL}/alumno/${alumnoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await respuesta.json()
}
