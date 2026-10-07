"use client";
import { use, useState } from "react";
import { Button, Card, Chip, Eyebrow, Note, PageHead, TwoCol } from "@/components/ui";
import { useStore, type Status } from "@/components/store";
import { getJob } from "@/lib/jobs";

const STATUSES: Status[] = ["Applied", "Interview", "Offer", "Rejected"];
const QUESTIONS = [
  "Walk us through a report you built end to end. Which SQL did you use?",
  "How would you explain a data quality issue to a product team?",
  "Your profile shows limited production reporting. How would you ramp up?",
];

export default function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { applications, setStatus } = useStore();
  const [prep, setPrep] = useState(false);
  const app = applications.find((a) => a.id === id);
  const job = getJob(id);
  if (!app || !job)
    return (
      <Card className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold">Application not found</h1>
        <p className="mt-2 text-muted">Confirm an application after applying on the job site.</p>
        <Button href="/applications" className="mt-6">Back to applications</Button>
      </Card>
    );
  const idx = STATUSES.indexOf(app.status);
  return (
    <>
      <PageHead crumbs={[{ label: "Applications", href: "/applications" }, { label: app.role }]} title={app.role} sub={`${app.company} · applied ${app.date} · ${app.doc}`} right={<Chip tone={app.status === "Rejected" ? "flare" : app.status === "Applied" ? "mist" : "good"}>{app.status}</Chip>} />
      <TwoCol
        main={
          <>
            <Card>
              <Eyebrow>Status</Eyebrow>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {STATUSES.map((s, i) => (
                  <button key={s} type="button" onClick={() => setStatus(app.id, s)}
                    className={`rounded-2xl px-2 py-3 text-sm font-semibold transition ${app.status === s ? (s === "Rejected" ? "bg-flare text-white" : "bg-navy text-white") : i < idx && app.status !== "Rejected" ? "bg-good-tint text-good" : "bg-canvas text-muted hover:text-navy"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between"><Eyebrow>Saved job description</Eyebrow><Chip tone="white">snapshot</Chip></div>
              <p className="mt-3">{job.jd}</p>
              <p className="mt-2 text-sm text-muted">This snapshot stays readable after the posting expires.</p>
            </Card>
            {prep && (
              <Card tone="navy">
                <p className="text-lg font-semibold">Interview prep · {job.title}</p>
                <ol className="mt-4 space-y-3">
                  {QUESTIONS.map((q, i) => (
                    <li key={q} className="flex gap-3 rounded-2xl bg-white/10 p-4 text-[15px]"><span className="font-bold text-flare">{i + 1}</span>{q}</li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-white/70">Based on the saved job description and your gaps. Demo only; first item to cut if planning runs tight.</p>
              </Card>
            )}
          </>
        }
        aside={
          <Card className="space-y-4">
            <p className="font-semibold">Next step</p>
            <Button full variant="primary" onClick={() => setPrep(true)} cost={1}>Prepare for interview</Button>
            <Button full onClick={() => setStatus(app.id, "Interview")} disabled={app.status === "Interview"}>Mark as interview</Button>
            <Button full disabled>Set follow-up reminder</Button>
            <Note>CareerPilot never sends or submits applications. Demo: interview prep doesn’t deduct a credit.</Note>
          </Card>
        }
      />
    </>
  );
}
