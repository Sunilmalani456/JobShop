import { JobItem, useActiveIdContext } from "../hooks/hooks";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};
export function JobList({ jobItems, loading }: JobListProps) {
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading &&
        jobItems.map((jobItem: JobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
