import { forwardRef } from "react";
import { useBookmarkContext } from "../hooks/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

type BookmarksPopoverProps = {
  isopen: boolean;
};

// always first one is ref, second one is props
// _ is a convention to ignore typescript the first argument know as props/{}
const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>(
  (_, ref) => {
    const { bookmarkJobItems, isLoading } = useBookmarkContext();
    return createPortal(
      <div ref={ref} className="bookmarks-popover">
        <JobList jobItems={bookmarkJobItems} loading={isLoading} />
      </div>,
      document.body
    );
  }
);

export default BookmarksPopover;
