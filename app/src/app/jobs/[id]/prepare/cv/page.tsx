"use client";
import { Suspense, use, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { Button, Card, Chip, Note, PageHead, TwoCol } from "@/components/ui";
import { getJob } from "@/lib/jobs";
import { track } from "@/lib/analytics";

const ORIGINAL = "Produced weekly reports for the operations team.";
const PROPOSED = "Produced weekly operations reports using SQL and reporting tools.";

function Review({ id }: { id: string }) {
  const job = getJob(id);
  const doc = useSearchParams().get("doc") === "letter" ? "cover letter" : "CV";
  const [state, setState] = useState<"pending" | "accepted" | "rejected" | "editing">("pending");
  const [text, setText] = useState(PROPOSED);
  const [exported, setExported] = useState(false);
  if (!job) notFound();
  const reviewed = state === "accepted" || state === "rejected";

  return (
    <>
      <PageHead
        crumbs={[{ label: "Matches", href: "/jobs" }, { label: job.title, href: `/jobs/${id}` }, { label: "Prepare", href: `/jobs/${id}/prepare` }, { label: doc }]}
        title={`Review your tailored ${doc}`}
        sub="Accept, reject or edit each change. Nothing is exported until you have reviewed it."
        right={reviewed ? <Chip tone="good">✓ All changes reviewed</Chip> : <Chip tone="flare">1 change to review</Chip>}
      />
      <TwoCol
        main={
          <Card className="space-y-5">
            <p className="text-sm font-semibold text-muted">Experience summary</p>
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Original</p>
              <p className={`mt-1 ${state === "rejected" ? "" : "text-muted line-through decoration-flare/60"}`}>{ORIGINAL}</p>
            </div>
            <div className={`rounded-2xl p-4 ring-1 ${state === "rejected" ? "bg-canvas ring-line" : "bg-good-tint/60 ring-good/20"}`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-good">Proposed · supported by your profile</p>
              {state === "editing" ? (
                <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="mt-2 w-full rounded-xl bg-white p-3 ring-1 ring-line outline-none focus:ring-2 focus:ring-navy" />
              ) : (
                <p className={`mt-1 ${state === "rejected" ? "text-muted line-through" : ""}`}>{text}</p>
              )}
            </div>
            <p className="text-sm text-muted">Evidence: Operations analyst internship · confirmed experience. No invented achievements.</p>
            <div className="flex flex-wrap gap-3 border-t border-line pt-5">
              <Button variant="primary" onClick={() => { track("cv_change_reviewed", { action: state === "editing" ? "edited" : "accepted", doc }); setState("accepted"); }}>{state === "editing" ? "Save wording" : "Accept"}</Button>
              <Button onClick={() => setState("editing")}>Edit</Button>
              <Button onClick={() => { track("cv_change_reviewed", { action: "rejected", doc }); setState("rejected"); }}>Reject</Button>
              <Button variant="ghost" onClick={() => { setText(PROPOSED); setState("pending"); }} cost={0}>Regenerate</Button>
            </div>
          </Card>
        }
        aside={
          <Card className="space-y-4">
            <p className="font-semibold">Export</p>
            <Button full variant="primary" disabled={!reviewed} onClick={() => { track("document_exported", { format: "pdf", doc }); setExported(true); }}>Export PDF</Button>
            <Button full disabled={!reviewed} onClick={() => { track("document_exported", { format: "docx", doc }); setExported(true); }}>Export DOCX</Button>
            {exported ? (
              <div className="rounded-2xl bg-good-tint p-4 text-sm"><p className="font-semibold text-good">Document ready</p><p className="mt-1">Demo export: no file is created.</p></div>
            ) : (
              <Note>{reviewed ? "Ready to export." : "Review the change to enable export."}</Note>
            )}
            <div className="border-t border-line pt-4"><Button full variant="ghost" href={`/jobs/${id}/prepare`}>Back to preparation</Button></div>
          </Card>
        }
      />
    </>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <Suspense><Review id={id} /></Suspense>;
}
