// app/movie/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './movie.module.css';
import StarRating from '../../components/StarRating';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface MovieDetailsProps {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  spoken_languages: { name: string }[];
  runtime: number;
  tagline: string;
  homepage: string;
  imdb_id: string;
  slug: string;
  genres: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; profile_path: string }[];
  };
  videos: { key: string }[];
  poster_path: string | null;

}

const MovieDetails = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}&append_to_response=credits,videos`);
  
  if (!res.ok) {
    return notFound(); 
  }

  const movie: MovieDetailsProps = await res.json();

  const releaseDate = new Date(movie.release_date).getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.movieWrapper}>
        <div className={styles.moviePoster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={700}
            height={1170}
          />
        </div>
        <div className={styles.movieDetailsWrapper}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.tagline}>{movie.tagline}</div>
          <div className={styles.infoSection}>
            <div className={styles.ratingSection}>
              <div className={styles.ratingContainer}>
                <StarRating rating={movie.vote_average} />
              </div>
              <div className={styles.voteCount}>{movie.vote_average}</div>
            </div>
            <div className={styles.langTimeRelease}>
              {movie.spoken_languages[0].name} / {movie.runtime} MIN / {releaseDate}
            </div>
          </div>
          <div className={styles.genreTitle}>The Genres</div>
          <div className={styles.genresWrapper}>
            <p> {movie.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
          <div className={styles.genreTitle}>The Synopsis</div>
          <div className={styles.overview}>{movie.overview}</div>
          <div className={styles.genreTitle}>The cast</div>
          <div className={styles.castSection}>
            <ul>
              {movie.credits.cast.map((member) => (
                <li key={member.id}>
                  <Link className={styles.castWrapper} href={`/person/${member.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                      alt={member.name}
                      width={40}
                      height={40}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
