import { API_URL } from '../config/api.js'

export async function registrarUsuario(datos) {
    const respuesta = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    return await respuesta.json()
}

export async function loginUsuario(email, password) {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return await respuesta.json()
}

export async function pedirRecuperacion(email) {
    const respuesta = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    return await respuesta.json()
}

export async function resetearPassword(token, password) {
    const respuesta = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
    })
    return await respuesta.json()
}

export async function entrarConTokenRecuperacion(token) {
    const respuesta = await fetch(`${API_URL}/auth/login-recovery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
    })
    return await respuesta.json()
}
