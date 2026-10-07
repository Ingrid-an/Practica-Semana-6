import axios from 'axios'

// PASO 3: instancia única de Axios para toda la app.
// IA: Centralizar baseURL y timeout evita repetir la URL en cada componente.
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

// IA: DummyJSON no tiene un endpoint de películas, así que adaptamos /posts:
// el título del post es el título de la película, el cuerpo es la sinopsis
// y los tags funcionan como géneros.
export const adaptarPostAPelicula = (post) => ({
  id: `api-${post.id}`,
  titulo: post.title,
  sinopsis: post.body,
  generos: post.tags,
  likes: post.reactions?.likes ?? 0,
  origen: 'api',
})

export default api
