import { fetchMovies, MovieEndpoints} from '../services/movies';
import MovieGrid from '../components/MovieGrid';

export default async function Upcoming() {
  const data = await fetchMovies(MovieEndpoints.Upcoming);
  

  return <MovieGrid movies={data?.results || []} title="Upcoming Movies" />;
}
