import { AuthFrame } from "@/components/Onboarding";
import { Button, Card, Note } from "@/components/ui";

export default function Upload() {
  return (
    <AuthFrame step={1} aside={<><p className="text-3xl font-bold leading-tight">Start from the CV you already have.</p><p className="text-white/70">We extract experience, education and skills. You review every field before anything is scored.</p></>}>
      <Card className="p-8">
        <h1 className="text-2xl font-bold">Upload your CV</h1>
        <p className="mt-1 text-muted">Build a profile you can review.</p>
        <div className="mt-6 rounded-3xl border-2 border-dashed border-line bg-canvas p-8 text-center">
          <p className="font-semibold">Drop a PDF or DOCX here</p>
          <p className="mt-1 text-sm text-muted">or choose a file from your computer</p>
          <div className="mx-auto mt-5 flex max-w-xs items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-card">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-xs font-bold">DOCX</span>
            <div className="min-w-0"><p className="truncate font-semibold">Lena-CV-EN.docx</p><p className="text-xs text-muted">Ready to read · 84 KB</p></div>
          </div>
        </div>
        <Note>Only include information you want in your career profile. Scanned pages may need manual review.</Note>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" href="/onboarding/review">Read my CV</Button>
          <Button variant="ghost" href="/onboarding/review">Enter details manually</Button>
        </div>
      </Card>
    </AuthFrame>
  );
}
