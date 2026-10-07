"use client";
import { useState } from "react";
import { Button, Card, Columns, Field, Note, PageHead } from "@/components/ui";

export default function Review() {
  const [lang, setLang] = useState("English C1 · German B2");
  const [edu, setEdu] = useState("BSc Economics · confirm graduation year");
  const done = !edu.includes("confirm");
  const pct = done ? 86 : 76;
  return (
    <>
      <PageHead title="Review your profile" sub="Step 2 of 3 · Confirm the facts before scores are shown." />
      <Columns
        main={
          <>
            <Field label="Recent experience" value="Data analyst intern · Example Services · 2024–2026" />
            <Field label="Skills" value="SQL, reporting, Python" />
            <Field label="Working languages · needs review" value={lang} onChange={setLang} />
            <Field label="Education · needs review" value={edu} onChange={setEdu} />
          </>
        }
        aside={
          <>
            <Card title={`${pct}% complete · ${done ? "ready for matching" : "scores hidden"}`}>
              <p>{done ? "Your profile passes the 80% completeness gate." : "Confirm your graduation year to reach the 80% completeness gate."}</p>
            </Card>
            <Note>Uncertain fields need your review; completeness is separate from job fit.</Note>
            <Button variant="primary" href="/onboarding/preferences" disabled={!done}>Confirm reviewed profile</Button>
            <Button href="/dashboard">Save and finish later</Button>
            {!done && <Note>Tip: replace “confirm graduation year” with a year, e.g. 2025.</Note>}
          </>
        }
      />
    </>
  );
}
