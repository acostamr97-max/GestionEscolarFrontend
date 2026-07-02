import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/* ============================================================================
   Navbar: barra superior de las pantallas internas.
   Muestra el nombre y rol del usuario logueado y un boton para cerrar sesion.
   ============================================================================ */
export const Navbar = () => {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    /* Al cerrar sesion: limpiamos el contexto y volvemos al login */
    const manejarLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1
                className="text-lg font-bold text-indigo-700 cursor-pointer"
                onClick={() => navigate('/home')}
            >
                Gestión Escolar
            </h1>

            <div className="flex items-center gap-4">
                {/* usuario?.nombre: el "?." evita un error si usuario fuera null */}
                <span className="text-sm text-gray-600">
                    {usuario?.nombre} <span className="text-gray-400">({usuario?.role})</span>
                </span>

                <button
                    onClick={manejarLogout}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg"
                >
                    Salir
                </button>
            </div>
        </nav>
    )
}
