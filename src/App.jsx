import { useEffect, useState } from "react";

import YearSelector from "./components/YearSelector.jsx";
import MovieDisplay from "./components/MovieDisplay.jsx";
import RatingControls from "./components/RatingControls.jsx";
import Statistics from "./components/Statistics.jsx";

import { fetchTopMoviesByYear } from "./tmdb.js";

function getRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

export default function App() {
  const [year, setYear] = useState("2026");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      setErrorMessage("");
      setSelectedMovie(null);

      try {
        const topMovies = await fetchTopMoviesByYear(year);

        setMovies(topMovies);

        if (topMovies.length > 0) {
          setSelectedMovie(getRandomMovie(topMovies));
        } else {
          setErrorMessage("No movies found for this year.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [year]);

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleRating(label, value) {
    if (selectedMovie === null) {
      return;
    }

    const newRating = {
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      year: year,
      label: label,
      value: value,
    };

    setRatings(ratings.concat(newRating));

    if (movies.length > 0) {
      setSelectedMovie(getRandomMovie(movies));
    }
  }

  function handleSkipMovie() {
    if (movies.length > 0) {
      setSelectedMovie(getRandomMovie(movies));
    }
  }

  return (
    <div>
      <h1>Movie Rating Tracker</h1>

      <YearSelector year={year} onYearChange={handleYearChange} />

      {loading && <p>Loading movies...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {!loading && <MovieDisplay movie={selectedMovie} />}

      <RatingControls onRate={handleRating} onSkip={handleSkipMovie} />

      <Statistics ratings={ratings} />
    </div>
  );
}