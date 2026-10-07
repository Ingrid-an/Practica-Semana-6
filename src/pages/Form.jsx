import { useState } from 'react'
import { Link } from 'react-router-dom'

const GENEROS = ['Acción', 'Animación', 'Ciencia ficción', 'Comedia', 'Documental', 'Drama', 'Terror', 'Romance']

const FORM_INICIAL = { titulo: '', genero: '', anio: '', director: '' }

function Form({ onAdd }) {
  // PASO 4: formulario controlado -> el valor de cada input vive en el estado
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(null)

  // IA: un solo handler para todos los campos usando el atributo name
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: undefined }))
  }

  const validar = () => {
    const nuevos = {}
    const anioActual = new Date().getFullYear()
    if (form.titulo.trim().length < 2) nuevos.titulo = 'Escribe un título de al menos 2 caracteres.'
    if (!form.genero) nuevos.genero = 'Elige un género.'
    const anio = Number(form.anio)
    if (!form.anio || anio < 1888 || anio > anioActual + 2) {
      nuevos.anio = `El año debe estar entre 1888 y ${anioActual + 2}.`
    }
    if (form.director.trim().length < 3) nuevos.director = 'Escribe el nombre del director.'
    return nuevos
  }

  const handleSubmit = (e) => {
    // IA: evita que el navegador recargue la página al enviar
    e.preventDefault()
    const nuevos = validar()
    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos)
      return
    }
    const pelicula = {
      // IA: id generado una sola vez al crear -> key estable para el .map()
      id: `user-${Date.now()}`,
      titulo: form.titulo.trim(),
      generos: [form.genero],
      anio: Number(form.anio),
      director: form.director.trim(),
      origen: 'usuario',
    }
    onAdd(pelicula)
    setEnviado(pelicula.titulo)
    setForm(FORM_INICIAL)
  }

  return (
    <section className="pagina pagina-estrecha">
      <h1>Proponer una película</h1>
      <p className="pagina-sub">Se agregará al catálogo al instante.</p>

      {enviado && (
        <div className="exito" role="status">
          “{enviado}” se agregó al catálogo. <Link to="/peliculas">Ver catálogo</Link>
        </div>
      )}

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" type="text" value={form.titulo} onChange={handleChange} />
          {errores.titulo && <small className="campo-error">{errores.titulo}</small>}
        </div>

        <div className="campo">
          <label htmlFor="genero">Género</label>
          <select id="genero" name="genero" value={form.genero} onChange={handleChange}>
            <option value="">Selecciona un género</option>
            {GENEROS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errores.genero && <small className="campo-error">{errores.genero}</small>}
        </div>

        <div className="campo-fila">
          <div className="campo">
            <label htmlFor="anio">Año</label>
            <input id="anio" name="anio" type="number" value={form.anio} onChange={handleChange} />
            {errores.anio && <small className="campo-error">{errores.anio}</small>}
          </div>
          <div className="campo">
            <label htmlFor="director">Director</label>
            <input id="director" name="director" type="text" value={form.director} onChange={handleChange} />
            {errores.director && <small className="campo-error">{errores.director}</small>}
          </div>
        </div>

        <button type="submit" className="btn">Agregar al catálogo</button>
      </form>

      {/* IA: vista previa en vivo, prueba de que el formulario es controlado */}
      <div className="vista-previa">
        <span>Vista previa del estado</span>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </section>
  )
}

export default Form
