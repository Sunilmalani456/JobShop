/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { RESULT_PER_PAGE, useDebounce, useJobItems } from "../hooks/hooks";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sidebar, { SidebarTop } from "./Sidebar";
import Sorting from "./SortingControls";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");
  const { jobItems, isLoading, error } = useJobItems(debouncedSearchText);

  // console.log(debouncedSearchText);

  const totalJobItems = jobItems?.length || 0;
  const totalNumberOfPages = totalJobItems / RESULT_PER_PAGE;

  const jobItemSort =
    jobItems?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore; //sort in descending order of relevance score (b-a)
      } else {
        return a.daysAgo - b.daysAgo; //sort in ascending order of days ago (a-b)
      }
    }) || [];

  const jobItemsSortedAndSlice = jobItemSort.slice(
    currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
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

  if (error) toast.error(error.message);

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalJobItems} />
            <Sorting sortBy={sortBy} onClick={handleSortByChange} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSlice} loading={isLoading} />
          <Pagination
            currentPage={currentPage}
            onClick={handlePaginationClick}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
