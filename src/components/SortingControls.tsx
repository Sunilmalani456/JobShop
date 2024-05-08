import { useJobItemContext } from "../hooks/hooks";

export default function Sorting() {
  const { sortBy, handleSortByChange } = useJobItemContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => handleSortByChange("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => handleSortByChange("recent")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
      >
        Recent
      </button>
    </section>
  );
}
