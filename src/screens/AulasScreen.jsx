import { useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { useAulas } from '../hooks/useAulas.js'
import { Skeleton } from '@mui/material'


export const AulasScreen = () => {

    const { aulas, docentes, cargando, error, guardarAula, borrarAula } = useAulas()

    const [nombre, setNombre] = useState('')
    const [docente, setDocente] = useState('')
    const [turno, setTurno] = useState('maniana')

    const [editandoId, setEditandoId] = useState(null)

    const limpiarFormulario = () => {
        setNombre('')
        setDocente('')
        setTurno('maniana')
        setEditandoId(null)
    }

    const manejarSubmit = async (evento) => {
        evento.preventDefault()
        const datos = { nombre, docente, turno }

        const salioBien = await guardarAula(datos, editandoId)
        if (salioBien) {
            limpiarFormulario()
        }
    }

    const empezarEdicion = (aula) => {
        setNombre(aula.nombre)
        setDocente(aula.docente?._id || aula.docente || '')
        setTurno(aula.turno)
        setEditandoId(aula._id)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Aulas</h2>

                {/* ---------------- FORMULARIO crear / editar ---------------- */}
                <form
                    onSubmit={manejarSubmit}
                    className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col gap-4"
                >
                    <h3 className="font-semibold text-gray-700">
                        {editandoId ? 'Editar aula' : 'Nueva aula'}
                    </h3>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Ej: Sala Verde"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Docente <span className="text-gray-400">(opcional)</span>
                        </label>
                        <select
                            value={docente}
                            onChange={(e) => setDocente(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="">Sin asignar</option>
                            {docentes.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nombre} ({d.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Turno</label>
                        <select
                            value={turno}
                            onChange={(e) => setTurno(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="maniana">Mañana</option>
                            <option value="tarde">Tarde</option>
                            <option value="noche">Noche</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-medium"
                        >
                            {editandoId ? 'Guardar cambios' : 'Crear aula'}
                        </button>

                        {/* El boton "Cancelar" solo aparece en modo edicion */}
                        {editandoId && (
                            <button
                                type="button"
                                onClick={limpiarFormulario}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                {/* ---------------- LISTA de aulas ---------------- */}
                {cargando ? (
                    <div className='gap-2 grid'>
                    <Skeleton className='gap-2' variant='rounded' width={700} height={90} animation='wave'   />
                    <Skeleton className='gap-2' variant='rounded' width={700} height={90} animation='wave' color='red'  />
                    <Skeleton className='gap-2' variant='rounded' width={700} height={90} animation='wave'   />
                    </div>
                ) : aulas.length === 0 ? (
                    <p className="text-gray-500">Todavía no hay aulas. Creá la primera arriba.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {aulas.map((aula) => (
                            <div
                                key={aula._id}
                                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{aula.nombre}</p>
                                    <p className="text-sm text-gray-500">
                                        Docente: {aula.docente?.nombre || 'sin asignar'} · Turno: {aula.turno}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => empezarEdicion(aula)}
                                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-3 py-1.5"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => borrarAula(aula._id)}
                                        className="text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 py-1.5"
                                    >
                                        Eliminar
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
