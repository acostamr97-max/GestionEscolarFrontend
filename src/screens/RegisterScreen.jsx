import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister.js'

/* ============================================================================
   RegisterScreen: pantalla de registro de usuario.
   Igual que el login, la logica esta en el hook useRegister. Aca solo se arma
   el formulario y se conecta a ese hook.

   El campo "rol" es un <select> con las 3 opciones que maneja el sistema:
   director, docente y familia.
   ============================================================================ */
export const RegisterScreen = () => {

    const {
        nombre, email, password, role,
        setNombre, setEmail, setPassword, setRole,
        error, exito, cargando,
        manejarRegistro
    } = useRegister()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Crear cuenta
                </h1>

                <form onSubmit={manejarRegistro} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Rol</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="familia">Familia</option>
                            <option value="docente">Docente</option>
                            <option value="director">Director</option>
                        </select>
                    </div>

                    {/* Mensajes de error (rojo) o exito (verde) */}
                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}
                    {exito && (
                        <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                            {exito}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg py-2 font-medium transition-colors"
                    >
                        {cargando ? 'Creando...' : 'Crear cuenta'}
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}
