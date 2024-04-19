import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};
export function JobList({ jobItems, loading }: JobListProps) {
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading &&
        jobItems.map((jobItem: JobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
    </ul>
  );
}

export default JobList;
