import { Button, Card, Columns, PageHead, Note } from "@/components/ui";

export default function Welcome() {
  return (
    <>
      <PageHead title="Welcome to CareerPilot" sub="Understand your fit. Prepare with confidence." />
      <Columns
        main={
          <Card title="Your next application, with a clear plan">
            <p>Find relevant roles, review the evidence and keep your application history together.</p>
            <p className="pt-4 font-semibold">Your profile stays in your control</p>
            <p className="text-muted">Nothing is shared with employers. You decide what goes into your profile.</p>
          </Card>
        }
        aside={
          <>
            <p>Continue with your existing account.</p>
            <Button variant="primary" href="/onboarding/upload">Continue with Google</Button>
            <Button href="/onboarding/upload">Microsoft / Apple</Button>
            <Button href="/onboarding/upload">GitHub / LinkedIn</Button>
            <Button href="/dashboard">Already have a profile</Button>
            <Note>Demo sign-in: no account is created and no data leaves your browser.</Note>
          </>
        }
      />
    </>
  );
}
