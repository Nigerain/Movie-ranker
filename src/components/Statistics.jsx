import StatisticLine from "./StatisticLine.jsx";

export default function Statistics({ ratings }) {
  if (ratings.length === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No ratings yet.</p>
      </div>
    );
  }

  const totalScore = ratings.reduce((sum, rating) => sum + rating.value, 0);
  const averageScore = totalScore / ratings.length;

  const badCount = ratings.filter((rating) => rating.label === "Bad").length;
  const boringCount = ratings.filter((rating) => rating.label === "Boring").length;
  const averageCount = ratings.filter((rating) => rating.label === "Average").length;
  const funCount = ratings.filter((rating) => rating.label === "Fun").length;
  const goodCount = ratings.filter((rating) => rating.label === "Good").length;

  return (
    <div>
      <h2>Statistics</h2>

      <StatisticLine text="Movies rated" value={ratings.length} />
      <StatisticLine text="Average score" value={averageScore.toFixed(2)} />

      <h3>Rating Counts</h3>
      <StatisticLine text="Bad" value={badCount} />
      <StatisticLine text="Boring" value={boringCount} />
      <StatisticLine text="Average" value={averageCount} />
      <StatisticLine text="Fun" value={funCount} />
      <StatisticLine text="Good" value={goodCount} />
    </div>
  );
}