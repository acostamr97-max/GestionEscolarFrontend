# Gestión Escolar — Frontend

Frontend del sistema de gestión escolar, hecho con **React + Vite**. Consume la API del backend (Express + MongoDB) y ofrece pantallas distintas según el rol del usuario: **director**, **docente** y **familia**.

---

## ¿Qué hace la aplicación?

- **Registro y login** de usuarios con verificación por email.
- **Director**: crea, edita y elimina aulas, asigna docentes, y gestiona las solicitudes de entrevista.
- **Docente**: ve las aulas que tiene asignadas, gestiona los alumnos de cada aula y toma asistencia.
- **Familia**: solicita entrevistas y ve el estado de sus solicitudes.

Cada pantalla está protegida: si no hay sesión, redirige al login; y si el rol no corresponde, no deja entrar.

---

## Requisitos previos

- **Node.js 18 o superior** (Vite 6 lo necesita). Para verificar tu versión: `node -v`.
- El **backend corriendo** en `http://localhost:3000` (ver el repositorio del backend).

---

## Cómo levantar el proyecto

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Revisar el archivo `.env` (ya viene incluido). Debe apuntar al backend:

   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir el navegador en la dirección que muestra la terminal (por defecto **http://localhost:5173**).

> Importante: para que la app funcione, el **backend tiene que estar corriendo** en paralelo. Si no, los login y las consultas van a fallar con un error de conexión.

---

## Scripts disponibles

| Comando           | Qué hace                                                        |
|-------------------|----------------------------------------------------------------|
| `npm run dev`     | Levanta el proyecto en modo desarrollo (con recarga automática).|
| `npm run build`   | Genera la versión optimizada para producción (carpeta `dist`).  |
| `npm run preview` | Muestra localmente la versión de producción ya compilada.       |

---

## Tecnologías usadas

- **React** — librería para construir la interfaz.
- **Vite** — herramienta que levanta y compila el proyecto (muy rápida).
- **React Router DOM** — maneja las distintas pantallas/URLs (enrutado).
- **Tailwind CSS v4** — estilos mediante clases utilitarias.
- **Fetch** — para las llamadas a la API (viene incluido en el navegador, sin librerías extra).

---

## Estructura de carpetas

La idea central del proyecto es **separar la lógica de la presentación**. Los componentes solo muestran cosas; la lógica vive en los hooks; y las llamadas al backend, en los services.

```
src/
├── config/
│   └── api.js                 # URL base del backend (un solo lugar para cambiarla)
│
├── context/
│   └── AuthContext.jsx        # Guarda y comparte el token y el usuario logueado
│
├── helpers/
│   └── token.js               # Lee los datos (nombre, rol) que vienen dentro del token
│
├── services/                  # LLAMADAS a la API (con fetch). No tienen lógica de pantalla.
│   ├── authService.js         #   registro y login
│   ├── usuarioService.js      #   listar docentes
│   ├── aulaService.js         #   CRUD de aulas
│   ├── alumnoService.js       #   alumnos de un aula
│   ├── asistenciaService.js   #   asistencia
│   └── entrevistaService.js   #   entrevistas
│
├── hooks/                     # LÓGICA de cada pantalla (estados, acciones, manejo de errores).
│   ├── useAuth.js             #   atajo para acceder al contexto de sesión
│   ├── useLogin.js            #   lógica del login
│   ├── useRegister.js         #   lógica del registro
│   ├── useAulas.js            #   CRUD de aulas (director)
│   ├── useMisAulas.js         #   aulas del docente
│   ├── useAlumnos.js          #   alumnos de un aula
│   ├── useAsistencia.js       #   asistencia de un aula por fecha
│   ├── useEntrevistasFamilia.js   # entrevistas (vista familia)
│   └── useEntrevistasDirector.js  # entrevistas (vista director)
│
├── components/                # Piezas reutilizables de interfaz.
│   ├── Navbar.jsx             #   barra superior con nombre, rol y botón salir
│   ├── ProtectedRoute.jsx     #   bloquea rutas si no hay sesión o el rol no corresponde
│   ├── PanelAlumnos.jsx       #   gestión de alumnos dentro de un aula
│   └── PanelAsistencia.jsx    #   toma de asistencia dentro de un aula
│
├── screens/                   # Las PANTALLAS (lo que ve el usuario en cada URL).
│   ├── LoginScreen.jsx
│   ├── RegisterScreen.jsx
│   ├── VerificarCuentaScreen.jsx
│   ├── HomeScreen.jsx
│   ├── AulasScreen.jsx                # director
│   ├── MisAulasScreen.jsx             # docente
│   ├── EntrevistasFamiliaScreen.jsx   # familia
│   └── EntrevistasDirectorScreen.jsx  # director
│
├── App.jsx                    # Define todas las rutas (URLs) de la app
├── main.jsx                   # Punto de arranque: monta React y envuelve la app
└── index.css                  # Una sola línea: @import "tailwindcss";
```

### ¿Cómo se conectan las capas?

Para cualquier acción, el flujo es siempre el mismo:

```
Pantalla (screen)  →  Hook (lógica)  →  Service (fetch)  →  Backend
```

Por ejemplo, al crear un aula: la pantalla `AulasScreen` toma los datos del formulario y llama a `useAulas`, que usa `aulaService` para hacer el `fetch` al backend. Así, si algo de la API cambia, se toca solo el service; si cambia una regla de pantalla, solo el hook.

---

## Rutas de la aplicación

| URL                       | Quién entra      | Para qué                                      |
|---------------------------|------------------|-----------------------------------------------|
| `/login`                  | Todos            | Iniciar sesión                                |
| `/register`               | Todos            | Crear una cuenta                              |
| `/verificar-cuenta`       | Todos            | Pantalla a la que redirige el mail de verificación |
| `/home`                   | Logueados        | Inicio, con accesos según el rol              |
| `/aulas`                  | Director         | Gestión de aulas (CRUD)                       |
| `/mis-aulas`              | Docente          | Sus aulas, con alumnos y asistencia           |
| `/entrevistas`            | Familia          | Solicitar y ver entrevistas propias           |
| `/entrevistas-director`   | Director         | Gestionar todas las entrevistas               |

---

## Cómo probar el flujo completo

1. Asegurate de tener el **backend corriendo** en el puerto 3000.
2. Registrá un usuario de cada rol (director, docente, familia).
3. Verificá el email de cada uno (con el link que llega al correo).
4. Iniciá sesión con cada rol y revisá que cada uno vea sus pantallas.

> Consejo para la demo: como hace falta tener los tres roles verificados, conviene usar correos reales tuyos al registrarte, así te llegan los links de verificación.

---

## Notas

- El **token de sesión** se guarda en `localStorage`, por lo que la sesión se mantiene aunque recargues la página. Vence a las 3 horas (lo define el backend); pasado ese tiempo hay que volver a iniciar sesión.
- Los estilos usan **Tailwind v4**, que no requiere archivo de configuración (`tailwind.config.js`): todo se maneja desde el plugin de Vite y el `@import "tailwindcss"` del `index.css`.
```
