export default function RatingButton({ label, value, onRate }) {
  return (
    <button onClick={() => onRate(label, value)}>
      {label}
    </button>
  );
}