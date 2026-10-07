"use client";
import { Button, Card, Columns, ListItem, Note, PageHead } from "@/components/ui";
import { useStore } from "@/components/store";

export default function Applications() {
  const { applications } = useStore();
  return (
    <>
      <PageHead title="Your applications" sub="Keep confirmed applications and saved job descriptions together." />
      <Columns
        main={
          applications.length ? (
            applications.map((a) => (
              <ListItem key={a.id} href={`/applications/${a.id}`} title={`${a.role} · ${a.status}`} meta={`${a.company} · ${a.date} · ${a.doc}`} />
            ))
          ) : (
            <ListItem title="No confirmed applications yet" meta="Apply on a job site, then confirm it here." />
          )
        }
        aside={
          <>
            <Card title="Update in two clicks"><p>Open an application, then choose Applied, Interview, Offer or Rejected.</p></Card>
            <Button variant="primary" href={`/applications/${applications[0]?.id ?? ""}`} disabled={!applications.length}>Open latest application</Button>
            <Button href="/jobs">Browse jobs</Button>
            <Note>Interview prep is offered from an application once you’ve applied.</Note>
          </>
        }
      />
    </>
  );
}
