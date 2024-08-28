// app/category/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Categories.module.css';
import StarRating from '../../components/StarRating';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Category {
  id: number;
  name: string;
}

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const categoryId = params.id;

  if (!categoryId) {
    return notFound(); 
  }
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`
  );

  if (!movieResponse.ok) {
    return notFound(); 
  }

  const movieData = await movieResponse.json();
  const movies: Movie[] = movieData.results || [];

  const categoryResponse = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );

  if (!categoryResponse.ok) {
    return notFound(); 
  }

  const categoryData = await categoryResponse.json();
  const category = categoryData.genres.find(
    (category: Category) => category.id === parseInt(categoryId)
  );
  const categoryName = category ? category.name : 'Unknown Category';

  return (
    <div className={styles.container}>
      <div className={styles.title}>{categoryName} Movies</div>
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

export default CategoryPage;
