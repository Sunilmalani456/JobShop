import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemContext } from "../hooks/hooks";

// type PaginationProps = {
//   currentPage: number;
//   onClick: (page: "next" | "prev") => void;
//   totalNumberOfPages: number;
// };

export default function Pagination() {
  const { currentPage, handlePaginationClick, totalNumberOfPages } =
    useJobItemContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="prev"
          currentPage={currentPage}
          onClick={() => handlePaginationClick("prev")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => handlePaginationClick("next")}
        />
      )}
    </section>
  );
}

const PaginationButton = ({
  currentPage,
  direction,
  onClick,
}: {
  currentPage: number;
  direction: "prev" | "next";
  onClick: () => void;
}) => {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" ? (
        <>
          <ArrowLeftIcon />
          Page {currentPage + 1}
        </>
      ) : (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
};
