export default function MovieDisplay({ movie }) {
  if (movie === null) {
    return (
      <div>
        <h2>No movie selected yet</h2>
        <p>Movies are loading or no movie was found.</p>
      </div>
    );
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : null;

  return (
    <div>
      <h2>Rate this movie:</h2>
      {posterUrl && (
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          width="200"
        />
      )}
      <p>{movie.title}</p>
    </div>
  );
}