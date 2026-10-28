# Identity navigation and continuous inline project exploration

**Date:** 2026-10-28

**Status:** Exploration and recommendation, not implemented or approved for production.

**Source:** Josh's proposal to use his name in the home control and to replace full-page project navigation with expanding project cards. Incorporates the immediately preceding discussion of staged glass entrances and a more literal Apple Retail story.

## 1. Requests in context

Josh proposed:

- Replace the existing **Portfolio** return control with **Josh Rosenkranz**.
- Keep its current scroll-to-top action when already on the main portfolio.
- From project pages, use the same label as navigation back to the portfolio.
- Consider making the entire website feel like one continuous experience, with project cards expanding in place and presenting more detail or further adjustments without a page change.

This follows observed feedback that Laci missed the Liquid Glass controls, struggled with technical wording, and wanted Josh's name to be the first clear visual anchor.

## 2. Recommendation: make the experience feel flat while keeping shareable project URLs

**Preferred hypothesis:** Inline progressive project expansion should become the default way to explore from the New Site's card catalog, but existing individual project routes should remain canonical and directly visitable.

Why retain separate URLs?

- People who receive a resume link or need to share a case study should be able to go straight to it.
- Recruiters and reviewers may save, bookmark, return to, and discuss one project independently.
- Metadata, social preview, indexing of public work, and deep links remain possible.
- Accessibility and back/forward navigation can follow familiar web behavior.
- The site can keep full cases with complex diagrams or special demonstrations without forcing all implementation details into one enormous homepage.
- Protected projects must still be access-checked server-side. Flattening the UI must not mean including private content in public HTML or the client bundle.

The architectural model can be **one project content source, more than one presentation**. Existing `app/sandbox-v2/data.ts` is already a shared catalog; individual `app/work/*` pages currently hold some separate, project-specific case-study prose. Before implementing, audit and reconcile facts, presentation variants, ownership, metadata, and evidence to prevent two contradictory copies.

### How the behavior would work

1. **Overview:** A short, scannable card explains what it is, why it matters, maturity, and how to explore. Do not start with the current fully dense paragraph-and-evidence card. The Laci feedback about too many visually similar cards remains relevant.
2. **Expand:** A clear user-controlled button reveals more information inside the current page. Show the challenge, Josh's role, solution, visual evidence, learnings, and a plain-language/technical explanation option. An expanding card can span the available column width and reflow neighboring cards predictably.
3. **Dive deeper:** Continue within the expanded card, optionally exposing diagrams, implementation, decision history, or richer evidence without navigating.
4. **Share/Open directly:** Offer a clear link to the project's persistent `/work/<slug>` URL. Direct visits can load the same project presentation as a dedicated full-page view, or a focused view consistent with the card expansion.
5. **Return:** On collapse, keep the visitor's position and language preferences. Closing an expanded card should not unexpectedly jump them to the top.

A browser-route implementation could use a shareable route as an expanded, routed overlay or a direct canonical page as appropriate, but do not require a framework-specific solution before confirming app version, navigation behavior, accessibility, or implementation complexity. Avoid unnecessary route magic.

### Expansion options to test

**A. One-at-a-time inline accordion** (preferred first prototype): one project expands within the catalog; others remain accessible and collapse when a new project is selected. Pros: focused, continuous. Cons: reflow and scrolling need careful handling.

**B. Full-bleed focus surface within the same page:** the selected card becomes a large project workspace and other cards remain nearby or behind a clear return action. Pros: richer media and easier control placement. Cons: could look like a separate page disguised as a card.

**C. Dedicated project pages only:** current pattern. Pros: simple and linkable. Cons: context switching, redundant descriptions, and lost state.

Test A first while retaining URL deep links, then use the right-hand controls and on-card language slider to assess actual discoverability.

### State and usability expectations

- Project selection and expanded/collapsed state are distinct from selected audience purpose, current site renderer, author-selected visual design mode, language slider settings, and access permissions.
- A deliberate language setting on an individual card remains pinned when the card collapses and reopens. Unmodified cards inherit the site language preference according to the design research note.
- A QR resume entry should land on a relevant public project or emphasize that project in the feed, without discarding the ability to browse.
- A correct private access grant may reveal protected material within an expanded project only after per-resource server authorization; public card metadata must not leak it.
- Preserve direct project links and browser back/forward history. Consider whether opening a card should update the URL, and confirm that refreshing a link reproduces the same content rather than an orphaned state.
- Mobile layout should not produce an enormous expanded card that hides every navigation choice.
- Use semantic buttons with `aria-expanded` and `aria-controls`, visible focus states, accessible section headings, keyboard operation, reduced motion, and predictable focus restoration.
- If motion is used, animate opacity/visual framing modestly, not multi-second content displacement. Do not trap focus in an ordinary inline section.
- Allow the visitor to collapse without losing their reading position. Preserve selected card after returning from external links where practical.

## 3. Rename the persistent Portfolio control to Josh Rosenkranz

