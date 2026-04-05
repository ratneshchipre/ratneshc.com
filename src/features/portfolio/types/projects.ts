export type Project = {
  id: string;
  title: string;
  logo?: string;
  description?: string;
  features?: string[];
  link: string;
  skills: string[];
  isExpanded?: boolean;
};
