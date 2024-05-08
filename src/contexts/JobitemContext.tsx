import React, { createContext, useMemo, useState } from "react";
import {
  JobItem,
  RESULT_PER_PAGE,
  useSearchQuery,
  useSearchTextContext,
} from "../hooks/hooks";

type JobItemContext = {
  jobItems: JobItem[] | null;
  isLoading: boolean;
  error: Error | null;
  totalJobItems: number;
  totalNumberOfPages: number;
  jobItemsSortedAndSlice: JobItem[];
  handleSortByChange: (newSortBy: "relevant" | "recent") => void;
  handlePaginationClick: (page: "next" | "prev") => void;
  currentPage: number;
  sortBy: "relevant" | "recent";
  jobItemSort: JobItem[];
};

export const JobItemContext = createContext<JobItemContext | null>(null);

const JobItemContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // context dependencies
  const { debouncedSearchText } = useSearchTextContext();

  //   state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");
  const { jobItems, isLoading, error } = useSearchQuery(debouncedSearchText);

  // console.log(debouncedSearchText);

  const totalJobItems = jobItems?.length || 0;
  const totalNumberOfPages = totalJobItems / RESULT_PER_PAGE;

  const jobItemSort = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore; //sort in descending order of relevance score (b-a)
        } else {
          return a.daysAgo - b.daysAgo; //sort in ascending order of days ago (a-b)
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSlice = useMemo(
    () =>
      jobItemSort.slice(
        currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
      ),
    [jobItemSort, currentPage]
  );

  const handlePaginationClick = (page: "next" | "prev") => {
    if (page === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (page === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortByChange = (newSortBy: "relevant" | "recent") => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      error,
      totalJobItems,
      totalNumberOfPages,
      jobItemsSortedAndSlice,
      handleSortByChange,
      handlePaginationClick,
      currentPage,
      sortBy,
      jobItemSort,
    }),
    [
      jobItems,
      isLoading,
      error,
      totalJobItems,
      totalNumberOfPages,
      jobItemsSortedAndSlice,
      handleSortByChange,
      handlePaginationClick,
      currentPage,
      sortBy,
      jobItemSort,
    ]
  );

  return (
    <JobItemContext.Provider value={contextValue}>
      {children}
    </JobItemContext.Provider>
  );
};

export default JobItemContextProvider;
