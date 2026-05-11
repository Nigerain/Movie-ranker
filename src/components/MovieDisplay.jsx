export default function MovieDisplay({ movie }) {
  if (movie === null) {
    return (
      <div>
        <h2>No movie selected yet</h2>
        <p>Click "Get Random Movie" to start.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Rate this movie:</h2>
      <p>{movie.title}</p>
    </div>
  );
}