import React, { createContext, useState } from "react";
import { useDebounce } from "../hooks/hooks";

type SearchContext<T> = {
  searchText: T; //string
  debouncedSearchText: T; //string
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchContext = createContext<SearchContext<string> | null>(null);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
