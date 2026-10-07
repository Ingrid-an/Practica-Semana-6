import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../services/api.js'
import MovieCard from '../components/MovieCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

const PASOS = [
  { id: 1, titulo: 'Configuración' },
  { id: 2, titulo: 'Routing' },
  { id: 3, titulo: 'Consumo API' },
  { id: 4, titulo: 'Renderizado y formulario' },
  { id: 5, titulo: 'Integración' },
]

/* ---------------- PASO 1 ---------------- */
function Paso1() {
  const location = useLocation()
  return (
    <>
      <h2>Paso 1 · Configuración con BrowserRouter</h2>
      <p>
        Se crea el proyecto con Vite, se instalan <code>react-router-dom</code> y{' '}
        <code>axios</code>, y toda la app se envuelve en <code>&lt;BrowserRouter&gt;</code>{' '}
        dentro de <code>main.jsx</code>.
      </p>
      <pre className="codigo">{`<StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</StrictMode>`}</pre>
      <div className="demo">
        <span className="demo-titulo">Demo en vivo</span>
        <p>BrowserRouter activo. Ruta actual: <code>{location.pathname}</code></p>
      </div>
    </>
  )
}

/* ---------------- PASO 2 ---------------- */
function Paso2() {
  return (
    <>
      <h2>Paso 2 · Routing con NavLink</h2>
      <p>
        <code>&lt;NavLink&gt;</code> cambia de ruta sin recargar la página y aplica la
        clase <code>active</code> al enlace de la ruta actual.
      </p>
      <pre className="codigo">{`<NavLink
  to="/peliculas"
  className={({ isActive }) => (isActive ? 'active' : '')}
>
  Catálogo
</NavLink>`}</pre>
      <div className="demo">
        <span className="demo-titulo">Demo en vivo · el enlace resaltado es la ruta activa</span>
        <nav className="demo-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>/</NavLink>
          <NavLink to="/peliculas" className={({ isActive }) => (isActive ? 'active' : '')}>/peliculas</NavLink>
          <NavLink to="/nueva" className={({ isActive }) => (isActive ? 'active' : '')}>/nueva</NavLink>
          <NavLink to="/acerca" className={({ isActive }) => (isActive ? 'active' : '')}>/acerca</NavLink>
          <NavLink to="/ruta-que-no-existe" className={({ isActive }) => (isActive ? 'active' : '')}>404</NavLink>
        </nav>
      </div>
    </>
  )
}

/* ---------------- PASO 3 ---------------- */
// IA: escenarios de prueba con los endpoints /http de DummyJSON
const ESCENARIOS = {
  loading: { ruta: '/http/200', params: { delay: 4000 }, etiqueta: 'Simular Loading' },
  exito: { ruta: '/http/200', params: {}, etiqueta: 'Simular Éxito' },
  error: { ruta: '/http/404/Pelicula_no_encontrada', params: {}, etiqueta: 'Simular Error' },
}

