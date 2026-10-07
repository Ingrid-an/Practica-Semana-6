import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Form from './pages/Form.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

function App() {
  // PASO 5: estado sincrónico compartido.
  // IA: Las películas propuestas viven en App (el padre común), así Form las agrega
  // y List/About las leen al instante, sin volver a pedir nada a la API.
  const [userMovies, setUserMovies] = useState([])

  const addMovie = (movie) => {
    setUserMovies((prev) => [movie, ...prev])
  }

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        {/* PASO 2: tabla de rutas de la SPA */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peliculas" element={<List userMovies={userMovies} />} />
          <Route path="/nueva" element={<Form onAdd={addMovie} />} />
          <Route path="/acerca" element={<About userMovies={userMovies} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer">
        Catálogo de Películas · Desarrollo de Aplicaciones Web · Semana 06
      </footer>
    </div>
  )
}

export default App
