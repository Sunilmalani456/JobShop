import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/hooks";

type BookMarkContext = {
  bookMarkedIds: number[];
  handleToggleBookMark: (id: number) => void;
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

  const handleToggleBookMark = (id: number) => {
    console.log(id);

    if (bookMarkedIds.includes(id)) {
      setBookMarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookMarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookMarkedIds, handleToggleBookMark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
