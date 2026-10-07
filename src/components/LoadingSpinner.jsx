function LoadingSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div className="spinner-contenedor" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>{mensaje}</p>
    </div>
  )
}

export default LoadingSpinner
