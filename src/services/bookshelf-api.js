const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b32f977d148061c9ab22a471ff2c7792';

// /trending/movie/week?api_key=<<api_key>>
// /search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// /movie/${movieId}?api_key=${API_KEY}&language=en-US

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchSearchMovies(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchAuthors() {
  return fetchWithErrorHandling(`${BASE_URL}/authors?_embed=books`);
}

export function fetchBooks() {
  return fetchWithErrorHandling(`${BASE_URL}/books`);
}

export function fetchBookById(bookId) {
  return fetchWithErrorHandling(`${BASE_URL}/books/${bookId}?_expand=author`);
}
