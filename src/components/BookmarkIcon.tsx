import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../hooks/hooks";

type BookMarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookMarkIconProps) {
  const { bookMarkedIds, handleToggleBookMark } = useBookmarkContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookMark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookMarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
