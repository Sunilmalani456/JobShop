import { useJobItemContext } from "../hooks/hooks";

export default function ResultsCount() {
  const { totalJobItems } = useJobItemContext();
  return (
    <p className="count">
      <span className="u-bold">{totalJobItems} Results</span>
    </p>
  );
}
