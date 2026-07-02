import { Link } from 'react-router-dom'
import { useOlvideContrasena } from '../hooks/useOlvideContrasena.js'

/* ============================================================================
   OlvideContrasenaScreen: pantalla donde la persona ingresa su email para
   recibir el mail de recuperacion.
   ============================================================================ */
export const OlvideContrasenaScreen = () => {
    const { email, setEmail, error, exito, cargando, manejarEnvio } = useOlvideContrasena()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Recuperar cuenta
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Ingresá tu email y te enviaremos un enlace.
                </p>

                <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
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
                        {cargando ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Volver al inicio de sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}
