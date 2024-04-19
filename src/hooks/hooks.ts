import { useState, useEffect } from "react";

type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);

  const jobItemsSlice = jobItems.slice(0, 7);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!searchText) return null;
      setLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await response.json();
      console.log(data.jobItems);

      setJobItems(data.jobItems);
      setLoading(false);
    };

    fetchJobs();
  }, [searchText]);

  return [jobItemsSlice, loading] as const;
}
