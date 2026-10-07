import { AuthFrame } from "@/components/Onboarding";
import { Button, Card, Chip, Note } from "@/components/ui";

const ROWS: [string, string[]][] = [
  ["Roles", ["Data & analytics", "Junior to mid-level"]],
  ["Location", ["Leipzig", "within 50 km", "Hybrid or remote"]],
  ["Languages", ["German B2", "English C1"]],
  ["Minimum fit", ["75% and above"]],
  ["Digest", ["Weekly", "Monday 09:00"]],
];

export default function Preferences() {
  return (
    <AuthFrame step={3} aside={<><p className="text-3xl font-bold leading-tight">One digest instead of five job boards.</p><p className="text-white/70">Everyone gets their digest at the time they chose. No paid boosts, no early alerts.</p></>}>
      <Card className="p-8">
        <h1 className="text-2xl font-bold">Set your preferences</h1>
        <p className="mt-1 text-muted">Define the roles you want to see.</p>
        <dl className="mt-6 divide-y divide-line">
          {ROWS.map(([k, v]) => (
            <div key={k} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <dt className="text-sm font-medium text-muted">{k}</dt>
              <dd className="flex flex-wrap gap-2">{v.map((x) => <Chip key={x} tone="white">{x}</Chip>)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" href="/jobs">Show my matches</Button>
          <Button variant="ghost" href="/dashboard">Go to dashboard</Button>
        </div>
        <div className="mt-3"><Note>Job sources: public job lists of the Bundesagentur für Arbeit.</Note></div>
      </Card>
    </AuthFrame>
  );
}
