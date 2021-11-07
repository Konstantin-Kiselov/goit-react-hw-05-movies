import { useState, useEffect, Suspense, lazy, useRef } from 'react';
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  NavLink,
  useHistory,
  useLocation,
} from 'react-router-dom';
// import PageHeading from '../components/PageHeading/PageHeading';
import * as movieAPI from '../services/movie-api';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export default function MovieDetailsPage() {
  const { path, url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  let releaseYear = null;

  useEffect(() => {
    movieAPI.fetchMovieById(movieId).then(data => {
      // console.log(data);
      setMovie(data);
    });
  }, [movieId]);

  if (movie) {
    releaseYear = movie.release_date.slice(0, 4);
  }

  const history = useHistory();
  // console.log('history ---', history);

  const location = useLocation();
  // console.log(location.state.from);
  // console.log('location ---', location);

  const currentRef = useRef(location.state?.from?.location).current;
  // console.log(currentRef);

  const onGoBackClick = () => {
    history.push(currentRef ?? `/`);
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBackClick}>
            Go Back
          </button>
          {/* <PageHeading text={`${movie.title}`} /> */}
          <div
            style={{
              display: 'flex',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
            />
            <div style={{ marginLeft: '20px' }}>
              <h2>
                {movie.title} ({releaseYear})
              </h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                {movie.genres.map(({ id, name }) => {
                  return (
                    <li
                      style={{
                        marginRight: '10px',
                      }}
                      key={id}
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <hr />
        </>
      )}

      <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
