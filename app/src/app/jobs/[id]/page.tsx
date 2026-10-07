"use client";
import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Chip, Eyebrow, FitRing, Note, PageHead, TwoCol } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob, SOURCE_URL } from "@/lib/jobs";

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const router = useRouter();
  const { credits, has, spend, mark, setWalletOpen } = useStore();
  const [saved, setSaved] = useState(false);
  if (!job) notFound();
  const prepared = has("prepared", job.id);
  const canPrepare = prepared || credits > 0;

  const prepare = () => {
    if (spend(`prep:${job.id}`)) {
      mark("prepared", job.id);
      router.push(`/jobs/${job.id}/prepare`);
    }
  };
  const apply = () => setTimeout(() => router.push(`/jobs/${job.id}/applied`), 300);

  return (
    <>
      <PageHead
        crumbs={[{ label: "Matches", href: "/jobs" }, { label: job.title }]}
        title={job.title}
        sub={`${job.company} · posted ${job.posted}`}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip>{job.place}</Chip><Chip>{job.language}</Chip><Chip>Bundesagentur für Arbeit</Chip>
      </div>
      <TwoCol
        main={
          <>
            <Card tone="mist" className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-good">✓</span>
              <div>
                <div className="flex items-center gap-2"><p className="font-semibold">Why it fits</p><Chip tone="white">free</Chip></div>
                <p className="mt-1 text-[15px]">{job.why}</p>
                <p className="mt-2 text-sm text-muted">Gaps, risks and the full evidence open with Prepare application.</p>
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-bold">About this role</h2>
              <p className="mt-3 leading-7">{job.about}</p>
              <p className="mt-4 rounded-2xl bg-canvas p-4 text-sm text-muted">You apply on the employer’s original job page. CareerPilot never submits applications for you.</p>
            </Card>
          </>
        }
        aside={
          <Card className="space-y-5">
            <div className="flex items-center gap-4">
              <FitRing score={job.fit} size={84} />
              <div>
                <p className="font-semibold">CV–job fit</p>
                <Chip tone={job.confidence === "High" ? "good" : "mist"}>{job.confidence} confidence</Chip>
              </div>
            </div>
            <p className="text-sm text-muted">Illustrative score, not a hiring probability. <Link href={`/jobs/${job.id}/score`} className="font-semibold text-navy underline">How it’s calculated</Link></p>
            <div className="space-y-3 border-t border-line pt-5">
              {canPrepare ? (
                <Button variant="primary" full onClick={prepare} cost={prepared ? 0 : 1}>{prepared ? "Open preparation" : "Prepare application"}</Button>
              ) : (
                <Button full disabled cost={1}>Prepare application</Button>
              )}
              <Button full href={SOURCE_URL} external onClick={apply} cost={0}>Apply on job site</Button>
              <Button full variant="ghost" onClick={() => setSaved((v) => !v)}>{saved ? "★ Saved" : "☆ Save job"}</Button>
            </div>
            {canPrepare ? (
              <Note>{credits} credits left today. Reopening and regenerating are included.</Note>
            ) : (
              <div className="rounded-2xl bg-flare-tint p-4 text-sm">
                <p className="font-semibold text-flare-ink">No credits left today</p>
                <p className="mt-1">Resets at 00:00. Apply and Save stay free. <button type="button" className="font-semibold underline" onClick={() => setWalletOpen(true)}>Buy 10 credits · coming soon</button></p>
              </div>
            )}
          </Card>
        }
      />
    </>
  );
}
