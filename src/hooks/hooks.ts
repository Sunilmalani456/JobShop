import { useState, useEffect } from "react";
import { JobItemExpendend } from "../lib/types";

export const BASE_URL =
  "https://bytegrad.com/course-assets/projects/rmtdev/api/data";

export type JobItem = {
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
      const response = await fetch(`${BASE_URL}?search=${searchText}`);
      const data = await response.json();
      console.log(data.jobItems);

      setJobItems(data.jobItems);
      setLoading(false);
    };

    fetchJobs();
  }, [searchText]);

  return [jobItemsSlice, loading] as const;
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpendend | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setJobItem(data.jobItem);
      // console.log(data.jobItem.);

      setLoading(false);
    };
    fetchData();
  }, [id]);

  return [jobItem, loading] as const;
}

export function useActiveId() {
  const [activeid, setActiveid] = useState<null | number>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveid(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeid;
}