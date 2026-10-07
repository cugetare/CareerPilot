"use client";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button, Card, Chip, Note } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob } from "@/lib/jobs";

export default function Applied({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const router = useRouter();
  const { applications, logApplication, has } = useStore();
  if (!job) notFound();
  const logged = applications.some((a) => a.id === job.id);
  const doc = has("generated", `cv:${job.id}`) ? "Tailored CV · reviewed" : "Your own CV";
  return (
    <div className="flex justify-center py-6">
      <Card className="w-full max-w-lg p-8">
        <Chip>Original posting opened in a new tab</Chip>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Did you apply?</h1>
        <p className="mt-2 text-muted">Confirm only after you’ve completed the application on the employer’s website.</p>
        <dl className="mt-6 divide-y divide-line rounded-2xl bg-canvas px-4">
          {[["Role", `${job.title} · ${job.company}`], ["Source", "Bundesagentur für Arbeit"], ["Date", "Today"], ["Document", doc]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
          ))}
        </dl>
        {logged && <p className="mt-4 rounded-2xl bg-flare-tint p-3 text-sm">This application is already logged.</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => { logApplication({ id: job.id, role: job.title, company: job.company, date: "today", doc, status: "Applied" }); router.push(`/applications/${job.id}`); }}>Yes, log application</Button>
          <Button variant="ghost" href={`/jobs/${job.id}`}>Not yet</Button>
        </div>
        <div className="mt-4"><Note>The job description is saved with your application, so it stays readable after the posting expires.</Note></div>
      </Card>
    </div>
  );
}
