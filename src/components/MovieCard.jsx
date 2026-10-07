// IA: Color del "póster" calculado a partir del título, así cada película
// conserva siempre el mismo color.
const colorDesdeTexto = (texto) => {
  let hash = 0
  for (const letra of texto) hash = (hash * 31 + letra.charCodeAt(0)) % 360
  return hash
}

const iniciales = (titulo) =>
  titulo
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')

function MovieCard({ movie }) {
  const tono = colorDesdeTexto(movie.titulo)

  return (
    <article className="movie-card">
      <div
        className="movie-poster"
        style={{ background: `linear-gradient(150deg, hsl(${tono} 55% 42%), hsl(${(tono + 40) % 360} 60% 22%))` }}
        aria-hidden="true"
      >
        <span>{iniciales(movie.titulo)}</span>
        {movie.origen === 'usuario' && <em className="movie-badge">Propuesta</em>}
      </div>

      <div className="movie-info">
        <h3>{movie.titulo}</h3>

        {/* PASO 4: renderizado condicional según los datos que tenga la película */}
        {(movie.anio || movie.director) && (
          <p className="movie-meta">
            {movie.anio && <span>{movie.anio}</span>}
            {movie.director && <span>Dir. {movie.director}</span>}
          </p>
        )}

        <ul className="movie-generos">
          {movie.generos.map((genero) => (
            <li key={genero}>{genero}</li>
          ))}
        </ul>

        {movie.sinopsis && <p className="movie-sinopsis">{movie.sinopsis}</p>}

        {movie.origen === 'api' && (
          <p className="movie-likes">♥ {movie.likes} me gusta</p>
        )}
      </div>
    </article>
  )
}

export default MovieCard
