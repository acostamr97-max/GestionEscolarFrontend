import { useState } from 'react'
import { useAlumnos } from '../hooks/useAlumnos.js'
import { useAsistencia } from '../hooks/useAsistencia.js'

/* ============================================================================
   PanelAsistencia: toma de asistencia de un aula para una fecha.

   Necesita dos cosas:
   - la lista de alumnos del aula (hook useAlumnos),
   - los registros de asistencia de ese dia (hook useAsistencia).

   Para cada alumno busca si ya tiene un registro ese dia:
   - si NO lo tiene -> muestra botones "Presente" / "Ausente" para crearlo.
   - si YA lo tiene -> muestra su estado y permite cambiarlo.

   La fecha por defecto es hoy (en formato YYYY-MM-DD, que es lo que espera
   el input type="date" y el backend).
   ============================================================================ */
export const PanelAsistencia = ({ aula , alumnos}) => {

    /* fechaHoy: arma la fecha de hoy como "2026-06-29".
       toISOString() da algo como "2026-06-29T12:00:00.000Z"; con split('T')[0]
       nos quedamos solo con la parte de la fecha. */
    const fechaHoy = new Date().toISOString().split('T')[0]
    const [fecha, setFecha] = useState(fechaHoy)

    /* Alumnos del aula y asistencia de la fecha elegida */
    const { asistencias, marcarAsistencia, corregirAsistencia } = useAsistencia(aula._id, fecha)

    /* Dado un alumno, busca su registro de asistencia del dia (o undefined) */
    const buscarAsistenciaDe = (alumnoId) => {
        return asistencias.find((a) => {
            /* a.alumno puede venir como objeto (por el populate) o como id */
            const idDelRegistro = a.alumno?._id || a.alumno
            return idDelRegistro === alumnoId
        })
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Asistencia</h3>

                {/* Selector de fecha */}
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                />
            </div>

            {alumnos.length === 0 ? (
                <p className="text-gray-500 text-sm">
                    Agregá alumnos para poder tomar asistencia.
                </p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {alumnos.map((alumno) => {
                        const registro = buscarAsistenciaDe(alumno._id)

                        return (
                            <li
                                key={alumno._id}
                                className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2"
                            >
                                <span className="text-gray-700">
                                    {alumno.nombre} {alumno.apellido}
                                </span>

                                {/* Si ya hay registro, mostramos el estado y permitimos cambiarlo.
                                    Si no, mostramos los botones para marcarlo por primera vez. */}
                                {registro ? (
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={
                                                'text-sm font-medium ' +
                                                (registro.estado === 'presente'
                                                    ? 'text-green-600'
                                                    : 'text-red-600')
                                            }
                                        >
                                            {registro.estado}
                                        </span>
                                        <button
                                            onClick={() =>
                                                corregirAsistencia(
                                                    registro._id,
                                                    registro.estado === 'presente' ? 'ausente' : 'presente'
                                                )
                                            }
                                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded px-2 py-1"
                                        >
                                            Cambiar
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => marcarAsistencia(alumno._id, 'presente')}
                                            className="text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-3 py-1"
                                        >
                                            Presente
                                        </button>
                                        <button
                                            onClick={() => marcarAsistencia(alumno._id, 'ausente')}
                                            className="text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 py-1"
                                        >
                                            Ausente
                                        </button>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
