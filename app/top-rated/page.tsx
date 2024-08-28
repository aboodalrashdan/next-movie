import { fetchMovies, MovieEndpoints} from '../services/movies';
import MovieGrid from '../components/MovieGrid';

export default async function TopRated() {
  const data = await fetchMovies(MovieEndpoints.TopRated);

  return <MovieGrid movies={data?.results || []} title="Top Rated Movies" />;
}
