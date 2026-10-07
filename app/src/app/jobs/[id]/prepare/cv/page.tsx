"use client";
import { Suspense, use, useState } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { Button, Card, Columns, Note, PageHead } from "@/components/ui";
import { getJob } from "@/lib/jobs";

const ORIGINAL = "Produced weekly reports for the operations team.";
const PROPOSED = "Produced weekly operations reports using SQL and reporting tools.";

function Review({ id }: { id: string }) {
  const job = getJob(id);
  const doc = useSearchParams().get("doc") === "letter" ? "cover letter" : "CV";
  const [state, setState] = useState<"pending" | "accepted" | "rejected" | "editing">("pending");
  const [text, setText] = useState(PROPOSED);
  const [exported, setExported] = useState(false);
  if (!job) notFound();
  const final = state === "rejected" ? ORIGINAL : text;

  return (
    <>
      <PageHead
        crumb={<><Link href="/jobs" className="underline">Jobs</Link> / <Link href={`/jobs/${id}`} className="underline">{job.title}</Link> / <Link href={`/jobs/${id}/prepare`} className="underline">Prepare</Link> / {doc}</>}
        title={`Review your tailored ${doc}`}
        sub="Compare each proposed change before exporting."
      />
      <Columns
        main={
          <div className="rounded-lg border border-line bg-white p-6 space-y-4">
            <div>
              <p className="text-sm text-muted">Original · experience summary</p>
              <p className={state === "accepted" || state === "editing" ? "line-through text-muted" : ""}>{ORIGINAL}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Proposed · supported change</p>
              {state === "editing" ? (
                <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-line p-3" rows={3} />
              ) : (
                <p className={state === "rejected" ? "line-through text-muted" : "bg-mist px-1"}>{text}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted">Evidence linked to your profile</p>
              <p>Operations analyst internship · confirmed experience. No invented achievements.</p>
            </div>
          </div>
        }
        aside={
          <>
            <Card title={state === "pending" || state === "editing" ? "1 change awaiting review" : "All changes reviewed"}>
              <p>{state === "rejected" ? "Original wording preserved." : "Accept, reject or edit the wording. Rejected changes retain the original text."}</p>
            </Card>
            <Note>Regeneration of this prepared document is included.</Note>
            <Button variant="primary" onClick={() => setState("accepted")}>{state === "editing" ? "Save wording" : "Accept change"}</Button>
            <Button onClick={() => setState("rejected")}>Reject all changes</Button>
            <Button onClick={() => setState("editing")}>Edit wording</Button>
            <Button onClick={() => { setText(PROPOSED); setState("pending"); }}>Regenerate · included</Button>
            <Button disabled={state === "pending" || state === "editing"} onClick={() => setExported(true)}>Export PDF / DOCX</Button>
            {exported && (
              <Card title="Document ready">
                <p>“{final}”</p>
                <p className="text-sm text-muted">Demo export: no file is created.</p>
                <Link href={`/jobs/${id}/prepare`} className="font-semibold underline">Back to preparation</Link>
              </Card>
            )}
          </>
        }
      />
    </>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <Suspense><Review id={id} /></Suspense>;
}
