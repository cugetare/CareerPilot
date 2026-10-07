import { Button, PageHead } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="space-y-4">
      <PageHead title="Page not found" sub="This page isn’t part of the demo." />
      <Button variant="primary" href="/dashboard">Go to dashboard</Button>
    </div>
  );
}
