import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movie-api';
import PageHeading from '../components/PageHeading/PageHeading';

export default function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
