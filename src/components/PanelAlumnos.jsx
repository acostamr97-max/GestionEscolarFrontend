import { useState } from 'react'
import { useAlumnos } from '../hooks/useAlumnos.js'

/* ============================================================================
   PanelAlumnos: muestra y gestiona los alumnos de un aula.
   Recibe el aula por props y usa el hook useAlumnos con su id.
   Tiene un mini-formulario para agregar y un boton para quitar cada alumno.
   ============================================================================ */
export const PanelAlumnos = ({ aula, alumnos, cargando, error, agregarAlumno, quitarAlumno }) => {

    /* Le pasamos el id del aula al hook; el resto (cargar, agregar, quitar) ya
       lo resuelve el hook por dentro. */

    /* Estado del mini-formulario (presentacion) */
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState(null)

    const manejarSubmit = async (evento) => {
        evento.preventDefault()
        const salioBien = await agregarAlumno({ nombre, apellido, dni })
        if (salioBien) {
            setNombre('')
            setApellido('')
            setDni('')
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
                Alumnos de {aula.nombre}
            </h3>

            {/* Formulario para agregar un alumno */}
            <form onSubmit={manejarSubmit} className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    className="flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Apellido"
                    className="flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="DNI (opcional)"
                    className="flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2"
                >
                    Agregar
                </button>
            </form>

            {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>
            )}

            {/* Lista de alumnos */}
            {cargando ? (
                <p className="text-gray-500 text-sm">Cargando alumnos...</p>
            ) : alumnos.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay alumnos en esta aula todavía.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {alumnos.map((alumno) => (
                        <li
                            key={alumno._id}
                            className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2"
                        >
                            <span className="text-gray-700">
                                {alumno.nombre} {alumno.apellido}
                                {alumno.dni && <span className="text-gray-400"> · DNI {alumno.dni}</span>}
                            </span>
                            <button
                                onClick={() => quitarAlumno(alumno._id)}
                                className="text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 py-1"
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
