import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as movieAPI from '../services/movie-api';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState();

  useEffect(() => {
    movieAPI.fetchMovieCredits(movieId).then(({ cast }) => {
      console.log(cast);
    });
  }, []);

  return <div>Тут будет Cast</div>;
}
