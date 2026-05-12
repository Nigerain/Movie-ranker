import RatingButton from "./RatingButton.jsx";

const ratingOptions = [
    { label: "Bad", value: -3 },
    { label: "Boring", value: -1 },
    { label: "Average", value: 0 },
    { label: "Fun", value: 1 },
    { label: "Good", value: 3 },
];

export default function RatingControls({ onRate, onSkip }) {
    return (
        <div>
            <button onClick={onSkip}>Haven&apos;t seen it</button>

            {ratingOptions.map((rating) => (
                <RatingButton
                    key={rating.label}
                    label={rating.label}
                    value={rating.value}
                    onRate={onRate}
                />
            ))}
        </div>
    );
}