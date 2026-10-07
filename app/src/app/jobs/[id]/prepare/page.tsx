"use client";
import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Button, Field, Note, PageHead } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob, SOURCE_URL } from "@/lib/jobs";

const EVIDENCE = [
  ["Strengths", "SQL projects and Python analysis align with the JD."],
  ["Gaps", "Limited production reporting experience is documented."],
  ["Transferables", "Thesis reporting and internship analysis support the role."],
  ["Risks", "Confirm working-language requirements against your profile."],
];

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
      <div className="space-y-4">
        <PageHead title="Prepare your application" sub="Open this page from the job to use 1 credit." />
        <Button variant="primary" href={`/jobs/${job.id}`}>Back to {job.title}</Button>
      </div>
    );
  const confirmed = has("strategyConfirmed", job.id);
  const gen = (kind: "cv" | "letter") => {
    const key = `${kind}:${job.id}`;
    if (spend(key)) {
      mark("generated", key);
      router.push(`/jobs/${job.id}/prepare/cv?doc=${kind}`);
    }
  };
  const genLabel = (kind: "cv" | "letter", name: string) =>
    has("generated", `${kind}:${job.id}`) ? `Open ${name.toLowerCase()}` : `Generate ${name} · −1`;
  const noCredits = credits <= 0;

  return (
    <>
      <PageHead
        crumb={<><Link href="/jobs" className="underline">Jobs</Link> / <Link href={`/jobs/${job.id}`} className="underline">{job.title}</Link> / Prepare application</>}
        title="Prepare your application"
        sub="Review the evidence, then edit and confirm your strategy before generating documents."
      />
      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:w-[656px]">
          {EVIDENCE.map(([t, d]) => (
            <div key={t} className="rounded-lg border border-line bg-white p-4">
              <h2 className="text-2xl font-semibold">{t}</h2>
              <p className="mt-2">{d}</p>
              <p className="mt-1 text-sm text-muted underline">View the source evidence</p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-[592px]">
          <h2 className="text-2xl font-semibold">Your application strategy</h2>
          <Field label="Emphasise" value={emph} onChange={confirmed ? undefined : setEmph} />
          <Field label="Address the gap" value={gap} onChange={confirmed ? undefined : setGap} />
          <Field label="Tone / language" value={tone} onChange={confirmed ? undefined : setTone} />
          {confirmed ? (
            <Button disabled>Strategy confirmed ✓</Button>
          ) : (
            <Button variant="primary" onClick={() => mark("strategyConfirmed", job.id)}>Confirm strategy</Button>
          )}
          <Button variant={confirmed ? "primary" : "secondary"} disabled={!confirmed || (noCredits && !has("generated", `cv:${job.id}`))} onClick={() => gen("cv")}>
            {genLabel("cv", "CV")}
          </Button>
          <Button disabled={!confirmed || (noCredits && !has("generated", `letter:${job.id}`))} onClick={() => gen("letter")}>
            {genLabel("letter", "Letter")}
          </Button>
          <Button href={SOURCE_URL} external onClick={() => setTimeout(() => router.push(`/jobs/${job.id}/applied`), 300)}>Apply on job site</Button>
          <Note>Generation unlocks after confirmation. Review every change before export. Regeneration is included.</Note>
        </div>
      </div>
    </>
  );
}
