import { Button, Card, Columns, Field, PageHead } from "@/components/ui";

export default function Preferences() {
  return (
    <>
      <PageHead title="Set your preferences" sub="Step 3 of 3 · Define the roles you want to see." />
      <Columns
        main={
          <>
            <Field label="Domain / seniority" value="Data & analytics · Junior to mid-level" />
            <Field label="Location / distance" value="Leipzig · within 50 km · Germany" />
            <Field label="Remote / working language" value="Hybrid or remote · German B2 / English" />
            <Field label="Minimum fit" value="75% and above" />
          </>
        }
        aside={
          <>
            <Field label="Digest schedule" value="Weekly · Monday · 09:00 local time" />
            <Card title="Choose your schedule">
              <p>Notifications follow your chosen timing. Ranking has no paid boosts.</p>
            </Card>
            <Button variant="primary" href="/dashboard">Save preferences</Button>
            <Button href="/jobs">View job results</Button>
          </>
        }
      />
    </>
  );
}
