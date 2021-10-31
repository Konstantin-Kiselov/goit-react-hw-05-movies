import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as movieAPI from '../services/bookshelf-api';
import PageHeading from '../components/PageHeading/PageHeading';

export default function MoviesView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const onInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmitInput = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Please enter text');
    }

    movieAPI.fetchSearchMovies(query).then(({ results }) => {
      if (results.length === 0) {
        alert(`Not match for reaquest ${query}`);
      }

      setMovies(results);
    });

    setQuery('');
  };

  return (
    <>
      <PageHeading text="Movies" />
      <form onSubmit={handleSubmitInput}>
        <label>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={onInputChange}
            placeholder="Search movie..."
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
