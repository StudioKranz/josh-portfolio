# Adaptive portfolio: visitor experience, language, and discovery

**Status:** Design research and product proposal. Not an implementation specification or a statement that these features are already live.

**Recorded:** October 28, 2026

**Origin:** Feedback from Laci while reviewing the portfolio, followed by Josh's design exploration.

**Product principle:** The visitor is the expert on their own experience. The portfolio should adapt to them, not demand that they learn its vocabulary.

## 1. Why this exists

Laci reported that Josh's name should appear at the top, the site felt visually overwhelming, and the Vision Pro and Roblox work needed more recognizable art or marks. She did not notice the Liquid Glass navigation controls because the larger type drew her attention elsewhere. She was unfamiliar with the term "heuristic" and struggled to understand several parts of the site's language and meaning.

These observations are qualitative feedback from one visitor, not established usability statistics. Nevertheless, they expose a crucial mismatch. A core strength of Josh's nearly two decades as an Apple Genius and educator is translating complex technology into everyday language. The portfolio should demonstrate that skill through its own experience.

Preserve the feedback as historical evidence rather than retroactively treating every idea below as an approved design decision.

## 2. Existing site architecture verified on October 28

The current production root is `app/page.tsx`, rendering `app/sandbox-v2/SandboxExperience.tsx`. The older homepage remains at `/legacy-home`; `/sandbox-v2` is a retained mirror.

The existing project data and audience mapping live in `app/sandbox-v2/data.ts`. The site has two distinct renderers, `classic` and `enhanced`, plus independently chosen perspectives. Identity options include recruiter, hiring manager, design leader, product leader, engineering manager, career experience host, music collaborator, and curious human. The identity selection maps to a perspective such as leader, inventor, builder, creative, musician, or curious. The persistent glass header currently includes a Portfolio control, Site: New / Site: Classic, and Who are you?. Existing preferences include locally persisted selected identity. A Classic to New invitation already has deliberate timing and dismissal rules.

**Do not conflate** renderer selection, visitor interest, and preferred explanation depth. They must remain separate concepts. Preserve existing site switching, identity mappings, theme choices, current production behavior, reduced motion preferences, and the old site's rollback path until explicitly revised.

There is a live case study identified in code as `systemic-portfolio` and currently titled "Systemic Portfolio Engine." Josh has expressed dissatisfaction with that name. "Adaptive Portfolio" is a candidate public-facing name, **not** a finalized rename of the route or underlying project identifier.

## 3. Product vision

The portfolio is both a collection of work and an example of the work itself. It should respond to what a visitor chooses to see, how they want ideas explained, and what they tell it about their experience.

Three independent axes:

1. **Interest / goal:** What brought the visitor here and which work is relevant?
2. **Language / depth:** How simply or technically would the visitor like the same truth explained?
3. **Feedback / correction:** What is working or confusing, and what would help immediately?

A visitor may be an experienced engineer who prefers everyday language, or a beginner who wants exhaustive detail. Never equate a language preference with ability, intelligence, profession, or education.

**North star:** Explain the experience first, the technology second. Make the visitor's next step obvious, not mandatory.

## 4. Visual hierarchy and navigation hypotheses

### Identity at the top

Prominently anchor "Josh Rosenkranz" at the top of the initial viewport. The name should be the first clear cue about whose work is being viewed. Place the Liquid Glass controls nearby, plausibly beneath the name.

**Preferred concept to test:** On scroll, the controls travel until they reach their existing sticky proximity to the top, then remain accessible. Optionally show a compact name or initials after the full name scrolls away. This should be tested carefully on mobile for valuable vertical space, focus behavior, and readability.

**Alternative, not preferred yet:** Give the name its own glass treatment within the persistent control cluster. Risk: identity may look like an action, and more glass may flatten hierarchy.

A second idea is to frame the entire New Site experience as one subtle overarching "adaptive portfolio" canvas or card. This need not mean a literal giant card with excessive nested borders. An explanatory label and modest visual containment might communicate the idea without increasing visual load.

### Retain discoverability

The original "Who are you?" is friendly but may not communicate why it matters. A more inviting initial prompt is **"What brings you here?"**. Its surface could later offer **"Can I guess?"** when meaningful interaction evidence supports a suggestion. "Identity Predictor" is a useful internal concept, but likely too technical or presumptive as public button text. "Are you?" was explored as another possible label, not selected.

