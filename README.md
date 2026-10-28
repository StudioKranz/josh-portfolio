# joshrosenkranz.info

Personal portfolio and résumé for Josh Rosenkranz, Apple technologist,
experience systems designer, technical problem solver, educator, and builder.

The portfolio collects current product, AI, spatial computing, interaction,
game systems, and creative technology work alongside a long Apple Retail
career. It is designed to show how Josh approaches ambiguous problems, learns
new systems, tests ideas, and turns observations into working experiences.

## Current focus

The portfolio is an active product, not a static résumé site. Recent work
includes:

- Between, an AI mediated shared problem solving application
- BunkerBattle, a published Roblox multiplayer prototype shaped by live play, telemetry, and iteration
- RelicWorld, an earlier field-tested iOS spatial game prototype
- Socarengue Studio, a multimedia creator and storytelling platform
- Attune, an exploration of tone, emotional context, and consent
- RoomBridge, a spatial computing prototype for Apple Vision Pro
- MindMeld and related continuity experiments across AI tools
- The portfolio itself, built as an adaptive system with audience aware views

## Structure

- `/` is the live portfolio experience
- `/work/*` contains project case studies and interactive demonstrations
- `/resume` contains the résumé experience
- `/how-i-work` documents process and systems thinking
- `/legacy-home` preserves the earlier portfolio as a rollback and comparison point

## Design research and proposed improvements

The October 28, 2026 visitor feedback is recorded separately from proposed changes:

1. [Observed visitor feedback and research notes](docs/research/2026-10-28-portfolio-visitor-feedback.md)
2. [Adaptive portfolio experience, language slider, and discovery proposal](docs/2026-10-28-adaptive-portfolio-visitor-experience.md)
3. [Resume entry perspectives and invitation-only access concept](docs/design/2026-10-28-resume-entry-and-private-access.md)
4. [Identity navigation and inline expanding project case studies](docs/design/2026-10-28-navigation-and-inline-projects.md)
5. [Creator-selected visual modes and AI music showcase](docs/design/2026-10-28-creator-visual-modes-and-ai-music.md)

These are proposals and research notes, not features confirmed to be live.

## Technical approach

The site is built with Next.js, React, TypeScript, and Tailwind, using a
GitHub based workflow and AI coding agents as implementation partners.

Project direction, requirements, product behavior, testing, iteration, and
content strategy are intentionally documented separately from implementation
assistance so the portfolio reflects Josh's actual role accurately.

## Résumé source

`resume/Josh_Rosenkranz_Resume.html` remains the source for the rendered
résumé PDF. Re-render with:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume/Josh_Rosenkranz_Resume.pdf" \
  "file://$(pwd)/resume/Josh_Rosenkranz_Resume.html"
```

## Career work

Private application research, qualification matrices, evidence records, and
interview preparation live separately in `StudioKranz/career-work`. Apple
confidential material and private career notes are not stored in this public
repository.
