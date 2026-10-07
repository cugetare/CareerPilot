import { AuthFrame } from "@/components/Onboarding";
import { Card, Note } from "@/components/ui";
import Link from "next/link";

const PROVIDERS = ["Google", "Microsoft", "Apple"];
const MORE = ["GitHub", "LinkedIn"];

function Sso({ name }: { name: string }) {
  return (
    <Link href="/onboarding/upload" className="flex h-12 items-center gap-3 rounded-2xl bg-white px-4 text-[15px] font-semibold ring-1 ring-line transition hover:ring-navy">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-xs font-bold">{name[0]}</span>
      Continue with {name}
    </Link>
  );
}

export default function Welcome() {
  return (
    <AuthFrame>
      <Card className="p-8 sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to CareerPilot</h1>
        <p className="mt-2 text-muted">Understand your fit. Prepare with confidence.</p>
        <div className="mt-8 space-y-3">
          {PROVIDERS.map((p) => <Sso key={p} name={p} />)}
          <div className="flex items-center gap-3 py-1 text-[13px] text-muted"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
          {MORE.map((p) => <Sso key={p} name={p} />)}
        </div>
        <p className="mt-6 text-sm">
          Already have a profile? <Link href="/dashboard" className="font-semibold underline">Go to your dashboard</Link>
        </p>
      </Card>
      <div className="mt-4 px-2"><Note>Demo sign-in: no account is created and nothing leaves your browser. By continuing you agree to the Terms and Privacy Policy.</Note></div>
    </AuthFrame>
  );
}
