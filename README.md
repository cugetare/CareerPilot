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
| Prototype | [Figma: CareerPilot test](https://www.figma.com/design/4SXo5dQmlYyQCiOW4ZJwCt/CareerPilot-test) |

Confluence wins when this repo and Confluence disagree; the docs here are snapshots and get backdocumented.

## Repository layout

```
docs/
  01-ideation/      problem, personas, competitors, positioning
  02-prd/           PRD summary and key decisions
  03-backlog/       epics, user stories, sprint plan (snapshot of Jira)
  04-design/        screen flow, wireframe plan, brand (logo A)
  05-presentation/  7-minute deck and talk outline
app/                demo app (planned), deployed to Vercel
```

## Status

- [x] Ideation: personas, journeys, competitors, positioning
- [x] PRD in Confluence, backlog in Jira (22 stories, 6 build sprints)
- [x] Wireframe plan and logo A
- [ ] Figma prototype
- [ ] Presentation (7 min talk + 3 min Q&A)
- [ ] Demo app on Vercel

## Demo deployment

The demo will live in `app/`. On Vercel, import this repository and set **Root Directory** to `app`; everything under `docs/` stays out of the build.
