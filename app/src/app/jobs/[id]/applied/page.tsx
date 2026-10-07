"use client";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button, Card, Note, PageHead } from "@/components/ui";
import { useStore } from "@/components/store";
import { getJob } from "@/lib/jobs";

export default function Applied({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJob(id);
  const router = useRouter();
  const { applications, logApplication, has } = useStore();
  if (!job) notFound();
  const logged = applications.some((a) => a.id === job.id);
  const doc = has("generated", `cv:${job.id}`) ? "CV EN · reviewed version" : "Your own CV";
  return (
    <div className="mx-auto max-w-[720px] space-y-6">
      <PageHead title="Did you apply?" sub="You’ve opened the original job posting in a separate tab." />
      <Card title={`${job.title} · ${job.company}`}>
        <p>Source: Bundesagentur · application date: today</p>
        <p className="pt-2 text-sm text-muted">Document used</p>
        <p>{doc}</p>
        <p className="pt-2 text-sm text-muted">Confirm only after you’ve completed the application on the employer’s website.</p>
      </Card>
      {logged ? (
        <Card title="This application is already logged"><p>Open it in your applications to update the status.</p></Card>
      ) : null}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="primary"
          onClick={() => {
            logApplication({ id: job.id, role: job.title, company: job.company, date: "today", doc, status: "Applied" });
            router.push(`/applications/${job.id}`);
          }}
        >
          Yes, log application
        </Button>
        <Button href={`/jobs/${job.id}`}>Not yet</Button>
      </div>
      <Note>Logging saves the job description with your application, so it stays readable after the posting expires.</Note>
    </div>
  );
}
