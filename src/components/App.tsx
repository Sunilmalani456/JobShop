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

  // console.log(debouncedSearchText);

  const { jobItems, isLoading, error } = useJobItems(debouncedSearchText);

  const totalJobItems = jobItems?.length || 0;
  const totalNumberOfPages = totalJobItems / RESULT_PER_PAGE;
  const jobItemsSlice =
    jobItems?.slice(
      currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
      currentPage * RESULT_PER_PAGE
    ) || [];

  const handlePaginationClick = (page: "next" | "prev") => {
    if (page === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (page === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
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
            <Sorting />
          </SidebarTop>
          <JobList jobItems={jobItemsSlice} loading={isLoading} />
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
