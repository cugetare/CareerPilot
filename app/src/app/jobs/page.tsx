import { Card, Chip, Eyebrow, Note, PageHead, Button, TwoCol } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { JOBS } from "@/lib/jobs";

export default function Jobs() {
  const sorted = [...JOBS].sort((a, b) => b.fit - a.fit);
  return (
    <>
      <PageHead title="Your matches" sub="4 roles meet your preferences this week, ranked by fit only." />
      <TwoCol
        main={
          <div className="flex flex-col gap-4">
            {sorted.map((j) => <JobCard key={j.id} job={j} />)}
            <Card tone="mist" className="p-5">
              <p className="font-semibold">Same vacancy, one result</p>
              <p className="text-sm text-muted">Original source and translated versions are grouped to avoid duplicates.</p>
            </Card>
          </div>
        }
        aside={
          <>
            <Card>
              <Eyebrow>Your filters</Eyebrow>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Data & analytics", "Junior–mid", "Leipzig + 50 km", "DE / EN", "Fit ≥ 75%"].map((f) => <Chip key={f}>{f}</Chip>)}
              </div>
              <Button full href="/onboarding/preferences" className="mt-5">Change filters</Button>
            </Card>
            <Card tone="navy">
              <p className="font-semibold">Neutral ranking</p>
              <p className="mt-1 text-sm text-white/75">No paid placement, no sponsored jobs. Paying for credits never moves a job up.</p>
            </Card>
            <Note>Sample roles and scores illustrate the demo.</Note>
          </>
        }
      />
    </>
  );
}
