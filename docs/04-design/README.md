# 04 · Design

Wireframe plan: [Confluence](https://glogoveanu.atlassian.net/wiki/spaces/PRD/pages/5177354) · Figma: [wireframe file](https://www.figma.com/design/jiH6XiAkRDHMY5UeNhoZyp/CareerPilot) · [clickable prototype](https://www.figma.com/proto/jiH6XiAkRDHMY5UeNhoZyp/CareerPilot?node-id=16-252&page-id=5%3A3&starting-point-node-id=16-252)

The Figma file holds 44 primary views and 58 loading, empty, error and success states in grayscale, with editable components and Auto Layout. The Flows page maps each persona's tasks (Markus, Lena, Andrei, Sofia, admin) to screen IDs (C01 sign-in … C13 "Did you apply?"), and every frame carries an annotation with the user stories it covers. One mobile frame shows the job detail.

![Screen flow](screen-flow.svg)

## Screens

1. SSO sign-in (Figma Community SSO card)
2. Onboarding: upload CV, review profile, done (no completeness gate: scores always show, with a confidence label and prompts for missing fields)
3. Job alerts and filters
4. Job list: match badge, "Why it fits", Save
5. Job focus: Prepare application (−1, primary), Apply on job site (free), Save (free); plus one 390 × 844 mobile frame
6. Application preparation: detailed match, strategy, CV and cover letter (−1 each)
7. Application history: saved job description, status, Prepare for interview (−1)

Credits pill in the header ("7 of 10 credits left today"); clicking it opens the pay-as-you-apply dialog marked "Coming soon".

## Brand (logo A, reticle wordmark)

![CareerPilot](brand/logo-navy.png)

| Role | Colour |
| --- | --- |
| Primary (60%) | Navy `#0F2A4A` |
| Secondary (30%) | Mist `#E8EEF6` |
| Accent (10%) | Flare `#F2542D`, graphics only, never small text |
| Muted text / lines | `#5B6B80` / `#D5DEEA` |

Typeface: Inter (ExtraBold for the wordmark). The orange centre dot is the only accent and stands for "your target role"; it doubles as the credit icon. Options and rationale: `brand/careerpilot-logo-options.html`.
