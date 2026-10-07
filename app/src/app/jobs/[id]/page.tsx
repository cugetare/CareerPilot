"use client";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Columns, Note, PageHead } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob, SOURCE_URL } from "@/lib/jobs";

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const router = useRouter();
  const { credits, has, spend, mark, setWalletOpen } = useStore();
  if (!job) notFound();
  const prepared = has("prepared", job.id);
  const canPrepare = prepared || credits > 0;

  const prepare = () => {
    if (spend(`prep:${job.id}`)) {
      mark("prepared", job.id);
      router.push(`/jobs/${job.id}/prepare`);
    }
  };

  return (
    <>
      <PageHead
        crumb={<><Link href="/jobs" className="underline">Jobs</Link> / {job.title}</>}
        title={job.title}
        sub={`${job.company} · ${job.place} · ${job.language} · Public job source`}
      />
      <Columns
        main={
          <>
            <h2 className="text-2xl font-semibold">About this role</h2>
            <p>{job.about}</p>
            <p>Your application is submitted on the employer’s original job page. CareerPilot does not submit it for you.</p>
            <Card title="Why it fits · free">
              <p>{job.why} Full gaps, risks and evidence are available in Prepare application.</p>
            </Card>
          </>
        }
        aside={
          <>
            <Card title={`${job.fit}% CV–JD fit`}>
              <p>Illustrative score, not a hiring probability.</p>
              <p>{job.confidence} confidence</p>
            </Card>
            <Button href={`/jobs/${job.id}/score`}>Score calculation</Button>
            {canPrepare ? (
              <Button variant="primary" onClick={prepare}>
                {prepared ? "Open preparation" : "Prepare application · −1"}
              </Button>
            ) : (
              <Button disabled>Prepare unavailable</Button>
            )}
            <Button href={SOURCE_URL} external onClick={() => setTimeout(() => router.push(`/jobs/${job.id}/applied`), 300)}>
              Apply on job site
            </Button>
            <Button href="/saved">Save job</Button>
            {canPrepare ? (
              <Note>{credits} credits left today. Reopening preparation and regenerating this document are included.</Note>
            ) : (
              <Note>
                No daily credits left. Resets at 00:00 local time. Apply and Save stay free.{" "}
                <button type="button" className="underline" onClick={() => setWalletOpen(true)}>Buy 10 credits · Coming soon</button>
              </Note>
            )}
          </>
        }
      />
    </>
  );
}
