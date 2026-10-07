import { JobCard } from "@/components/JobCard";
import { PageHead } from "@/components/ui";
import { JOBS } from "@/lib/jobs";

export default function Saved() {
  return (
    <>
      <PageHead title="Saved jobs" sub="Jobs you saved stay here until you apply or remove them." />
      <div className="mt-8 grid gap-4 lg:grid-cols-2"><JobCard job={JOBS[0]} /></div>
    </>
  );
}
