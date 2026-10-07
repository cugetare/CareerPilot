export type Job = {
  id: string;
  title: string;
  company: string;
  place: string;
  language: string;
  fit: number;
  confidence: "High" | "Medium" | "Low";
  why: string;
  about: string;
  jd: string;
  posted: string;
};

export const JOBS: Job[] = [
  {
    id: "data-analyst",
    title: "Data analyst",
    company: "Example Systems",
    place: "Leipzig / hybrid",
    language: "German B2",
    fit: 92,
    confidence: "High",
    why: "Your SQL projects and Python experience align with the role.",
    about: "Analyse operational data, build clear reports and work with product teams. This illustrative role asks for SQL, Python and German B2.",
    jd: "Reporting, SQL and stakeholder communication. German B2.",
    posted: "2 days ago",
  },
  {
    id: "reporting-analyst",
    title: "Reporting analyst",
    company: "Example Analytics",
    place: "Remote DE",
    language: "English",
    fit: 94,
    confidence: "High",
    why: "Your reporting work and analytical skills match the core tasks.",
    about: "Own recurring business reports and dashboards for a distributed team. This illustrative role asks for SQL, a BI tool and fluent English.",
    jd: "Dashboards, SQL and recurring reporting. English C1.",
    posted: "today",
  },
  {
    id: "junior-bi-developer",
    title: "Junior BI developer",
    company: "Example Logistics",
    place: "Halle / on-site",
    language: "German C1",
    fit: 81,
    confidence: "Medium",
    why: "Your Python analysis and thesis dashboards are strong transferable experience.",
    about: "Build and maintain BI models for warehouse operations. This illustrative role asks for SQL, Power BI and German C1.",
    jd: "BI modelling, SQL and Power BI. German C1.",
    posted: "4 days ago",
  },
  {
    id: "product-data-analyst",
    title: "Product data analyst",
    company: "Example Mobility",
    place: "Berlin / remote",
    language: "English",
    fit: 77,
    confidence: "Medium",
    why: "Your experimentation coursework fits the product analytics focus.",
    about: "Analyse feature usage and A/B tests with product managers. This illustrative role asks for SQL, Python and experimentation basics.",
    jd: "Product analytics, SQL, A/B testing. English C1.",
    posted: "1 week ago",
  },
];

export const getJob = (id: string) => JOBS.find((j) => j.id === id);
export const SOURCE = "Bundesagentur für Arbeit";
export const SOURCE_URL = "https://www.arbeitsagentur.de/jobsuche/";
