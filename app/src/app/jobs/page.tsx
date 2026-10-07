import { Card, Chip, Eyebrow, Note, PageHead, Button, TwoCol } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { JOBS, MIN_FIT, MIN_LIST } from "@/lib/jobs";

export default function Jobs() {
  const sorted = [...JOBS].sort((a, b) => b.fit - a.fit);
  const above = sorted.filter((j) => j.fit >= MIN_FIT);
  const below = sorted.filter((j) => j.fit < MIN_FIT).slice(0, Math.max(0, MIN_LIST - above.length));
  return (
    <>
      <PageHead title="Your matches" sub={`${above.length} roles meet your minimum fit of ${MIN_FIT}% this week. The next best ${below.length} are shown below, so you always see ${MIN_LIST}. Ranked by fit only.`} />
      <TwoCol
        main={
          <div className="flex flex-col gap-4">
            {above.map((j) => <JobCard key={j.id} job={j} />)}
            {below.length > 0 && (
              <div className="mt-4 space-y-1">
                <Eyebrow>Below your minimum fit</Eyebrow>
                <p className="text-sm text-muted">Best remaining roles under {MIN_FIT}%. Open one to see what is missing.</p>
              </div>
            )}
            {below.map((j) => <JobCard key={j.id} job={j} below />)}
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
                {["Data & analytics", "Junior–mid", "Leipzig + 50 km", "DE / EN", `Fit ≥ ${MIN_FIT}%`].map((f) => <Chip key={f}>{f}</Chip>)}
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
