/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { createContext } from "react";
import { useJobItems, useLocalStorage } from "../hooks/hooks";
import { JobItemExpendend } from "../lib/types";

type BookMarkContext = {
  bookMarkedIds: number[];
  handleToggleBookMark: (id: number) => void;
  bookmarkJobItems: JobItemExpendend[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookMarkContext | null>(null);

const BookmarkContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const bookMarkedIdsFromLocalStroage = JSON.parse(
  //     localStorage.getItem("bookMarkedIds") || "[]"
  //   );

  const [bookMarkedIds, setBookMarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkJobItems, isLoading } = useJobItems(bookMarkedIds);

  const handleToggleBookMark = (id: number) => {
    console.log(id);

    if (bookMarkedIds.includes(id)) {
      setBookMarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookMarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookMarkedIds,
        handleToggleBookMark,
        bookmarkJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