function Paso3() {
  const [escenario, setEscenario] = useState(null)
  const [intento, setIntento] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!escenario) return

    // IA: un AbortController nuevo por cada ejecución del efecto
    const controller = new AbortController()

    const ejecutar = async () => {
      setLoading(true)
      setData(null)
      setError(null)
      try {
        const { ruta, params } = ESCENARIOS[escenario]
        const respuesta = await api.get(ruta, { params, signal: controller.signal })
        setData(respuesta.data)
      } catch (err) {
        // IA: si se presionó otro botón antes de terminar, la petición anterior
        // se canceló; no es un error que mostrar.
        if (axios.isCancel(err)) return
        setError(
          err.response
            ? `El servidor respondió ${err.response.status}: ${err.response.data?.message ?? 'sin mensaje'}`
            : `Error de red: ${err.message}`
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    ejecutar()

    // IA: cleanup -> cancela la petición si cambia el escenario o se desmonta el componente
    return () => controller.abort()
  }, [escenario, intento])

  const lanzar = (clave) => {
    setEscenario(clave)
    // IA: el contador permite repetir el mismo escenario varias veces
    setIntento((n) => n + 1)
  }

  return (
    <>
      <h2>Paso 3 · Consumo de API con Axios</h2>
      <p>
        <code>async/await</code> dentro de <code>useEffect</code>, con{' '}
        <code>try/catch/finally</code>, estados <code>loading</code>, <code>data</code> y{' '}
        <code>error</code>, y <code>AbortController</code> en el cleanup.
      </p>
      <pre className="codigo">{`useEffect(() => {
  const controller = new AbortController()
  const cargar = async () => {
    setLoading(true)
    try {
      const res = await api.get('/posts', { signal: controller.signal })
      setData(res.data)
    } catch (err) {
      if (axios.isCancel(err)) return
      setError(err.message)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }
  cargar()
  return () => controller.abort()
}, [])`}</pre>

      <div className="demo">
        <span className="demo-titulo">Demo en vivo</span>
        <div className="demo-botones">
          <button type="button" className="btn btn-aviso" onClick={() => lanzar('loading')}>Simular Loading</button>
          <button type="button" className="btn btn-ok" onClick={() => lanzar('exito')}>Simular Éxito</button>
          <button type="button" className="btn btn-peligro" onClick={() => lanzar('error')}>Simular Error</button>
        </div>

        <div className="demo-estados">
          <span className={loading ? 'on' : ''}>loading: {String(loading)}</span>
          <span className={data ? 'on' : ''}>data: {data ? 'sí' : 'null'}</span>
          <span className={error ? 'on' : ''}>error: {error ? 'sí' : 'null'}</span>
        </div>

        {!escenario && <p className="vacio">Presiona un botón para lanzar una petición.</p>}
        {loading && <LoadingSpinner mensaje="Esperando respuesta del servidor..." />}
        {!loading && error && <ErrorMessage mensaje={error} onRetry={() => lanzar(escenario)} />}
        {!loading && data && (
          <div className="exito">
            Respuesta recibida:
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}

/* ---------------- PASO 4 ---------------- */
const MUESTRA = [
  { id: 'demo-1', titulo: 'La ciudad de los espejos', generos: ['Drama'], anio: 2019, director: 'Lucía Paredes', origen: 'usuario' },
  { id: 'demo-2', titulo: 'Órbita cero', generos: ['Ciencia ficción'], anio: 2023, director: 'Marco Quispe', origen: 'usuario' },
  { id: 'demo-3', titulo: 'Risas en Huancayo', generos: ['Comedia'], anio: 2021, director: 'Ana Rojas', origen: 'usuario' },
]

function Paso4() {
  const [mostrar, setMostrar] = useState(true)
  return (
    <>
      <h2>Paso 4 · Renderizado iterativo, condicional y formulario controlado</h2>
      <p>
        Las películas se recorren con <code>.map()</code> usando el <code>id</code> como{' '}
        <code>key</code>. El formulario guarda cada campo en <code>useState</code> y usa{' '}
        <code>onChange</code> y <code>onSubmit</code>.
      </p>
      <pre className="codigo">{`{peliculas.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}

<input name="titulo" value={form.titulo} onChange={handleChange} />`}</pre>
      <div className="demo">
        <span className="demo-titulo">Demo en vivo</span>
        <div className="demo-botones">
          <button type="button" className="btn btn-secundario" onClick={() => setMostrar((m) => !m)}>
            {mostrar ? 'Ocultar lista' : 'Mostrar lista'}
          </button>
          <Link to="/nueva" className="btn">Abrir formulario</Link>
        </div>
        {mostrar ? (
          <div className="grid-peliculas grid-peliculas--mini">
            {MUESTRA.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="vacio">Lista oculta (renderizado condicional).</p>
        )}
      </div>
    </>
  )
}

/* ---------------- PASO 5 ---------------- */
function Paso5({ onVerSpa }) {
  return (
    <>
      <h2>Paso 5 · Integración y auditoría</h2>
      <p>
        Las películas propuestas se guardan en el estado de <code>App.jsx</code> y se pasan
        por props a <code>Form</code>, <code>List</code> y <code>About</code>. Al agregar una,
        aparece al instante en el catálogo sin volver a llamar a la API.
      </p>
      <pre className="codigo">{`// App.jsx
const [userMovies, setUserMovies] = useState([])
<Route path="/nueva" element={<Form onAdd={addMovie} />} />
<Route path="/peliculas" element={<List userMovies={userMovies} />} />`}</pre>
      <div className="demo">
        <span className="demo-titulo">Prueba el flujo completo</span>
        <ol className="flujo">
          <li>Propón una película en <Link to="/nueva">Nueva película</Link>.</li>
          <li>Búscala en el <Link to="/peliculas">Catálogo</Link>.</li>
          <li>Revisa el contador y la auditoría en la vista integrada.</li>
        </ol>
        <button type="button" className="btn" onClick={onVerSpa}>Ver SPA Integrada</button>
      </div>
    </>
  )
}

/* ---------------- HOME ---------------- */
function Home() {
  const [paso, setPaso] = useState(1)
  const navigate = useNavigate()
  const verSpa = () => navigate('/acerca')

  return (
    <section className="guia">
      <aside className="guia-menu" aria-label="Pasos de la guía">
        <p className="guia-menu-titulo">Guía Semana 06</p>
        {PASOS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={paso === p.id ? 'guia-boton activo' : 'guia-boton'}
            aria-pressed={paso === p.id}
            onClick={() => setPaso(p.id)}
          >
            <strong>Paso {p.id}</strong>
            <span>{p.titulo}</span>
          </button>
        ))}
        <button type="button" className="guia-boton guia-boton--spa" onClick={verSpa}>
          <strong>Ver SPA Integrada</strong>
          <span>Stack y auditoría</span>
        </button>
      </aside>

      <div className="guia-panel">
        {paso === 1 && <Paso1 />}
        {paso === 2 && <Paso2 />}
        {paso === 3 && <Paso3 />}
        {paso === 4 && <Paso4 />}
        {paso === 5 && <Paso5 onVerSpa={verSpa} />}
      </div>
    </section>
  )
}

export default Home
