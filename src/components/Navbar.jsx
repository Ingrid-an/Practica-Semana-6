import { NavLink } from 'react-router-dom'

// PASO 2: <NavLink> navega sin recargar la página y nos dice si la ruta está activa.
// IA: La función de className recibe { isActive } y devuelve la clase 'active'.
const claseActiva = ({ isActive }) => (isActive ? 'active' : '')

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" end className="navbar-logo">
        <span className="navbar-logo-icono" aria-hidden="true">▶</span>
        CineLab
      </NavLink>
      <nav className="navbar-links" aria-label="Navegación principal">
        <NavLink to="/" end className={claseActiva}>Guía</NavLink>
        <NavLink to="/peliculas" className={claseActiva}>Catálogo</NavLink>
        <NavLink to="/nueva" className={claseActiva}>Nueva película</NavLink>
        <NavLink to="/acerca" className={claseActiva}>Acerca</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
