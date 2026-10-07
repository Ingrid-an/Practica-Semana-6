import { Link, useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()

  return (
    <section className="pagina not-found">
      <p className="not-found-codigo">404</p>
      <h1>Esta escena no existe</h1>
      <p>
        La ruta <code>{location.pathname}</code> no está en el catálogo.
      </p>
      <Link to="/" className="btn">Volver a la guía</Link>
    </section>
  )
}

export default NotFound
