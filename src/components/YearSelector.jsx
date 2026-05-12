export default function YearSelector({ year, onYearChange }) {
  const years = [];

  for (let y = 2026; y >= 1926; y--) {
    years.push(y);
  }

  return (
    <div>
      <label>
        Select year:
        <select value={year} onChange={onYearChange}>
          {years.map((movieYear) => (
            <option key={movieYear} value={movieYear}>
              {movieYear}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}