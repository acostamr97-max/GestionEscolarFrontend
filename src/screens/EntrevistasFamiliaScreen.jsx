import { useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { useEntrevistasFamilia } from '../hooks/useEntrevistasFamilia.js'

/* ============================================================================
   EntrevistasFamiliaScreen: pantalla de entrevistas para el rol FAMILIA.
   Permite solicitar una entrevista (fecha + motivo) y ver el listado de las
   solicitudes propias con su estado.
   ============================================================================ */
export const EntrevistasFamiliaScreen = () => {
    const { entrevistas, cargando, error, solicitarEntrevista } = useEntrevistasFamilia()

    /* Estado del formulario */
    const [fecha, setFecha] = useState('')
    const [motivo, setMotivo] = useState('')

    const manejarSubmit = async (evento) => {
        evento.preventDefault()
        const salioBien = await solicitarEntrevista({ fecha, motivo })
        if (salioBien) {
            setFecha('')
            setMotivo('')
        }
    }

    /* Pinta el estado de cada entrevista con un color segun corresponda */
    const colorEstado = (estado) => {
        if (estado === 'programada') return 'text-green-600'
        if (estado === 'cancelada') return 'text-red-600'
        return 'text-orange-600'   /* pendiente */
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicitar entrevista</h2>

                {/* Formulario para pedir una entrevista */}
                <form
                    onSubmit={manejarSubmit}
                    className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col gap-4"
                >
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Fecha deseada</label>
                        <input
                            type="datetime-local"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Motivo</label>
                        <textarea
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            rows={3}
                            placeholder="Ej: Quiero anotar a mi hijo en la institución"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-medium self-start"
                    >
                        Enviar solicitud
                    </button>
                </form>

                {/* Listado de mis entrevistas */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Mis solicitudes</h3>

                {cargando ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : entrevistas.length === 0 ? (
                    <p className="text-gray-500">Todavía no solicitaste ninguna entrevista.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {entrevistas.map((entrevista) => (
                            <div
                                key={entrevista._id}
                                className="bg-white border border-gray-200 rounded-xl p-4"
                            >
                                <p className="text-gray-800">
                                    {new Date(entrevista.fecha).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">{entrevista.motivo || 'Sin motivo'}</p>
                                <p className={'text-sm font-medium mt-1 ' + colorEstado(entrevista.estado)}>
                                    Estado: {entrevista.estado}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