Do not force the visitor to identify themselves. Keep their explicit choice authoritative. Treat guesses as suggestions about interests, not claims about identity.

### Reduce visual overload

Cards need hierarchy and rhythm, not simply additional decoration. Vary emphasis and visual density. Support concise summaries, informative artwork, and optional detail. Test whether visitors can scan a card and understand what was built, why it matters, and how to see more without first reading a long passage.

Visual directions to explore:

1. **RoomBridge / Vision Pro:** Recognizable Vision Pro silhouette or meaningful spatial capture rather than abstract filler. Do not imply an official Apple mark where one does not exist.
2. **BunkerBattle / Roblox:** A recognizable Roblox platform cue plus distinctive game imagery. Platform identity and project identity are different things.
3. **RelicWorld:** Original game mark such as a grid, field, flag, or play area.
4. **MindHub:** Shared notebook / connected memory nodes.
5. **MindMeld:** Multiple streams of reasoning and continuity meeting across assistants.
6. **Attune:** Tuning controls representing user agency over tone and pacing.

Establish an original visual family without making unrelated projects indistinguishable. Review trademark and licensing constraints before incorporating official platform marks.

## 5. Site-wide plain language

The portfolio should sound like Josh helping a person understand something unfamiliar. Default copy should be conversational, grounded in outcomes, and accurate about project maturity. Technical vocabulary remains available for those who want it; it should not act as an entry barrier.

Examples for copy review:

| Current or likely jargon | Everyday starting point |
| --- | --- |
| Heuristic | A rule of thumb, or a practical shortcut |
| Heuristic evaluation | Checking what works and what confuses people |
| Adaptive portfolio | A portfolio that changes for you |
| Agent guided experience | An AI assistant that helps you explore |
| Field validation | Testing it in the real world |
| Spatial prototype | Trying a new way to interact in 3D |
| Audience lens | A view that highlights work relevant to you |
| Reasoning archive | A record of decisions and why they were made |
| Interaction paradigm | A different way of doing something |
| Telemetry | Information collected while testing, where the project actually collects it |

Audit navigation labels, project descriptions, badges, captions, case studies, and CTAs. Preserve specificity. Do not replace accurate, meaningful language with vague marketing claims. Distinguish working prototypes from speculative design explorations.

## 6. Language slider: Simple to Expert

**Proposed primary control:** `Simple ←────●────→ Expert`

This is a preference for *how something is explained*, not a claim about the person. Use plain language as the default.

Potential levels, still to be tested:

1. Everyday analogy.
2. Plain explanation.
3. Balanced overview, the initial default.
4. Detailed explanation.
5. Technical explanation with implementation detail and tradeoffs.

Do not assume five visible ticks are required. A fluid slider with a small number of curated content states may feel more natural than five hard categories. The internal model can be discrete even if the glass motion appears continuous. Prefer editorially reviewed variants over arbitrary AI rewrites at runtime, especially where accuracy matters.

Important distinctions:

1. **Language simplicity** means accessible vocabulary and straightforward sentences.
2. **Explanation depth** means how much detail is shown.
3. **Evidence density** means how many technical artifacts and implementation details appear.

One slider may initially coordinate these for convenience, but the data model should keep them separate so future designs can decouple them. A technically expert visitor might prefer short copy, while a curious newcomer might request extensive detail in everyday language.

Offer local **"What is this?"**, **"Dive deeper"**, and optionally **"Less detail"** actions on cards. These are immediate ways to adjust the current explanation. Ask before applying a local preference to the entire site; allow visitors to opt into a site-wide preference.

Accessibility: keyboard operation, explicit labels, current value spoken to assistive technology, visible focus, sufficient contrast, no motion-only cues, and sensible behavior under reduced motion.

### Sample: MindHub in progressive language

**Everyday:** "Imagine your AI assistants sharing one notebook. One writes down what it learns, and the next can pick up where it left off."

**Balanced:** "MindHub explores a shared notebook for AI assistants, helping them keep useful context together and continue work across tools. Related projects look at recording decisions, richer context, and new ways assistants can adjust how they interact."

**Technical:** "MindHub explores shared context and continuity for multiple agents. Related work such as MindMeld emphasizes a durable reasoning archive so decisions can be traced to their rationale. Other concepts explore richer context, emotional signals, and assistant personality configuration."

