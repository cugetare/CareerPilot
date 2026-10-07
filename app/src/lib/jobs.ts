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
  },
];

export const getJob = (id: string) => JOBS.find((j) => j.id === id);
export const SOURCE = "Bundesagentur für Arbeit";
export const SOURCE_URL = "https://www.arbeitsagentur.de/jobsuche/";
