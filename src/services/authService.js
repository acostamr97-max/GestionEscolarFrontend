import { API_URL } from '../config/api.js'

/* ============================================================================
   authService: funciones que hablan con la API de autenticacion.

   Un "service" se encarga SOLO de hacer el pedido al backend (con fetch) y
   devolver la respuesta. No tiene logica de pantallas ni de estado: eso vive
   en los hooks y componentes. Asi, si cambia la API, se toca solo aca.

   Todas las funciones devuelven el JSON que responde el backend, que tiene
   siempre la forma: { ok, status, message, data }
   ============================================================================ */

/* REGISTRO: crea una cuenta nueva.
   Recibe un objeto con { nombre, email, password, role }. */
export async function registrarUsuario(datos) {
    const respuesta = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

/* LOGIN: valida email y password.
   Si todo va bien, el backend devuelve en data:
     - access_token: el token para los pedidos protegidos.
     - user: los datos del usuario (id, nombre, email, role). */
export async function loginUsuario(email, password) {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return await respuesta.json()
}

/* RECUPERACION - paso 1: pedir el mail de recuperacion.
   Recibe el email; el backend manda un mail con el link (si el email existe). */
export async function pedirRecuperacion(email) {
    const respuesta = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    return await respuesta.json()
}

/* RECUPERACION - opcion A: cambiar la contrasena.
   Recibe el token (que viene en el link del mail) y la contrasena nueva. */
export async function resetearPassword(token, password) {
    const respuesta = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
    })
    return await respuesta.json()
}

/* RECUPERACION - opcion B: entrar directo sin cambiar la contrasena.
   Recibe el token del link y devuelve una sesion normal (access_token + user). */
export async function entrarConTokenRecuperacion(token) {
    const respuesta = await fetch(`${API_URL}/auth/login-recovery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
    })
    return await respuesta.json()
}
