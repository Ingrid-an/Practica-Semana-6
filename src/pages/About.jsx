import { version as reactVersion } from 'react'
import { Link } from 'react-router-dom'

const STACK = [
  { nombre: 'React', uso: `Componentes funcionales y Hooks (v${reactVersion})` },
  { nombre: 'Vite', uso: 'Servidor de desarrollo y build' },
  { nombre: 'react-router-dom', uso: 'BrowserRouter, Routes, Route y NavLink' },
  { nombre: 'Axios', uso: 'Instancia en services/api.js con baseURL y timeout' },
  { nombre: 'DummyJSON', uso: 'API pública (/posts adaptado a películas, /http para pruebas)' },
  { nombre: 'CSS puro', uso: 'Estilos en index.css y App.css, sin librerías' },
]

const RUTAS = [
  { ruta: '/', pagina: 'Home.jsx', desc: 'Guía con la demo de los 5 pasos' },
  { ruta: '/peliculas', pagina: 'List.jsx', desc: 'Catálogo con datos de la API' },
  { ruta: '/nueva', pagina: 'Form.jsx', desc: 'Formulario controlado' },
  { ruta: '/acerca', pagina: 'About.jsx', desc: 'SPA integrada y auditoría' },
  { ruta: '*', pagina: 'NotFound.jsx', desc: 'Cualquier ruta inexistente (404)' },
]

const AUDITORIA = [
  'BrowserRouter configurado en main.jsx',
  'NavLink con clase active y sin recarga de página',
  'Axios con async/await y try/catch/finally (sin .then/.catch)',
  'Estados loading, data y error manejados explícitamente',
  'AbortController cancela la petición al desmontar (StrictMode)',
  '.map() con key única y estable (id)',
  'Formulario controlado con onChange y onSubmit',
  'Estado compartido en App: lo propuesto aparece al instante en el catálogo',
  'Ruta 404 para direcciones inexistentes',
]

function About({ userMovies }) {
  return (
    <section className="pagina">
      <h1>SPA integrada</h1>
      <p className="pagina-sub">
        Paso 5: todas las piezas funcionando juntas en una sola página que nunca se recarga.
      </p>

      <div className="about-estado">
        <strong>{userMovies.length}</strong>
        <span>
          película(s) propuesta(s) en esta sesión.{' '}
          {userMovies.length === 0 ? (
            <Link to="/nueva">Propón una</Link>
          ) : (
            <Link to="/peliculas">Verlas en el catálogo</Link>
          )}
        </span>
      </div>

      <div className="about-grid">
        <div className="about-bloque">
          <h2>Stack</h2>
          <dl className="stack">
            {STACK.map((item) => (
              <div key={item.nombre}>
                <dt>{item.nombre}</dt>
                <dd>{item.uso}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about-bloque">
          <h2>Rutas</h2>
          <table className="tabla-rutas">
            <thead>
              <tr><th>Ruta</th><th>Página</th><th>Descripción</th></tr>
            </thead>
            <tbody>
              {RUTAS.map((r) => (
                <tr key={r.ruta}>
                  <td><code>{r.ruta}</code></td>
                  <td>{r.pagina}</td>
                  <td>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="about-bloque">
        <h2>Auditoría</h2>
        <ul className="checklist">
          {AUDITORIA.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
