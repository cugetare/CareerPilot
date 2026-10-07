import { notFound } from "next/navigation";
import { Button, Card, Chip, FitRing, Note, PageHead } from "@/components/ui";
import { getJob } from "@/lib/jobs";

const CRITERIA = [
  ["Skills", 0.3, 0.95], ["Experience and seniority", 0.25, 0.85], ["Domain", 0.15, 0.9],
  ["Languages", 0.15, 1], ["Location", 0.1, 1], ["Education", 0.05, 0.8],
] as const;

export default async function Score({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <PageHead crumbs={[{ label: "Matches", href: "/jobs" }, { label: job.title, href: `/jobs/${id}` }, { label: "Score" }]} title="How this score is calculated" sub="Free for every job. Each criterion, its weight and what it contributes." />
      <Card className="mt-8">
        <div className="flex items-center gap-4 border-b border-line pb-5">
          <FitRing score={job.fit} size={72} />
          <div><p className="font-semibold">{job.title} · {job.company}</p><Chip tone={job.confidence === "High" ? "good" : "mist"}>{job.confidence} confidence</Chip></div>
        </div>
        <ul className="mt-5 space-y-4">
          {CRITERIA.map(([name, w, s]) => (
            <li key={name}>
              <div className="flex justify-between text-sm"><span className="font-medium">{name}</span><span className="text-muted">weight {Math.round(w * 100)}% · fit {Math.round(s * 100)}%</span></div>
              <div className="mt-1.5 h-2 rounded-full bg-mist"><div className="h-2 rounded-full bg-navy" style={{ width: `${s * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </Card>
      <Card tone="mist" className="mt-4">
        <p className="font-semibold">Two different measures</p>
        <p className="mt-1 text-[15px]">Profile completeness (86%) unlocks scoring. Job fit ({job.fit}%) describes this role.</p>
      </Card>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Button variant="primary" href={`/jobs/${id}`}>Back to the job</Button>
        <Note>Illustrative weights; the score model is not validated yet.</Note>
      </div>
    </div>
  );
}
