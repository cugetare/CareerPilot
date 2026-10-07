import { Button, Card, Columns, PageHead } from "@/components/ui";

export default function Upload() {
  return (
    <>
      <PageHead title="Upload your CV" sub="Step 1 of 3 · Build a profile you can review." />
      <Columns
        main={
          <div className="rounded-lg border-2 border-dashed border-line bg-white p-8">
            <p className="text-2xl font-semibold">Drop a PDF or DOCX here</p>
            <p className="mt-2">Choose a CV file. We’ll extract experience, education and skills for your review.</p>
            <p className="mt-6 text-sm text-muted">Selected file</p>
            <p className="font-semibold">Lena-CV-EN.docx</p>
            <p className="mt-4 text-sm text-muted">Scanned pages may need manual review. You decide which extracted details to keep.</p>
          </div>
        }
        aside={
          <>
            <Card title="Before you continue">
              <p>Only include information you want in your career profile.</p>
            </Card>
            <Button variant="primary" href="/onboarding/review">Parse selected CV</Button>
            <Button href="/onboarding/review">Enter details manually</Button>
            <Button disabled>Add another language version</Button>
          </>
        }
      />
    </>
  );
}
