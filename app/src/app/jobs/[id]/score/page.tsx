import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, ListItem, Note, PageHead } from "@/components/ui";
import { getJob } from "@/lib/jobs";

export default async function Score({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();
  return (
    <div className="ml-auto max-w-[600px] space-y-4">
      <PageHead
        crumb={<><Link href="/jobs" className="underline">Jobs</Link> / <Link href={`/jobs/${id}`} className="underline">{job.title}</Link> / Score</>}
        title="How this score is explained"
        sub={`Free score information · ${job.title} · ${job.fit}% fit.`}
      />
      <ListItem title="Relevant experience" meta="Your reviewed analytics work supports the role’s reporting responsibilities." />
      <ListItem title="Skills and language evidence" meta={`SQL and reporting are supported by your profile. ${job.language} meets the listed requirement.`} />
      <ListItem title={`Confidence · ${job.confidence}`} meta="The vacancy is specific and the profile has reviewed evidence." />
      <Card title="Two different measures">
        <p>Profile completeness 86% enables scoring. Job fit {job.fit}% describes this role.</p>
      </Card>
      <Note>Model contributions and weights are not validated yet. Detailed gaps and risks are available in Prepare.</Note>
      <Button variant="primary" href={`/jobs/${id}`}>Close calculation</Button>
    </div>
  );
}