**Accuracy requirement:** These are proposed explanations of the *project family*, not proof that all functionality is currently deployed in MindHub. Keep implementation status and architectural boundaries explicit in final copy.

### Shared notebook explanation and project relationships

Josh describes MindHub to nontechnical visitors as "a notebook that is passed around by your team of assistants." Assistants can read and update the same notebook. The concept extends to retaining interaction history and the reasoning behind decisions. Adjacent projects ask what else can be recorded (context, including emotional state) and what agents can do with the shared material (interaction adjustments, personalities, and continuity).

This analogy is valuable because visitors understand *why* shared memory is useful before encountering terms such as governance, retrieval, or multiagent architecture.

Check the actual code and documentation of MindHub, MindMeld, Attune, and related projects before attributing features. In the current portfolio, MindHub is labeled an early continuity prototype and MindMeld an active reasoning archive prototype. Do not silently collapse them into one implemented system.

## 7. Visitor interest and the glass invitation

### Two complementary paths

**"What brings you here?"** provides an explicit entry point. A minimal, optional, one-question-at-a-time questionnaire can invite goals such as hiring, design, engineering, creative collaboration, or simply exploring. The categories should reuse existing portfolio perspective mappings where practical rather than introduce a rival classification system.

**"Can I guess?"** is a later, optional suggestion based on interactions with the current session. The glass control can gently bloom to present a guess, followed by an easy accept, correction, or dismissal. On acceptance it may switch or spotlight a perspective, with clear explanation of what changed.

Initial signals to experiment with:

1. Opening a project is a stronger signal than passing over it.
2. Deliberately expanding deeper material is a signal of interest in that *project* and possibly detail preference, but not professional identity.
3. Sustained focus or deliberate interaction may add small evidence; accidental hover or passive scroll should carry little weight.
4. Explicit answers and corrections dominate inferred signals.
5. Mobile touch and keyboard interactions need equivalent treatment; hover cannot be required.

A simple weighted scoring model is enough for a first test. Example starting weights might be open project = 3, expand details = 2, sustained intentional engagement = 1. These are hypotheses, not tuned behavioral measurements. Require multiple meaningful signals, a sufficient separation between candidate interests, and a quiet cooldown before suggesting anything. Avoid repeated prompts and animation that competes with content.

**Glass behavior conveys state:** quiet while evidence is insufficient, subtle invitation when a suggestion may be useful, and contraction after response or dismissal. No automatic rewrites or navigation purely because of an inference. Respect reduced motion and avoid surprise layout shifts.

## 8. Visitor expertise, feedback, and immediate corrections

Treat visitors as experts on *their own experience*. Make it easy to communicate confusion without implying a lack of knowledge.

Potential contextual questions:

1. "Would it help if I explained more of the site this way?"
2. "Did this give you a good picture of what I built?"
3. "Would you rather see it working, see how I made it, or ask a question?"

An answer should give an immediate benefit, not merely become data collection. The visitor may opt into broader language changes, request a demonstration, or correct an inaccurate guess. A separate optional feedback affordance may let them send a note for future improvement.

Separate three kinds of data:

1. **Temporary session context:** viewed projects, chosen interest perspective, language preference, recent corrections.
2. **Explicit submitted feedback:** only sent when the visitor knowingly submits it.
3. **Aggregate testing observations:** if ever collected, disclosed, minimized, and designed around privacy.

Default to local, ephemeral computation for inference. Avoid profiling identifiable people, covert tracking, sensitive attribute inference, and persistent personal browsing histories. Provide reset and dismissal controls. Do not imply a feedback submission succeeded without a server response.

## 9. Proposed interaction and state model

Reuse the existing `Renderer`, `Perspective`, and `Identity` structures in `app/sandbox-v2/data.ts`; extend rather than duplicate. A possible model distinguishes:

```ts
type ExplanationPreference = {
  simplicity: number; // plain language to technical vocabulary
  depth: number;      // summary to detailed exploration
  scope: "card" | "site";
  source: "explicit" | "suggested";
};

type VisitorContext = {
  selectedIdentityId: string | null;
  selectedPerspective: string | null;
  explanation: ExplanationPreference;
  engagementByProject: Record<string, number>;
  latestSuggestion: string | null;
  suggestionDismissed: boolean;
};
```

These are conceptual types, **not** verified existing APIs or approved property names. Confirm the real component contracts, persistence policy, design tokens, and test coverage before implementation. Do not use inferred engagement to overwrite explicit visitor choices.

