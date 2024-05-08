import { useJobItemContext } from "../hooks/hooks";
import JobList from "./JobList";

const JobListSearch = () => {
  const { jobItemsSortedAndSlice, isLoading } = useJobItemContext();
  return <JobList jobItems={jobItemsSortedAndSlice} loading={isLoading} />;
};

export default JobListSearch;
