"use client";
import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button, Card, Chip, Field, Note, PageHead, TwoCol } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob, SOURCE_URL } from "@/lib/jobs";

const EVIDENCE = [
  { t: "Strengths", d: "SQL projects and Python analysis align with the job description.", tone: "good" as const, icon: "✓" },
  { t: "Gaps", d: "Limited production reporting experience is documented.", tone: "flare" as const, icon: "!" },
  { t: "Transferables", d: "Thesis reporting and internship analysis support the role.", tone: "mist" as const, icon: "↗" },
  { t: "Risks", d: "Confirm working-language requirements against your profile.", tone: "flare" as const, icon: "?" },
];
const ICON = { good: "bg-good-tint text-good", flare: "bg-flare-tint text-flare-ink", mist: "bg-mist text-navy" };

export default function Prepare({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const router = useRouter();
  const { has, mark, spend, credits } = useStore();
  const [emph, setEmph] = useState("SQL reporting project and Python analysis");
  const [gap, setGap] = useState("Describe relevant internship reporting work");
  const [tone, setTone] = useState("Neutral · German");
  if (!job) notFound();
  if (!has("prepared", job.id))
    return (
      <Card className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold">Prepare your application</h1>
        <p className="mt-2 text-muted">Start preparation from the job page; it uses 1 credit.</p>
        <Button variant="primary" href={`/jobs/${job.id}`} className="mt-6">Back to {job.title}</Button>
      </Card>
    );
  const confirmed = has("strategyConfirmed", job.id);
  const gen = (kind: "cv" | "letter") => {
    const key = `${kind}:${job.id}`;
    if (spend(key)) { mark("generated", key); router.push(`/jobs/${job.id}/prepare/cv?doc=${kind}`); }
  };
  const done = (k: string) => has("generated", `${k}:${job.id}`);
  const blocked = (k: string) => !confirmed || (credits <= 0 && !done(k));

  return (
    <>
      <PageHead
        crumbs={[{ label: "Matches", href: "/jobs" }, { label: job.title, href: `/jobs/${job.id}` }, { label: "Prepare" }]}
        title="Prepare your application"
        sub="Review the full evidence, then confirm a strategy before CareerPilot writes anything."
        right={<Chip tone="good">✓ Preparation unlocked</Chip>}
      />
      <TwoCol
        main={
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {EVIDENCE.map((e) => (
                <Card key={e.t} className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${ICON[e.tone]}`}>{e.icon}</span>
                    <h2 className="text-lg font-semibold">{e.t}</h2>
                  </div>
                  <p className="mt-3 flex-1 text-[15px]">{e.d}</p>
                  <button type="button" className="mt-4 self-start text-sm font-semibold underline">View source evidence</button>
                </Card>
              ))}
            </div>
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Your application strategy</h2>
                {confirmed ? <Chip tone="good">✓ Confirmed</Chip> : <Chip tone="flare">Step 1 · confirm to unlock documents</Chip>}
              </div>
              <div className="mt-5 grid gap-4">
                <Field label="Emphasise" value={emph} onChange={confirmed ? undefined : setEmph} />
                <Field label="Address the gap" value={gap} onChange={confirmed ? undefined : setGap} />
                <Field label="Tone and language" value={tone} onChange={confirmed ? undefined : setTone} />
              </div>
              {!confirmed && <Button variant="primary" className="mt-5" onClick={() => mark("strategyConfirmed", job.id)}>Confirm strategy</Button>}
            </Card>
          </>
        }
        aside={
          <Card className="space-y-4">
            <p className="font-semibold">Documents</p>
            <Button full variant={confirmed ? "primary" : "secondary"} disabled={blocked("cv")} onClick={() => gen("cv")} cost={done("cv") ? 0 : 1}>{done("cv") ? "Open CV" : "Generate CV"}</Button>
            <Button full disabled={blocked("letter")} onClick={() => gen("letter")} cost={done("letter") ? 0 : 1}>{done("letter") ? "Open cover letter" : "Generate cover letter"}</Button>
            <Note>{confirmed ? "You review every change before export. Regeneration is included." : "Generation unlocks after you confirm the strategy."}</Note>
            <div className="border-t border-line pt-4">
              <Button full href={SOURCE_URL} external cost={0} onClick={() => setTimeout(() => router.push(`/jobs/${job.id}/applied`), 300)}>Apply on job site</Button>
            </div>
          </Card>
        }
      />
    </>
  );
}
