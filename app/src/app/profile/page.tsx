import { Button, Card, PageHead } from "@/components/ui";

export default function Profile() {
  return (
    <div className="max-w-[816px] space-y-4">
      <PageHead title="Manage your profile" sub="86% complete · ready for matching." />
      <Card title="Lena · Data & analytics"><p>SQL, reporting, Python · English C1 · German B2 · BSc Economics 2025</p></Card>
      <div className="flex flex-wrap gap-4">
        <Button href="/onboarding/review">Review profile</Button>
        <Button href="/onboarding/preferences">Edit preferences</Button>
      </div>
    </div>
  );
}
