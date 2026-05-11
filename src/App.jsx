import { useState } from "react";

import YearSelector from "./components/YearSelector.jsx";
import MovieDisplay from "./components/MovieDisplay.jsx";
import RatingButton from "./components/RatingButton.jsx";
import Statistics from "./components/Statistics.jsx";

const moviesByYear = {
  2024: [
    { id: 1, title: "Dune: Part Two" },
    { id: 2, title: "Challengers" },
    { id: 3, title: "Civil War" },
  ],
  2023: [
    { id: 4, title: "Oppenheimer" },
    { id: 5, title: "Past Lives" },
    { id: 6, title: "Godzilla Minus One" },
  ],
  2022: [
    { id: 7, title: "Everything Everywhere All at Once" },
    { id: 8, title: "Top Gun: Maverick" },
    { id: 9, title: "The Batman" },
  ],
};

const ratingOptions = [
  { label: "Bad", value: -3 },
  { label: "Boring", value: -1 },
  { label: "Average", value: 0 },
  { label: "Fun", value: 1 },
  { label: "Good", value: 3 },
];

function getRandomMovieFromYear(year) {
  const movies = moviesByYear[year];
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

export default function App() {
  const [year, setYear] = useState("2024");
  const [selectedMovie, setSelectedMovie] = useState(getRandomMovieFromYear("2024"));
  const [ratings, setRatings] = useState([]);

  function handleYearChange(event) {
    const newYear = event.target.value;

    setYear(newYear);
    setSelectedMovie(getRandomMovieFromYear(newYear));
  }

  function handleRating(label, value) {
    const newRating = {
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      year: year,
      label: label,
      value: value,
    };

    setRatings(ratings.concat(newRating));
    setSelectedMovie(getRandomMovieFromYear(year));
  }

  return (
    <div>
      <h1>Movie Rating Tracker</h1>

      <YearSelector year={year} onYearChange={handleYearChange} />

      <MovieDisplay movie={selectedMovie} />

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