import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  NavLink,
} from 'react-router-dom';
import PageHeading from '../components/PageHeading/PageHeading';
import * as movieAPI from '../services/bookshelf-api';

export default function BookDetailsView() {
  const { path, url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  let releaseYear = null;

  useEffect(() => {
    movieAPI.fetchMovieById(movieId).then(data => {
      console.log(data);
      setMovie(data);
    });
  }, [movieId]);

  if (movie) {
    releaseYear = movie.release_date.slice(0, 4);
  }

  return (
    <>
      {movie && (
        <>
          <PageHeading text={`${movie.title}`} />
          <div
            style={{
              display: 'flex',
            }}
          >
            <img
              width="200"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h2>
                {movie.title} ({releaseYear})
              </h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
        </>
      )}
      <hr />
      <p>Additional information</p>

      {movie && (
        <ul>
          <li>
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      )}

      <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <div>Cast</div>
          </Route>
          <Route path={`${path}/reviews`}>
            <div>Reviews</div>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

// {authors && (
//         <ul>
//           {authors.map(author => (
//             <li key={author.id}>
//               <NavLink to={`${url}/${author.id}`}>{author.name}</NavLink>
//             </li>
//           ))}
//         </ul>
//       )}
//       <hr />

//       <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
//         <Route path={`${path}/:authorId`}>
//           {authors && <AuthorSubView authors={authors} />}
//         </Route>
//       </Suspense>
