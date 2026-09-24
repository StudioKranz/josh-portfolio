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
- RelicWorld and BunkerBattle, active multiplayer and game systems prototyping
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
