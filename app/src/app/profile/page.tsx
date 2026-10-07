import { Button, Card, Chip, Eyebrow, PageHead, TwoCol } from "@/components/ui";

export default function Profile() {
  return (
    <>
      <PageHead title="Your profile" sub="Only what you confirmed. Nothing is shared with employers." />
      <TwoCol
        main={
          <Card className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">L</span>
              <div><p className="text-lg font-semibold">Lena</p><p className="text-sm text-muted">Data & analytics · Leipzig</p></div>
            </div>
            {[["Skills", ["SQL", "Reporting", "Python"]], ["Languages", ["English C1", "German B2"]], ["Education", ["BSc Economics · 2025"]]].map(([k, v]) => (
              <div key={k as string}><Eyebrow>{k as string}</Eyebrow><div className="mt-2 flex flex-wrap gap-2">{(v as string[]).map((x) => <Chip key={x}>{x}</Chip>)}</div></div>
            ))}
          </Card>
        }
        aside={
          <Card className="space-y-4">
            <Eyebrow>Completeness</Eyebrow>
            <p className="text-3xl font-bold">86%</p>
            <div className="h-2 rounded-full bg-mist"><div className="h-2 w-[86%] rounded-full bg-navy" /></div>
            <Button full href="/onboarding/review">Review profile</Button>
            <Button full variant="ghost" href="/onboarding/preferences">Edit preferences</Button>
          </Card>
        }
      />
    </>
  );
}
