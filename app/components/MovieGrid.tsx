  // app/movies/MovieGrid.tsx
  import React from 'react';
  import Link from 'next/link';
  import StarRating from './StarRating';
  import styles from './MovieGrid.module.css';

  interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }

  interface MovieGridProps {
    movies: Movie[];
    title: string;
  }

  const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
    return (
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.moviesGrid}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <Link href={`/movie/${movie.id}`} className={styles.movieCardLink}>
                    <div className={styles.moviePoster}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className={styles.movieDetails}>
                      <div>{movie.title}</div>
                      <div className={styles.ratingContainer}>
                        <StarRating rating={movie.vote_average} />
                      </div>
                    </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  };

  export default MovieGrid;
