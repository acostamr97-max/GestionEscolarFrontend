import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

/* Punto de arranque de la app. Aca React "se monta" en el div #root del index.html.

   Envolvemos <App /> con dos cosas importantes:
   - <BrowserRouter>: habilita el sistema de rutas (react-router-dom).
   - <AuthProvider>: comparte el estado de autenticacion (token, usuario)
     con TODA la app, para que cualquier pantalla sepa si hay alguien logueado. */
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

)
