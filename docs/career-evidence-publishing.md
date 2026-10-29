# How career evidence informs this public portfolio

**Recorded:** October 29, 2026  
**Status:** Documentation of an editorial workflow, not an automatic cross-repository integration.

## Repository roles

- [`StudioKranz/josh-portfolio`](https://github.com/StudioKranz/josh-portfolio) is the public website, project catalog, case studies, and public résumé presentation.
- [`StudioKranz/career-work`](https://github.com/StudioKranz/career-work) is a **private** career-development workspace containing detailed evidence, historical résumé material, application-specific drafts and correction history. Only authorized collaborators can access it.

The career repo is the **source of truth for career evidence and chronology**. The individual project repos are the sources of truth for their implementations. The public portfolio is an **editorial presentation layer** built from reviewed, publishable information, not a mirror of the private career workspace.

## Editorial handoff

1. Collect evidence, dates, scope, role, source notes and corrections in the private career workspace.
2. Verify claims and distinguish completed work, active work, proposed ideas, self-reported measurements and future plans.
3. Select information relevant to a particular audience or project; omit details that are not helpful.
4. Review publication rights, third-party confidentiality, privacy and consent. Only use approved public-safe text and media.
5. Add the curated summary to this portfolio's project data or case studies; use a PR to review changes.
6. Revisit published summaries when newer evidence supersedes them. Do not let stale public résumé copies silently override the latest private facts.

**No automatic sync currently exists.** If one is built later, use an explicit allowlisted export and a review gate; never pull unrestricted private notes into a public build, client bundle or static asset folder.

## Personal interests and transferable experience

The career repository may document activities or interests as **options** for tailored résumés and interviews, including non-work experience such as rowing. Having an evidence record does not automatically make it appropriate for every job application or public portfolio card. That selection remains a deliberate editorial decision.

Likewise, the portfolio can represent specialized experience in coffee operations, music production, recording engineering, live sound, teaching, community work, software, design and Apple Retail without requiring every item to appear on a one-page or two-page résumé.

## Information architecture

- **Content**: evidence-backed claims, with clear status and ownership.
- **Public presentation**: featured work, experience cards, optional details and audience-focused ordering.
- **Visitor settings**: purpose and the proposed Simple ↔ Expert language presentation, independent of evidence truth.
- **Creator controls**: any future visual design modes must also consume the same approved source.
- **Private invitation access**: a proposed future feature; an access code is not permission to disclose employer-owned or confidential material.

This file is safe to read publicly. It deliberately contains **no confidential notes, personal source documents, or private internal file links**.

## Current code references

- `app/sandbox-v2/data.ts` — public project/catalog descriptions and audience mapping
- `app/sandbox-v2/SandboxExperience.tsx` — public interactive presentation
- `app/work/*` — public case-study pages
- `resume/Josh_Rosenkranz_Resume.html` — current public résumé HTML source

The résumé embedded here is a particular published version; the private career repo may contain newer or more targeted application-specific documents. Audit freshness before regeneration.
