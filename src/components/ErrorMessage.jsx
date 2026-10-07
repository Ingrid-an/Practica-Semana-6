function ErrorMessage({ mensaje, onRetry }) {
  return (
    <div className="error-mensaje" role="alert">
      <strong>No se pudieron cargar los datos.</strong>
      <p>{mensaje}</p>
      {onRetry && (
        <button type="button" className="btn btn-secundario" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
