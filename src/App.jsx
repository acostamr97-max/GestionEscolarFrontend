import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginScreen } from './screens/LoginScreen.jsx'
import { RegisterScreen } from './screens/RegisterScreen.jsx'
import { VerificarCuentaScreen } from './screens/VerificarCuentaScreen.jsx'
import { OlvideContrasenaScreen } from './screens/OlvideContrasenaScreen.jsx'
import { RecuperarCuentaScreen } from './screens/RecuperarCuentaScreen.jsx'
import { HomeScreen } from './screens/HomeScreen.jsx'
import { AulasScreen } from './screens/AulasScreen.jsx'
import { MisAulasScreen } from './screens/MisAulasScreen.jsx'
import { EntrevistasFamiliaScreen } from './screens/EntrevistasFamiliaScreen.jsx'
import { EntrevistasDirectorScreen } from './screens/EntrevistasDirectorScreen.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { PublicRoute } from './components/PublicRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      {/* --- Rutas publicas (solo sin sesion) --- */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen />
          </PublicRoute>
        }
      />

      {/* La pantalla de verificacion la abre el link del mail: no depende de la sesion */}
      <Route path="/verificar-cuenta" element={<VerificarCuentaScreen />} />

      {/* Olvide mi contrasena: pedir el mail de recuperacion (solo sin sesion) */}
      <Route
        path="/olvide-contrasena"
        element={
          <PublicRoute>
            <OlvideContrasenaScreen />
          </PublicRoute>
        }
      />

      {/* Recuperar cuenta: la abre el link del mail (con ?token=...), no depende de la sesion */}
      <Route path="/recuperar-cuenta" element={<RecuperarCuentaScreen />} />

      {/* --- Rutas protegidas --- */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />

      {/* Director: gestion de aulas */}
      <Route
        path="/aulas"
        element={
          <ProtectedRoute roles={['director']}>
            <AulasScreen />
          </ProtectedRoute>
        }
      />

      {/* Docente: sus aulas, con alumnos y asistencia */}
      <Route
        path="/mis-aulas"
        element={
          <ProtectedRoute roles={['docente']}>
            <MisAulasScreen />
          </ProtectedRoute>
        }
      />

      {/* Familia: solicitar y ver entrevistas */}
      <Route
        path="/entrevistas"
        element={
          <ProtectedRoute roles={['familia']}>
            <EntrevistasFamiliaScreen />
          </ProtectedRoute>
        }
      />

      {/* Director: gestionar todas las entrevistas */}
      <Route
        path="/entrevistas-director"
        element={
          <ProtectedRoute roles={['director']}>
            <EntrevistasDirectorScreen />
          </ProtectedRoute>
        }
      />

      {/* Cualquier otra URL que no exista -> al home (y si no hay sesion, al login) */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default App
