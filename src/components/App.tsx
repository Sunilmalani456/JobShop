/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useDebounce, useJobItems } from "../hooks/hooks";
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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  console.log(debouncedSearchText);

  const { jobItemsSlice, loading, totalJobItems } =
    useJobItems(debouncedSearchText);

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
          <JobList jobItems={jobItemsSlice} loading={loading} />
          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
