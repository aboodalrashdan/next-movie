//services/movies.ts
export enum MovieEndpoints {
  Popular = 'popular',
  Upcoming = 'upcoming',
  TopRated = 'top_rated',
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchMovies(endpoint: MovieEndpoints) {
  const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchCategories() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.genres || [];
}
