"use client";
import Link from "next/link";
import { Button, Card, Note, PageHead } from "@/components/ui";
import { useStore } from "@/components/store";
import { JOBS } from "@/lib/jobs";

export default function Dashboard() {
  const { credits, applications } = useStore();
  return (
    <>
      <PageHead title="Good morning, Lena" sub="Your profile is ready for matching. Choose a role to understand the fit." />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="86% complete"><p>Review your profile if your experience changes.</p></Card>
        <Card title={`${credits} credits left today`}><p>Free scoring. Daily credits reset at local midnight.</p></Card>
        <Card title={`${applications.length} application${applications.length === 1 ? "" : "s"}`}><p>Keep your confirmed application statuses up to date.</p></Card>
      </div>
      <h2 className="mt-10 text-2xl font-semibold">Roles worth a closer look</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {JOBS.map((j) => (
          <Link key={j.id} href={`/jobs/${j.id}`} className="rounded-lg border border-line bg-white p-4 hover:border-navy">
            <p className="text-2xl font-semibold">{j.title} · {j.fit}% fit</p>
            <p className="mt-2">{j.company} · {j.place}</p>
            <p className="text-muted">{j.language} · {j.why}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="primary" href="/jobs/data-analyst">Explore this role</Button>
        <Note>Illustrative profile, roles and scores. No live matching results.</Note>
      </div>
    </>
  );
}
