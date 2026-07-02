import { Link, useSearchParams } from 'react-router-dom'

/* ============================================================================
   VerificarCuentaScreen: pantalla a la que el BACKEND redirige despues de
   procesar el link de verificacion del email.

   El backend agrega a la URL un parametro ?estado=... y aca lo leemos con el
   hook useSearchParams para mostrar el mensaje correcto.

   Estados que manda el backend: ok | ya-verificado | expirado | error
   ============================================================================ */
export const VerificarCuentaScreen = () => {

    /* useSearchParams nos deja leer los parametros de la URL (lo que va despues
       del "?"). Ej: en /verificar-cuenta?estado=ok, estado vale "ok". */
    const [searchParams] = useSearchParams()
    const estado = searchParams.get('estado')

    /* Para cada estado posible definimos que mostrar */
    const contenidos = {
        'ok': {
            emoji: '✅',
            titulo: '¡Cuenta verificada!',
            mensaje: 'Tu correo fue verificado correctamente. Ya podés iniciar sesión.',
            color: 'text-green-700'
        },
        'ya-verificado': {
            emoji: 'ℹ️',
            titulo: 'La cuenta ya estaba verificada',
            mensaje: 'Tu correo ya había sido verificado antes. Podés iniciar sesión normalmente.',
            color: 'text-sky-700'
        },
        'expirado': {
            emoji: '⌛',
            titulo: 'El enlace expiró',
            mensaje: 'El link de verificación venció o no es válido. Volvé a registrarte para recibir uno nuevo.',
            color: 'text-orange-700'
        },
        'error': {
            emoji: '⚠️',
            titulo: 'Algo salió mal',
            mensaje: 'No pudimos verificar tu cuenta. Intentá nuevamente más tarde.',
            color: 'text-red-700'
        }
    }

    /* Si el estado no es ninguno conocido, mostramos "error" por las dudas */
    const data = contenidos[estado] || contenidos['error']

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">

                <div className="text-5xl mb-3">{data.emoji}</div>

                <h1 className={`text-xl font-bold mb-2 ${data.color}`}>
                    {data.titulo}
                </h1>

                <p className="text-gray-600 mb-6">
                    {data.mensaje}
                </p>

                <Link
                    to="/login"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-2.5 font-medium transition-colors"
                >
                    Ir a iniciar sesión
                </Link>
            </div>
        </div>
    )
}
