import { Button, Card, Columns, ListItem, Note, PageHead } from "@/components/ui";
import { JOBS } from "@/lib/jobs";

export default function Jobs() {
  return (
    <>
      <PageHead title="Find your next role" sub="Roles meeting your preferences · 75% fit and above." />
      <Columns
        main={
          <>
            {JOBS.map((j) => (
              <ListItem
                key={j.id}
                href={`/jobs/${j.id}`}
                title={`${j.title} · ${j.fit}% fit · ${j.confidence} confidence`}
                meta={
                  <>
                    {j.company} · {j.place} · {j.language} · Bundesagentur
                    <span className="mt-1 block text-navy">Why it fits: {j.why}</span>
                  </>
                }
              />
            ))}
            <ListItem title="Same vacancy, one result" meta="Original source and translated version are grouped to avoid duplicates." />
          </>
        }
        aside={
          <>
            <Card title="Current filters"><p>Data · Junior to mid-level · 50 km · DE/EN · ≥75%</p></Card>
            <Note>Sample roles and scores illustrate the demo.</Note>
            <Button variant="primary" href="/jobs/data-analyst">View data analyst</Button>
            <Button href="/onboarding/preferences">Change filters</Button>
          </>
        }
      />
    </>
  );
}
