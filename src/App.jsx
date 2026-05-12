import { useEffect, useState } from "react";

import YearSelector from "./components/YearSelector.jsx";
import MovieDisplay from "./components/MovieDisplay.jsx";
import RatingButton from "./components/RatingButton.jsx";
import Statistics from "./components/Statistics.jsx";

const ratingOptions = [
  { label: "Bad", value: -3 },
  { label: "Boring", value: -1 },
  { label: "Average", value: 0 },
  { label: "Fun", value: 1 },
  { label: "Good", value: 3 },
];

function getRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

export default function App() {
  const [year, setYear] = useState("2024");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setErrorMessage("");
      setSelectedMovie(null);

      try {
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

        const topMovies = allMovies.slice(0, 100);

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

    fetchMovies();
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

    const updatedRatings = ratings.concat(newRating);
    setRatings(updatedRatings);

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

      <div>
        {ratingOptions.map((rating) => (
          <RatingButton
            key={rating.label}
            label={rating.label}
            value={rating.value}
            onRate={handleRating}
          />
        ))}
      </div>

      <Statistics ratings={ratings} />
    </div>
  );
}