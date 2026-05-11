export default function YearSelector({ year, onYearChange }) {
  const years = [2024, 2023, 2022];

  return (
    <div>
        Select year:
        <select value={year} onChange={onYearChange}>
          {years.map((movieYear) => (
            <option key={movieYear} value={movieYear}>
              {movieYear}
            </option>
          ))}
        </select>
    </div>
  );
}