# Monitoring and analytics (Vercel)

How the CareerPilot demo is measured on Vercel, what Vercel can and cannot tell us, and how that maps to the PRD success metrics ([Confluence PRD §4](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/4292609)).

> CareerPilot is a recruiting tool, not an engagement product. We succeed when a user finds a job that fits and leaves. Vercel tells us how people move through the demo and how fast and stable it is; it cannot tell us who got hired.

## What is installed

| Tool | Package | Where | What it collects |
| --- | --- | --- | --- |
| Web Analytics | `@vercel/analytics` | `<Analytics />` in `app/src/app/layout.tsx` | Page views, visitors, referrers, countries, devices; custom events from `app/src/lib/analytics.ts` |
| Speed Insights | `@vercel/speed-insights` | `<SpeedInsights />` in `app/src/app/layout.tsx` | Real-user performance per route |
| Observability | built in | Vercel dashboard → Observability | Requests, function errors and duration, CDN, logs |

**To switch on:** Vercel dashboard → project → **Analytics** → Enable, and **Speed Insights** → Enable. Then redeploy. Data appears after real visits (not in local `npm run dev`).

This replaces the Vercel bot's draft PR #3 (same Web Analytics install, plus Speed Insights and custom events). Close PR #3 without merging.

## What each Vercel plan gives us

Checked against the Vercel docs on 9 October 2026.

| | Hobby (free) | Pro |
| --- | --- | --- |
| Web Analytics events | 50,000 / month; collection pauses after that | Pay per event ($0.03 per 1K) |
| Reporting window | 1 month | 12 months (24 with Web Analytics Plus, $10/month) |
| Custom events (`track`) | **Not available** | Yes, max 2 properties per event (8 with Plus) |
| UTM parameters | No | With Web Analytics Plus |
| Speed Insights | Free: Real Experience Score only, 10,000 events / 30 days | Speed Insights Plus ($10 / project / month): all Core Web Vitals, breakdowns, 30 days |
| Runtime logs | 1 hour | 1 day |
| Observability | Basic | Observability Plus: latency, path breakdowns, longer retention |

**Consequence for the demo:** on Hobby we get page views and the Real Experience Score. The custom events are already in the code and start showing as soon as the project moves to Pro (a 14-day Pro trial is enough for a class demo). Every event carries at most 2 properties so it fits the Pro limit.

## The key limitation: Vercel has no user identity

Vercel Web Analytics does not use cookies. A visitor is a hash of the request that **resets every day**, so the same person on Monday and Tuesday counts as two visitors. That is good for privacy (GDPR, Germany first), but it means Vercel **cannot** measure anything that needs to follow one user over time:

- WAU / MAU, retention at week 4 and week 12, churn, reactivation
- the user lifecycle (Active → At risk → Inactive → Defunct → Hired)
- success stories, time to a fitting job, fit after hire

These PRD metrics need a signed-in user, a backend event store (or a product analytics tool such as PostHog or Amplitude) and the application history. **Planned, not built.** For the MVP, Vercel covers the in-session funnel, performance and reliability.

## PRD metric → where it is measured

| PRD metric | Vercel today (Hobby) | Vercel with custom events (Pro) | Needs product analytics (planned) |
| --- | --- | --- | --- |
| Success stories (north star) | – | `status_changed` with `Offer` (demo proxy only) | ✓ exit reason "hired", offer accepted |
| Time to a fitting job, fit after hire | – | – | ✓ |
| Application-to-interview rate by band | – | `application_logged` vs `status_changed: Interview`, by `band` | ✓ per user |
| Activation | Page-view funnel to `/jobs/[id]` | `prepare_started` | ✓ within 7 days per user |
| Searching engagement, retention, churn, reactivation | – | – | ✓ |
| Abandonment before first list | Funnel `/onboarding/upload` → `/jobs` | – | ✓ |
| Unexported documents | – | `document_generated` vs `document_exported` | ✓ |
| Score trust and transparency use | Views of `/jobs/[id]/score` ÷ `/jobs/[id]` | then `apply_clicked` | ✓ thumbs on evidence (not in demo) |
| Users reaching 0 credits | – | `credits_exhausted`, `credit_blocked` | ✓ per user per day |
| Paid-credit interest (fake door) | – | `wallet_opened` with `credits: 0` | ✓ click on "Coming soon" |
| AI cost per complete application | – | – | ✓ AI usage and billing logs |

## Funnel from page views (works on Hobby)

In **Analytics → Pages**, compare visitors per route:

`/` → `/onboarding/upload` → `/onboarding/review` → `/onboarding/preferences` → `/jobs` → `/jobs/[id]` → `/jobs/[id]/score` → `/jobs/[id]/prepare` → `/jobs/[id]/prepare/cv` → `/jobs/[id]/applied` → `/applications/[id]`

Read it as "where do visitors stop", not as user conversion: the daily hash and shared demo devices make exact rates unreliable.

## Custom events

Defined in `app/src/lib/analytics.ts`; most are sent from the store (`app/src/components/store.tsx`) so every screen tracks the same way. `band` is the fit band of the job: `90+`, `70-89`, `<70`.

| Event | Properties | Sent when |
| --- | --- | --- |
| `credit_spent` | `kind` (prep, cv, letter), `band` | A credit is deducted |
| `credits_exhausted` | – | The last daily credit is spent |
| `credit_blocked` | `band` | The user tries a paid step with 0 credits |
| `prepare_started` | `band` | Prepare application unlocked for a job |
| `strategy_confirmed` | `band` | Strategy confirmed before writing |
| `document_generated` | `kind`, `band` | Tailored CV or cover letter generated |
| `cv_change_reviewed` | `action` (accepted, edited, rejected), `doc` | A proposed change is reviewed |
| `document_exported` | `format` (pdf, docx), `doc` | Export clicked (demo: no file) |
| `apply_clicked` | `from` (job, prepare), `band` | Apply on job site |
| `application_logged` | `band` | "Yes, log application" |
| `status_changed` | `status`, `band` | Application status changes (Interview, Offer, Rejected) |
| `wallet_opened` | `credits` | Credits wallet opened |

**Rules:** no names, emails, CV text or free text in events; max 2 properties; event and value names under 255 characters. Analytics errors are swallowed so they never break the demo.

## Performance (Speed Insights)

Targets, using Google's "good" thresholds for Core Web Vitals:

| Metric | Target |
| --- | --- |
| Real Experience Score | ≥ 90 |
| LCP (largest content shown) | ≤ 2.5 s |
| INP (response to a click) | ≤ 200 ms |
| CLS (layout shift) | ≤ 0.1 |
| TTFB | ≤ 0.8 s |

On Hobby only the Real Experience Score is shown; the individual vitals need Speed Insights Plus. Watch the dynamic routes (`/jobs/[id]/…`) first; the rest is static.

## Reliability (Observability)

- **Observability → Vercel Functions:** error rate and invocations of the dynamic `/jobs/[id]` and `/applications/[id]` routes. Target: 0 5xx errors.
- **Logs:** runtime logs for a failing request (1 hour on Hobby). From the CLI: `vercel logs --environment production --status-code 500`.
- **Deployments:** each push to `main` creates a production deployment; a failed build keeps the previous one live, so check the deployment status before a demo.

## Weekly check (5 minutes)

1. Analytics: visitors, top pages, where the funnel drops.
2. Events (Pro): `apply_clicked` and `application_logged` by `band`; `credit_blocked` and `wallet_opened` for the fake door.
3. Speed Insights: Real Experience Score per route.
4. Observability: any 5xx errors.

Demo data is classroom traffic on illustrative jobs; it shows that the measurement works, not how real users behave.
