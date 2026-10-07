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
  {
    id: "marketing-analyst",
    title: "Marketing analyst",
    company: "Example Retail",
    place: "Leipzig / hybrid",
    language: "German B2",
    fit: 86,
    confidence: "High",
    why: "Your SQL reporting and campaign coursework match the analysis tasks.",
    about: "Measure campaign performance and build weekly marketing reports. This illustrative role asks for SQL, Excel and German B2.",
    jd: "Campaign reporting, SQL, Excel. German B2.",
    posted: "3 days ago",
  },
  {
    id: "finance-data-analyst",
    title: "Finance data analyst",
    company: "Example Insurance",
    place: "Leipzig / on-site",
    language: "German C1",
    fit: 72,
    confidence: "Medium",
    why: "Your economics degree and reporting work fit the finance focus.",
    about: "Prepare controlling reports and data checks for the finance team. This illustrative role asks for SQL, Excel and German C1.",
    jd: "Controlling reports, SQL, Excel. German C1.",
    posted: "5 days ago",
  },
  {
    id: "crm-analyst",
    title: "CRM analyst",
    company: "Example Energy",
    place: "Dresden / hybrid",
    language: "German B2",
    fit: 68,
    confidence: "Medium",
    why: "Your Python analysis and segmentation project fit the customer data work.",
    about: "Segment customers and track churn for a utility. This illustrative role asks for SQL, a CRM tool and German B2.",
    jd: "Customer segmentation, SQL, CRM. German B2.",
    posted: "1 week ago",
  },
  {
    id: "data-engineer-junior",
    title: "Junior data engineer",
    company: "Example Cloud",
    place: "Remote DE",
    language: "English",
    fit: 64,
    confidence: "Low",
    why: "Your Python and SQL skills cover the basics of the pipeline work.",
    about: "Build and monitor data pipelines in the cloud. This illustrative role asks for Python, SQL and cloud basics.",
    jd: "Data pipelines, Python, SQL, cloud. English C1.",
    posted: "2 days ago",
  },
  {
    id: "supply-chain-analyst",
    title: "Supply chain analyst",
    company: "Example Freight",
    place: "Halle / on-site",
    language: "German C1",
    fit: 59,
    confidence: "Medium",
    why: "Your reporting experience fits the KPI tracking part of the role.",
    about: "Track delivery KPIs and forecast demand. This illustrative role asks for SQL, Excel, logistics knowledge and German C1.",
    jd: "Logistics KPIs, forecasting, SQL. German C1.",
    posted: "6 days ago",
  },
  {
    id: "hr-data-analyst",
    title: "HR data analyst",
    company: "Example Health",
    place: "Leipzig / hybrid",
    language: "German C1",
    fit: 55,
    confidence: "Low",
    why: "Your dashboard work fits the HR reporting tasks.",
    about: "Build HR dashboards on headcount and hiring. This illustrative role asks for SQL, Power BI, HR data experience and German C1.",
    jd: "HR reporting, Power BI, SQL. German C1.",
    posted: "1 week ago",
  },
];

/** Default minimum fit (FR4). Every list still shows at least 10 jobs (FR18). */
export const MIN_FIT = 90;
export const MIN_LIST = 10;

export const getJob = (id: string) => JOBS.find((j) => j.id === id);
export const SOURCE = "Bundesagentur für Arbeit";
export const SOURCE_URL = "https://www.arbeitsagentur.de/jobsuche/";