**Current source verified:** `app/sandbox-v2/SandboxExperience.tsx` renders a fixed `kc-portfolio-nav` containing a button labeled `Portfolio` that invokes `scrollToTop`; `components/BackLink.tsx` renders a `Portfolio` link to `/` from standalone case studies, via `components/CaseStudy.tsx`.

**Desired semantic behavior:**

- **Main portfolio, already at top:** Josh's name is a consistent home identity label; pressing it is harmless and may focus/scroll to the introduction.
- **Main portfolio, scrolled down or expanded card:** the named control scrolls to top, collapses other transient glass menus if needed, and retains visitor preferences.
- **Standalone project page:** the same visible label links to `/` and returns to the portfolio. Preserve an optional contextual `Back to projects` affordance if the visitor needs to return to the exact card context.
- **Site version Classic/New:** the control's meaning stays consistent when switching renderers.
- **Accessible name:** `Josh Rosenkranz, back to top` on the main page or `Josh Rosenkranz, return to portfolio` on standalone pages; visible text stays `Josh Rosenkranz`.

A full name at the top of the hero **and** in the fixed header could create redundant visual competition. Test whether the compact glass identity control should appear or gain emphasis only after the large hero name scrolls away. Keep the large hero name readable on first arrival. On narrow screens, protect the other controls from overlap; do not silently replace the name with cryptic initials unless tested.

### Navigation choreography proposed in the previous discussion

Josh also suggested letting the name be read before buttons enter independently, with a small glass "drip" or "pop." A reasonable first experiment is: hero name visible immediately; thesis slightly later; glass controls briefly stagger in over less than about a second, then settle. Use scroll for the later transition to fixed navigation, not as the sole trigger for discovering buttons.

This sequence must not block controls during loading, hide keyboard access, replay on every browser return, or interfere with the existing Classic-to-New reveal. For reduced motion, show all controls immediately. The animation is a hypothesis to test against Laci's discovery issue, not a solution assumed to work.

## 4. Reframe the Apple career case study in plain language

**Current source verified:** `app/sandbox-v2/data.ts` has an item `apple-experience-systems`, displayed as "Apple Experience Systems," with operational-systems language and a placeholder `href: "#"`. It describes Josh as an Apple Retail Genius and Product Zone Lead since 2007, plus participation in Apple Vision Pro launch readiness.

Josh suggested making this card more literal about store work and more persuasive about actual skills, including troubleshooting expertise, sales/customer discovery, teaching and explaining, and how that experience informs his independent prototypes.

**Potential short title:** `Nearly 20 Years at Apple`, or `Apple Genius: Troubleshooting, Teaching & Customer Experience`. These are candidates, not an approved renaming.

**Draft short card:**

> I've worked with people in Apple Retail since 2007. At the Genius Bar, I troubleshoot difficult technology problems. On the sales floor, I help customers figure out what they really need, and I help teammates learn and explain complex ideas. Those experiences are the foundation for the independent projects in this portfolio.

**Draft optional expanded explanation:**

> Working directly with people has taught me how to recognize what isn't working, explain complicated concepts simply, and solve problems under real constraints. At the Genius Bar, I troubleshoot hardware, software, and the human side of technical problems. In customer-facing sales and training, I help people understand their options and decide what works for them. Those experiences have shaped how I approach my independent work in AI, games, spatial interfaces, music, and human-centered design.

Keep the employment/career record separate from assertions of product-design responsibility at Apple. Do not invent metrics, proprietary work, formal training positions, or internal Apple processes. Verify resume and chronology before publishing. Consider an evidence section organizing troubleshooting, translating complexity, consultative sales, support/training, and independent product observation.

## 5. Open questions

1. Should the whole card expand on click, or only a clear `Explore` button so users can select text normally?
2. When one card expands, should others collapse automatically?
3. Should the expanded card move to a full-width row, remain within its grid column, or open a dedicated focused region?
4. Should opening an expansion update the URL immediately, or only a `Share / Open project` action?
5. Do some complex interactive project demos still need standalone pages, even if summaries are inline?
6. How do we preserve scroll position when the name control returns to top, and let readers return to an opened project?
7. How do we reconcile existing distinct case-study page content with the shared project database?
8. Does showing "Josh Rosenkranz" in the sticky header create crowding with Site and What brings you here? on mobile?
9. Will staggered entrance actually increase navigation awareness for first-time visitors?
10. What facts and evidence should the Apple career card surface first for recruiting, hiring, collaboration, and casual visitors?

## 6. Next experiments, not implementation authorization

1. Create a responsive, isolated preview with the new name-home label and short first-visit glass entrance.
2. Compare current project navigation with one-at-a-time inline expansion for three representative projects, including MindHub and RoomBridge.
3. Test whether a cold visitor can discover controls, understand an Apple career card, find one project, and return without instruction.
4. Preserve the current live routes and review navigation, direct loading, keyboard, browser history, responsive behavior, and accessibility.
5. Decide on canonical content source and routing only after observing what worked.

**Boundary:** This record is documentation only. It does not change production code, publish copy, remove any route, or change permissions.
