import { Link } from 'react-router-dom'
import { useRecuperarCuenta } from '../hooks/useRecuperarCuenta.js'

/* ============================================================================
   RecuperarCuentaScreen: pantalla a la que lleva el link del mail.
   Ofrece dos opciones:
     A) Cambiar la contraseña (formulario con la nueva).
     B) Entrar directo (sin cambiarla).
   El token viene en la URL y lo maneja el hook useRecuperarCuenta.
   ============================================================================ */
export const RecuperarCuentaScreen = () => {
    const {
        token,
        password, setPassword,
        error, exito, cargando,
        cambiarContrasena, entrarDirecto
    } = useRecuperarCuenta()

    /* Si no vino token en la URL, el link es invalido */
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
                    <div className="text-5xl mb-3">⚠️</div>
                    <h1 className="text-xl font-bold text-red-700 mb-2">Enlace inválido</h1>
                    <p className="text-gray-600 mb-6">
                        Faltan datos en el enlace. Pedí uno nuevo desde la pantalla de login.
                    </p>
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Recuperar acceso
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Elegí qué querés hacer.
                </p>

                {/* OPCION A: cambiar la contraseña */}
                <form onSubmit={cambiarContrasena} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                    )}
                    {exito && (
                        <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">{exito}</p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg py-2 font-medium transition-colors"
                    >
                        {cargando ? 'Guardando...' : 'Cambiar contraseña'}
                    </button>
                </form>

                {/* Separador */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400">o</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* OPCION B: entrar directo */}
                <button
                    onClick={entrarDirecto}
                    disabled={cargando}
                    className="w-full bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-700 rounded-lg py-2 font-medium transition-colors"
                >
                    Entrar sin cambiar la contraseña
                </button>

                <p className="text-sm text-gray-500 text-center mt-6">
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Volver al inicio de sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}
