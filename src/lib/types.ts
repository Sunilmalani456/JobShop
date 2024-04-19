import { JobItem } from "../hooks/hooks";

export type JobItemExpendend = JobItem & {
  description: string;
  salary: string;
  location: string;
  qualifications: string[];
  reviews: Array<string>;
  duration: string;
  coverImgURL: string;
  companyURL: string;
};
