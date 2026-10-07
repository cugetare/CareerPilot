import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { Chip, FitRing } from "./ui";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="group flex gap-5 rounded-3xl bg-white p-5 shadow-card ring-1 ring-line/70 transition hover:-translate-y-0.5 hover:shadow-lift sm:p-6">
      <FitRing score={job.fit} size={64} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold group-hover:underline">{job.title}</h3>
            <p className="text-sm text-muted">{job.company} · {job.posted}</p>
          </div>
          <Chip tone={job.confidence === "High" ? "good" : "mist"}>{job.confidence} confidence</Chip>
        </div>
        <p className="mt-3 text-[15px]"><span className="font-semibold">Why it fits · </span>{job.why}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>{job.place}</Chip>
          <Chip>{job.language}</Chip>
          <Chip>Bundesagentur</Chip>
        </div>
      </div>
    </Link>
  );
}
