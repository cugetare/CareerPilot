# CareerPilot

> Competitors tell you how well your CV matches the ad's wording. CareerPilot tells you whether you fit the job, and why.

CareerPilot is a job-search copilot for Germany. It aggregates public job lists, scores each vacancy against a complete candidate profile, explains the fit for free, and spends daily credits only when it generates something: a prepared application, a tailored CV or cover letter, or interview prep.

Ironhack AI Product Management bootcamp, Mini Project 1.

## Source of truth

| What | Where |
| --- | --- |
| PRD (source of truth) | [Confluence: CareerPilot – MVP PRD](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/4292609) |
| Wireframe plan | [Confluence: CareerPilot – Wireframe Plan](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/5177354) |
| Logo research | [Confluence: Logo Research](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/4554754) |
| Backlog and sprints | [Jira: CPA board](https://glogoveanu.atlassian.net/jira/software/projects/CPA/boards/39) |
| Matching score | [Confluence: Calculating the Matching score](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/7700482) |
| Profile completeness | [Confluence: Calculating profile completeness](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/7962625) |
| Wireframes | [Figma: wireframe file](https://www.figma.com/design/jiH6XiAkRDHMY5UeNhoZyp/CareerPilot) · [clickable prototype](https://www.figma.com/proto/jiH6XiAkRDHMY5UeNhoZyp/CareerPilot?node-id=16-252&page-id=5%3A3&starting-point-node-id=16-252) |
| Live demo | [careerpilot.glogoveanu.eu](https://careerpilot.glogoveanu.eu) |

Confluence wins when this repo and Confluence disagree; the docs here are snapshots and get backdocumented.

## Repository layout

```
docs/
  01-ideation/      problem, personas, competitors, positioning
  02-prd/           PRD summary and key decisions
  03-backlog/       epics, user stories, sprint plan (snapshot of Jira)
  04-design/        screen flow, wireframe plan, brand (logo A)
  05-presentation/  final deck, earlier versions and talk notes
app/                Next.js demo app, deployed to Vercel
```

## Status

- [x] Ideation: personas, journeys, competitors, positioning
- [x] PRD in Confluence (31 functional and 14 non-functional requirements, 29 user stories), with child pages for the matching score and profile completeness
- [x] Backlog in Jira: 9 epics, 29 stories with acceptance criteria, 6 build sprints planned (79 points)
- [x] Wireframe plan and logo A
- [x] Figma wireframe prototype: 44 primary views, 58 states, persona task flows, one mobile frame
- [x] Demo app on Vercel: [careerpilot.glogoveanu.eu](https://careerpilot.glogoveanu.eu)
- [x] Presentation: `docs/05-presentation/CareerPilot Final Presentation.pptx` (5–7 minutes)
- [ ] Planned, not built: real CV parsing, job ingestion from the Bundesagentur lists, AI generation, beta and launch (June 2027)

## Demo deployment

The demo lives in `app/` (Next.js + Tailwind, built from the Figma wireframe prototype) and runs at [careerpilot.glogoveanu.eu](https://careerpilot.glogoveanu.eu). All jobs, scores and documents are illustrative; CV parsing and AI generation are simulated. On Vercel, set **Root Directory** to `app` and **Framework Preset** to Next.js; everything under `docs/` stays out of the build.
