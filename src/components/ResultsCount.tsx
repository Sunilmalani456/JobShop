type ResultsCount = {
  totalNumberOfResults: number;
};

export default function ResultsCount({ totalNumberOfResults }: ResultsCount) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span>
    </p>
  );
}
