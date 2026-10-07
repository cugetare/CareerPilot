"use client";
import Link from "next/link";
import { Card, Chip, Note, PageHead, TwoCol } from "@/components/ui";
import { useStore, type Status } from "@/components/store";

const STATUS_TONE: Record<Status, "mist" | "good" | "flare" | "white"> = { Applied: "mist", Interview: "good", Offer: "good", Rejected: "flare" };

export default function Applications() {
  const { applications } = useStore();
  return (
    <>
      <PageHead title="Your applications" sub="Every confirmed application, with the job description saved at the time you applied." />
      <TwoCol
        main={
          applications.length ? (
            <div className="flex flex-col gap-3">
              {applications.map((a) => (
                <Link key={a.id} href={`/applications/${a.id}`} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-line/70 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mist font-bold">{a.company.split(" ")[1]?.[0] ?? "E"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{a.role}</p>
                    <p className="text-sm text-muted">{a.company} · {a.date} · {a.doc}</p>
                  </div>
                  <Chip tone={STATUS_TONE[a.status]}>{a.status}</Chip>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="text-center"><p className="font-semibold">No confirmed applications yet</p><p className="text-sm text-muted">Apply on a job site, then confirm it here.</p></Card>
          )
        }
        aside={
          <>
            <Card tone="mist"><p className="font-semibold">Update in two clicks</p><p className="mt-1 text-sm">Open an application and choose Applied, Interview, Offer or Rejected.</p></Card>
            <Note>Interview prep opens from an application once you’ve applied.</Note>
          </>
        }
      />
    </>
  );
}
