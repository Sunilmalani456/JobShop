/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ActiveIdContext } from "../contexts/activeIdContext";
import { BookmarkContext } from "../contexts/BookmarkContextProvider";
import { JobItemContext } from "../contexts/JobitemContext";
import { SearchContext } from "../contexts/searchContext";
import { JobItemExpendend } from "../lib/types";

const handleErrors = (error: unknown) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occurred";
  }

  toast.error(message);
};

export const RESULT_PER_PAGE = 7;
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

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpendend;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_URL}/${id}`);

  // 4xx or 5xx
  if (!res.ok) {
    const errorData = await res.json();
    toast.error(errorData.description);
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobItem", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false, // disable retry
    enabled: Boolean(id), // disable query when id is null or undefined. it only runs when id is truthy first mount.
    // @ts-ignore
    onError: (error: unknown) => {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = "An error occurred";
      }

      toast.error(message);
    },
  });

  const jobItem = data?.jobItem;
  return { jobItem, isLoading, error } as const;
}

// ---------------------------------------------------------

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);

  // 4xx or 5xx
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.description);
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobItems", searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false, // disable retry
    enabled: Boolean(searchText), // disable query when id is null or undefined. it only runs when id is truthy first mount.
    // @ts-ignore
    onError: handleErrors,
  });

  // @ts-ignore
  return { jobItems: data?.jobItems, isLoading, error } as const;
}

export function useOutSideClick(
  refs: React.RefObject<HTMLElement>[],
  callback: () => void
) {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [refs, callback]);
}

// ---------------------------------------------------------

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobItem", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false, // disable retry
      enabled: Boolean(id), // disable query when id is null or undefined. it only runs when id is truthy first mount.
      // @ts-ignore
      onError: handleErrors,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);
  //  .filter((jobItem) => Boolean(jobItem));
  //  .filter((jobItem) => !!jobItem); // mean false, null, undefined, 0, NaN, "" are filtered out
  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading } as const;
}

// ---------------------------------------------------------

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

export function useDebounce<T>(searchText: T): T {
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return debouncedSearchText;
}

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpendend | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await fetch(`${BASE_URL}/${id}`);
//       const data = await res.json();
//       setJobItem(data.jobItem);
//       // console.log(data.jobItem.);

//       setLoading(false);
//     };
//     fetchData();
//   }, [id]);

//   return { jobItem, loading } as const;
// }

// export function useDebounce<T>(value: T, delay = 250): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (!searchText) return null;
//       setLoading(true);
// const response = await fetch(`${BASE_URL}?search=${searchText}`);
// const data = await response.json();
// console.log(data.jobItems);

//       setJobItems(data.jobItems);
//       setLoading(false);
//     };

//     fetchJobs();
//   }, [searchText]);

//   return { jobItems, loading } as const;
// }

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// ---------------------------------------------------------

export function useBookmarkContext() {
  const context = React.useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = React.useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useJobItemContext() {
  const context = React.useContext(JobItemContext);
  if (!context) {
    throw new Error(
      "useJobItemContext must be used within a JobItemContextProvider"
    );
  }
  return context;
}
