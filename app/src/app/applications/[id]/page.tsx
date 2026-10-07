"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Button, Card, Columns, ListItem, Note, PageHead } from "@/components/ui";
import { useStore, type Status } from "@/components/store";
import { getJob } from "@/lib/jobs";

const STATUSES: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { applications, setStatus, credits } = useStore();
  const [prep, setPrep] = useState(false);
  const app = applications.find((a) => a.id === id);
  const job = getJob(id);
  if (!app || !job)
    return (
      <div className="space-y-4">
        <PageHead title="Application not found" sub="Confirm an application after applying on the job site." />
        <Button href="/applications">Back to applications</Button>
      </div>
    );
  return (
    <>
      <PageHead
        crumb={<><Link href="/applications" className="underline">Applications</Link> / {app.role}</>}
        title="Application details"
        sub={`${app.role} · ${app.company} · confirmed application.`}
      />
      <Columns
        main={
          <>
            <ListItem title="Saved application record" meta={`Applied ${app.date} · Bundesagentur · ${job.language} · ${app.doc}`} />
            <ListItem title="Saved job description" meta={`${job.jd} This snapshot remains after source expiry.`} />
            <div className="rounded-lg border border-line bg-white px-6 py-4">
              <p className="font-semibold">Status · {app.status}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(app.id, s)}
                    className={`min-h-11 rounded-lg border px-4 text-sm font-semibold ${app.status === s ? "border-navy bg-navy text-white" : "border-line bg-white hover:border-navy"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {prep && (
              <Card title="Prepare for interview · demo">
                <p>Questions based on the saved job description and your gaps:</p>
                <ul className="list-disc pl-5">
                  <li>Walk us through a report you built end to end. Which SQL did you use?</li>
                  <li>How would you explain a data quality issue to a product team?</li>
                  <li>Your profile shows limited production reporting. How would you ramp up?</li>
                </ul>
                <p className="text-sm text-muted">Shown in the demo; first item to cut if planning runs tight.</p>
              </Card>
            )}
          </>
        }
        aside={
          <>
            <Card title="Next step"><p>Track progress here. CareerPilot does not send or automatically submit applications.</p></Card>
            <Button variant="primary" onClick={() => setStatus(app.id, "Interview")} disabled={app.status === "Interview"}>Mark as interview</Button>
            <Button onClick={() => setPrep(true)} disabled={credits <= 0 && !prep}>Prepare for interview · −1</Button>
            <Button disabled>Set follow-up reminder</Button>
            <Button href="/applications">Back to applications</Button>
            <Note>Demo: interview prep does not deduct a credit.</Note>
          </>
        }
      />
    </>
  );
}
