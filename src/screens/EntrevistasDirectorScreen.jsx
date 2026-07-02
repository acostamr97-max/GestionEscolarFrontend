import { Navbar } from '../components/Navbar.jsx'
import { useEntrevistasDirector } from '../hooks/useEntrevistasDirector.js'

/* ============================================================================
   EntrevistasDirectorScreen: pantalla de entrevistas para el rol DIRECTOR.
   Lista todas las solicitudes y permite programarlas o cancelarlas.
   ============================================================================ */
export const EntrevistasDirectorScreen = () => {
    const { entrevistas, cargando, error, cambiarEstado } = useEntrevistasDirector()

    const colorEstado = (estado) => {
        if (estado === 'programada') return 'text-green-600'
        if (estado === 'cancelada') return 'text-red-600'
        return 'text-orange-600'   /* pendiente */
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Entrevistas solicitadas</h2>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
                )}

                {cargando ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : entrevistas.length === 0 ? (
                    <p className="text-gray-500">No hay entrevistas solicitadas.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {entrevistas.map((entrevista) => (
                            <div
                                key={entrevista._id}
                                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                            >
                                <div>
                                    {/* La familia viene populada desde el backend */}
                                    <p className="font-medium text-gray-800">
                                        {entrevista.familia?.nombre || 'Familia'}
                                        <span className="text-gray-400 text-sm"> · {entrevista.familia?.email}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(entrevista.fecha).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">{entrevista.motivo || 'Sin motivo'}</p>
                                    <p className={'text-sm font-medium mt-1 ' + colorEstado(entrevista.estado)}>
                                        Estado: {entrevista.estado}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => cambiarEstado(entrevista._id, 'programada')}
                                        className="text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-3 py-1.5"
                                    >
                                        Programar
                                    </button>
                                    <button
                                        onClick={() => cambiarEstado(entrevista._id, 'cancelada')}
                                        className="text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 py-1.5"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
