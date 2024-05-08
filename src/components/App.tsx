/* eslint-disable @typescript-eslint/no-unused-vars */
import { Toaster } from "react-hot-toast";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import JobItemContent from "./JobItemContent";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sidebar, { SidebarTop } from "./Sidebar";
import Sorting from "./SortingControls";
import JobListSearch from "./joblistsearch";

function App() {
  // if (error) toast.error(error.message);

  return (
    <>
      <Background />
      <Header />
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <Sorting />
          </SidebarTop>

          <JobListSearch />

          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
