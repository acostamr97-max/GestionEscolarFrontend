import { useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { useMisAulas } from '../hooks/useMisAulas.js'
import { PanelAlumnos } from '../components/PanelAlumnos.jsx'
import { PanelAsistencia } from '../components/PanelAsistencia.jsx'
import { useAlumnos } from '../hooks/useAlumnos.js'

/* ============================================================================
   MisAulasScreen: pantalla principal del DOCENTE.

   Muestra la lista de aulas que tiene asignadas. Al elegir un aula, aparecen
   debajo dos paneles: uno para gestionar los alumnos de esa aula y otro para
   tomar la asistencia.

   El estado "aulaSeleccionada" (presentacion) decide que aula se esta viendo.
   ============================================================================ */
export const MisAulasScreen = () => {
    const { aulas, cargandoAulas, errorAulas } = useMisAulas()

    const [aulaSeleccionada, setAulaSeleccionada] = useState(null)

    const { alumnos, cargando, error, agregarAlumno, quitarAlumno } = useAlumnos(aulaSeleccionada?._id)


    /* Guardamos el aula elegida (el objeto completo). null = ninguna elegida. */

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis aulas</h2>

                {cargandoAulas ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : errorAulas ? (
                    <p className="text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorAulas}</p>
                ) : aulas.length === 0 ? (
                    <p className="text-gray-500">Todavía no tenés aulas asignadas.</p>
                ) : (
                    /* Lista de aulas como botones. Al tocar una, se selecciona. */
                    <div className="flex flex-wrap gap-2 mb-6">
                        {aulas.map((aula) => (
                            <button
                                key={aula._id}
                                onClick={() => setAulaSeleccionada(aula)}
                                className={
                                    'px-4 py-2 rounded-lg border ' +
                                    (aulaSeleccionada?._id === aula._id
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100')
                                }
                            >
                                {aula.nombre}
                            </button>
                        ))}
                    </div>
                )}

                {/* Si hay un aula elegida, mostramos los dos paneles */}
                {aulaSeleccionada && (
                    <div className="flex flex-col gap-8">
                        <PanelAlumnos aula={aulaSeleccionada} alumnos={alumnos} cargando={cargando} error={error} agregarAlumno={agregarAlumno} quitarAlumno={quitarAlumno} />
                        <PanelAsistencia aula={aulaSeleccionada} alumnos={alumnos} />
                    </div>
                )}
            </div>
        </div>
    )
}
