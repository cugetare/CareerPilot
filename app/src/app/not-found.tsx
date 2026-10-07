import { Button, Card } from "@/components/ui";
export default function NotFound() {
  return (
    <Card className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">This page isn’t part of the demo.</p>
      <Button variant="primary" href="/dashboard" className="mt-6">Go to dashboard</Button>
    </Card>
  );
}
