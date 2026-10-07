"use client";
import { useState } from "react";
import { AuthFrame } from "@/components/Onboarding";
import { Button, Card, Field, Note } from "@/components/ui";

export default function Review() {
  const [lang, setLang] = useState("English C1 · German B2");
  const [edu, setEdu] = useState("BSc Economics · year?");
  const done = /\d{4}/.test(edu);
  const pct = done ? 82 : 72;
  return (
    <AuthFrame step={2} aside={<><p className="text-3xl font-bold leading-tight">{pct}% complete</p><div className="h-2 rounded-full bg-white/15"><div className="h-2 rounded-full bg-flare transition-all" style={{ width: `${pct}%` }} /></div><p className="text-white/70">Scores are shown at any completeness. A more complete profile raises confidence, never the fit itself.</p></>}>
      <Card className="p-8">
        <h1 className="text-2xl font-bold">Review your profile</h1>
        <p className="mt-1 text-muted">Confirm the facts so your scores rest on confirmed data.</p>
        <div className="mt-6 space-y-4">
          <Field label="Recent experience" value="Data analyst intern · Example Services · 2024–2026" />
          <Field label="Skills" value="SQL, reporting, Python" />
          <Field label="Working languages" hint="Check level" value={lang} onChange={setLang} />
          <Field label="Education" hint={done ? undefined : "Add graduation year"} value={edu} onChange={setEdu} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="primary" href="/onboarding/preferences" >Confirm profile</Button>
          <Button variant="ghost" href="/dashboard">Finish later</Button>
        </div>
        {!done && <div className="mt-3"><Note>Add your graduation year (for example 2025) to raise completeness and the confidence of your scores. You can also continue now.</Note></div>}
      </Card>
    </AuthFrame>
  );
}
