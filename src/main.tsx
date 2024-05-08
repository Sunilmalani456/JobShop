import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkContextProvider from "./contexts/BookmarkContextProvider";
import ActiveIdContextProvider from "./contexts/activeIdContext";
import SearchContextProvider from "./contexts/searchContext";
import JobItemContextProvider from "./contexts/JobitemContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BookmarkContextProvider>
      <ActiveIdContextProvider>
        <SearchContextProvider>
          <JobItemContextProvider>
            <App />
          </JobItemContextProvider>
        </SearchContextProvider>
      </ActiveIdContextProvider>
    </BookmarkContextProvider>
  </QueryClientProvider>
);
