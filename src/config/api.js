/* URL base de la API. Sale del archivo .env (VITE_API_URL).
   Si por algun motivo no esta definida, usa localhost:3000 por defecto.

   La idea de tener esto en un solo lugar: si maniana el backend cambia de
   direccion (ej: cuando lo desplieguen), se toca SOLO aca y no en cada archivo. */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
