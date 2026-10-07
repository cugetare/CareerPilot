import { Button, ListItem, PageHead } from "@/components/ui";

export default function Saved() {
  return (
    <div className="space-y-4">
      <PageHead title="Saved jobs" sub="Jobs you saved stay here until you apply or remove them." />
      <ListItem href="/jobs/data-analyst" title="Data analyst · 92% fit" meta="Example Systems · Leipzig / hybrid · saved today" />
      <Button href="/jobs">Back to jobs</Button>
    </div>
  );
}
