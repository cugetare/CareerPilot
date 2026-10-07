"use client";
import Link from "next/link";
import { Card, Eyebrow, Note, PageHead } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { useStore } from "@/components/store";
import { Reticle } from "@/components/Logo";
import { JOBS } from "@/lib/jobs";

export default function Dashboard() {
  const { credits, daily, applications } = useStore();
  const stats = [
    { k: "Profile", v: "82%", d: "Add 2 skills and a summary to raise confidence", href: "/profile" },
    { k: "Credits today", v: `${credits}/${daily}`, d: "Scores are always free", href: "" },
    { k: "Applications", v: String(applications.length), d: "Keep statuses up to date", href: "/applications" },
  ];
  return (
    <>
      <PageHead title="Good morning, Lena" sub="Your weekly digest is in: 10 roles, 2 at or above your minimum fit." />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const body = (
            <Card className="h-full">
              <Eyebrow>{s.k}</Eyebrow>
              <p className="mt-2 flex items-center gap-2 text-3xl font-bold">{s.k === "Credits today" && <Reticle className="h-6 w-6" />}{s.v}</p>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </Card>
          );
          return s.href ? <Link key={s.k} href={s.href} className="transition hover:-translate-y-0.5">{body}</Link> : <div key={s.k}>{body}</div>;
        })}
      </div>
      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-xl font-bold">Roles worth a closer look</h2>
        <Link href="/jobs" className="text-sm font-semibold underline">See all matches</Link>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {JOBS.slice(0, 2).map((j) => <JobCard key={j.id} job={j} />)}
      </div>
      <div className="mt-6"><Note>Illustrative profile, roles and scores. No live matching results.</Note></div>
    </>
  );
}
