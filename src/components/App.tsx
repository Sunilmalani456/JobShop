/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import { useJobItems } from "../hooks/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItemsSlice, loading] = useJobItems(searchText);
  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
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
