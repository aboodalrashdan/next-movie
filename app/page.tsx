import { fetchMovies, MovieEndpoints} from './services/movies';
import MovieGrid from './components/MovieGrid';

export default async function Home() {
  const data = await fetchMovies(MovieEndpoints.Popular);

  return <MovieGrid movies={data?.results || []} title="Popular Movies" />;
}
