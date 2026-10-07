# CareerPilot demo app

Clickable demo of the CareerPilot candidate flow, built from the Figma wireframe prototype (CareerPilot · Desktop wireframe prototype). Next.js 16 + Tailwind CSS 4, illustrative data only, state kept in the browser (localStorage).

## Flow

`/` sign-in → `/onboarding/upload` → `/onboarding/review` (80% completeness gate) → `/onboarding/preferences` → `/dashboard` → `/jobs` → `/jobs/[id]` (score, Why it fits, Prepare −1, Apply, Save) → `/jobs/[id]/score` → `/jobs/[id]/prepare` (evidence, strategy, generate CV / letter −1) → `/jobs/[id]/prepare/cv` (review changes, export) → `/jobs/[id]/applied` (Did you apply?) → `/applications` → `/applications/[id]` (status, interview prep)

The credits badge opens the wallet dialog (pay as you apply · Coming soon) with demo controls to use all credits or reset.

## Run locally

```
npm install
npm run dev
```

## Deploy (Vercel)

Root Directory `app`, Framework Preset Next.js; build and output settings on default.
