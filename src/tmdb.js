export async function fetchTopMoviesByYear(year) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const allMovies = [];

  for (let page = 1; page <= 5; page++) {
    const url =
      `https://api.themoviedb.org/3/discover/movie` +
      `?include_adult=false` +
      `&include_video=false` +
      `&language=en-US` +
      `&page=${page}` +
      `&primary_release_year=${year}` +
      `&sort_by=vote_average.desc` +
      `&vote_count.gte=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies from TMDB.");
    }

    const data = await response.json();
    allMovies.push(...data.results);
  }

  return allMovies.slice(0, 100);
}