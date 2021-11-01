import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
// import HomeView from './views/HomeView';
// import AuthorsView from './views/AuthorsView';
// import BooksView from './views/BooksView';
// import BookDetailsView from './views/BookDetailsView';
// import NotFoundView from './views/NotFoundView';
// import TableView from './views/TableView';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "home-view" */),
);
// const AuthorsView = lazy(() =>
//   import('./views/AuthorsView.js' /* webpackChunkName: "authors-view" */),
// );
const MoviesPage = lazy(() => import('./views/MoviesPage.js'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js'));
// const NotFoundView = lazy(() => import('./views/NotFoundView.js'));
// const TableView = lazy(() => import('./views/TableView.js'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          {/* <Route path="/authors">
            <AuthorsView />
          </Route> */}

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          {/* <Route path="/table">
            <TableView />
          </Route>

          <Route>
            <NotFoundView />
          </Route> */}
        </Switch>
      </Suspense>
    </Container>
  );
}