The renderer decides how work is *presented*. Perspective affects relevance and ordering. Explanation preference affects copy and detail. Feedback corrects the experience or contributes to research only with visitor consent.

## 10. Questions still open

1. Should the slider live in the persistent header, the main adaptive portfolio introduction, or card level controls, or some combination?
2. Should "Simple" and "Expert" be the endpoints, or would "Everyday" and "Technical" avoid suggesting a hierarchy of people? Josh's current favored label is **Simple ↔ Expert**, and it should be tested rather than silently changed.
3. Should a single slider couple vocabulary and detail, or should a later design split them?
4. Exactly which card data supports different explanation variants, and which case study sections remain invariant?
5. How should New and Classic differ in language controls while retaining meaningful version identity?
6. What confidence threshold merits a "Can I guess?" prompt?
7. Should the name remain visible in the compact sticky header, and how much space can the control cluster consume on small screens?
8. Which project marks should be original versus approved platform branding?
9. How can feedback be made useful without making the portfolio feel like a questionnaire?
10. What is the right public name for the portfolio case study, currently called "Systemic Portfolio Engine"?

## 11. Implementation sequence, suggested not authorized

**Phase A: Baseline observation and language audit.** Preserve Laci's original feedback. Inventory live copy and jargon. Draft everyday explanations for project overviews and CTAs; validate factual accuracy and project status.

**Phase B: Header and visual hierarchy experiment.** Test prominent name, nearby initial glass controls, sticky transition, and a subtle adaptive portfolio frame. Check both touch and desktop navigation.

**Phase C: Visual rhythm and artwork.** Prototype a few distinct project marks and screenshots, verify visual scanning before applying site-wide.

**Phase D: Language adaptation prototype.** Implement curated copy variants for a few projects, Simple ↔ Expert, local "What is this?" / "Dive deeper" actions, reset, and explicit site-wide opt in. Test with visitors across varying technical backgrounds.

**Phase E: Visitor context and optional invitation.** Reuse existing audience mappings; prototype deterministic evidence scoring and "Can I guess?" invitation. Validate low-pressure behavior, consent, keyboard support, and dismissal.

**Phase F: Feedback loop and case study.** Ask small, contextual questions only when useful. Document tests, revisions, misconceptions, and learned tradeoffs as evidence of Josh's design process.

No phase implies automatic approval to modify the production root. Validate on an isolated branch and preview; obtain visual signoff before merging any UI changes.

## 12. Working acceptance criteria for future prototypes

1. A first-time visitor sees Josh's name immediately and can discover the controls without instruction.
2. A visitor unfamiliar with terms such as "heuristic" understands what projects are and why they matter.
3. The same project can be explained in accessible and technical language without changing the underlying factual claims.
4. The slider works on keyboard, touch, and assistive technology; reduced-motion users can access every function.
5. Choosing a perspective never forces a language level, and choosing a language level never presumes a profession.
6. The site does not infer sensitive identity traits; all guesses are framed as optional interest suggestions.
7. An incorrect suggestion can be dismissed or corrected, and explicit choices are always respected.
8. Feedback remains optional and clearly differentiated from local adaptation.
9. Existing Classic/New switching, theme behavior, and rollback routes remain functional.
10. Source data, reviewer preferences, and the visual renderer remain distinct so new features do not multiply conflicting states.

## 13. Record of decision status

**Observed:** Laci overlooked the glass controls, suggested putting Josh's name at the top, reported visual overload, wanted recognizable visual cues for Vision Pro and Roblox, and found several technical descriptions hard to follow.

**Expressed preferences:** Josh likes "What brings you here?", "Can I guess?", a questionnaire, visitor-led feedback, a notebook analogy for MindHub, progressive explanation, an overarching adaptive portfolio identity, and a Simple ↔ Expert language slider.

**Promising hypotheses:** Sticky controls beneath the initial name, optional guess invitation, language preference hints inferred from explicit "What is this?" or "Dive deeper" actions, and a family of project visual identities.

**Not yet approved or implemented:** The proposed slider, interest inference, questionnaire, feedback submission, adaptive framing, new project marks, copy variants, and modified glass animations. These need testing and specific implementation decisions.

**Documentation-only boundary:** This record intentionally changes no production behavior and preserves existing code and decisions as historical context.
