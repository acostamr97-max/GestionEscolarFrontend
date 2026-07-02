import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { useAuth } from '../hooks/useAuth.js'

/* ============================================================================
   HomeScreen: pantalla principal despues de iniciar sesion.
   Muestra accesos distintos segun el rol del usuario:
   - director: gestion de Aulas y de Entrevistas.
   - docente:  sus aulas (con alumnos y asistencia).
   - familia:  solicitar entrevistas.
   ============================================================================ */
export const HomeScreen = () => {
    const { usuario } = useAuth()

    /* Una "tarjeta" de acceso reutilizable. La usamos varias veces abajo. */
    const Tarjeta = ({ to, emoji, titulo, descripcion }) => (
        <Link
            to={to}
            className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
        >
            <div className="text-3xl mb-2">{emoji}</div>
            <h3 className="font-semibold text-gray-800">{titulo}</h3>
            <p className="text-sm text-gray-500">{descripcion}</p>
        </Link>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Hola, {usuario?.nombre} 👋
                </h2>
                <p className="text-gray-500 mb-8">
                    Ingresaste como <span className="font-medium">{usuario?.role}</span>.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">

                    {/* --- Accesos del DIRECTOR --- */}
                    {usuario?.role === 'director' && (
                        <>
                            <Tarjeta
                                to="/aulas"
                                emoji="🏫"
                                titulo="Aulas"
                                descripcion="Crear, editar y eliminar aulas, y asignar docentes."
                            />
                            <Tarjeta
                                to="/entrevistas-director"
                                emoji="📅"
                                titulo="Entrevistas"
                                descripcion="Ver las solicitudes de las familias y programarlas o cancelarlas."
                            />
                        </>
                    )}

                    {/* --- Acceso del DOCENTE --- */}
                    {usuario?.role === 'docente' && (
                        <Tarjeta
                            to="/mis-aulas"
                            emoji="📚"
                            titulo="Mis aulas"
                            descripcion="Ver tus aulas, gestionar alumnos y tomar asistencia."
                        />
                    )}

                    {/* --- Acceso de la FAMILIA --- */}
                    {usuario?.role === 'familia' && (
                        <Tarjeta
                            to="/entrevistas"
                            emoji="🗓️"
                            titulo="Entrevistas"
                            descripcion="Solicitar una entrevista y ver el estado de tus solicitudes."
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
