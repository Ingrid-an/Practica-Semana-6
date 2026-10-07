import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import api, { adaptarPostAPelicula } from '../services/api.js'
import MovieCard from '../components/MovieCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function List({ userMovies }) {
  // PASO 3: los tres estados explícitos de una petición
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reintento, setReintento] = useState(0)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    // IA: AbortController permite cancelar la petición si el componente se desmonta.
    // En desarrollo, StrictMode monta -> desmonta -> monta el componente; la primera
    // petición se cancela en el cleanup y así no se renderizan datos duplicados.
    const controller = new AbortController()

    // IA: useEffect no puede ser async directamente, por eso definimos la función dentro.
    const cargarPeliculas = async () => {
      setLoading(true)
      setError(null)
      try {
        const respuesta = await api.get('/posts', {
          params: { limit: 12 },
          signal: controller.signal,
        })
        setData(respuesta.data.posts.map(adaptarPostAPelicula))
      } catch (err) {
        // IA: una petición cancelada no es un error real; la ignoramos.
        if (axios.isCancel(err)) return
        setError(
          err.response
            ? `El servidor respondió con el código ${err.response.status}.`
            : `Error de red: ${err.message}`
        )
      } finally {
        // IA: finally se ejecuta haya éxito o error; solo apagamos el loading
        // si esta petición no fue cancelada.
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    cargarPeliculas()

    // IA: cleanup -> se ejecuta al desmontar o antes de repetir el efecto.
    return () => controller.abort()
  }, [reintento])

  // PASO 5: se unen las películas propuestas (estado de App) con las de la API
  const todas = [...userMovies, ...data]
  const filtradas = todas.filter((m) =>
    m.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
  )

  return (
    <section className="pagina">
      <div className="pagina-cabecera">
        <div>
          <h1>Catálogo de películas</h1>
          <p className="pagina-sub">
            {userMovies.length > 0
              ? `${userMovies.length} propuesta(s) tuya(s) + títulos de la API`
              : 'Títulos cargados desde DummyJSON con Axios'}
          </p>
        </div>
        <Link to="/nueva" className="btn">Proponer película</Link>
      </div>

      <label className="buscador">
        <span>Buscar por título</span>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej. history"
        />
      </label>

      {/* PASO 4: renderizado condicional según loading / error / data */}
      {loading && <LoadingSpinner mensaje="Cargando películas..." />}

      {!loading && error && (
        <ErrorMessage mensaje={error} onRetry={() => setReintento((n) => n + 1)} />
      )}

      {!loading && !error && filtradas.length === 0 && (
        <p className="vacio">Ninguna película coincide con “{busqueda}”.</p>
      )}

      {!loading && !error && filtradas.length > 0 && (
        <div className="grid-peliculas">
          {/* PASO 4: .map() con key única y estable (el id, nunca el índice) */}
          {filtradas.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

export default List
