import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin.js'

/* ============================================================================
   LoginScreen: pantalla de inicio de sesion.

   Fijate que este componente casi NO tiene logica: toda la logica (estados,
   llamada al backend, redireccion) vive en el hook useLogin. Aca solo:
   - sacamos del hook lo que necesitamos,
   - lo mostramos en pantalla,
   - conectamos los inputs y el formulario a las funciones del hook.
   ============================================================================ */
export const LoginScreen = () => {

    /* Traemos todo lo que el hook nos prepara */
    const {
        email, password,
        setEmail, setPassword,
        error, cargando,
        manejarLogin
    } = useLogin()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Iniciar sesión
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Sistema de gestión escolar
                </p>

                {/* onSubmit se dispara al enviar el formulario (boton o Enter) */}
                <form onSubmit={manejarLogin} className="flex flex-col gap-4">

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
                            placeholder="••••••"
                            required
                        />
                    </div>

                    {/* Si hay un error, lo mostramos en rojo */}
                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg py-2 font-medium transition-colors"
                    >
                        {cargando ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                {/* Link para recuperar la contraseña si no puede entrar */}
                <p className="text-sm text-center mt-4">
                    <Link to="/olvide-contrasena" className="text-indigo-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </p>

                <p className="text-sm text-gray-500 text-center mt-6">
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    )
}
