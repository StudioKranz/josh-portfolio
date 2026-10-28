# Visitor feedback: portfolio comprehension and discovery

Date recorded: 2026-10-28
Source: informal, in-person visitor feedback and a follow-up design conversation.
Status: observation and brainstorming, not validated user research or approved implementation.

## Why record this

Keep the original usability signals separate from proposed remedies, so future iterations can revisit the observations without treating our first solution as inevitable. This was one visitor's experience and should not be generalized without additional tests.

## What the visitor experienced

1. **Identity hierarchy:** Josh's name should be more prominent at the top. Large typography drew the visitor's eye.
2. **Controls were missed:** The Liquid Glass navigation buttons were passed over despite their detailed visual treatment. Discoverability is distinct from appearance.
3. **Visual load:** The collection of cards felt overwhelming and insufficiently differentiated.
4. **Missing project recognition:** The visitor requested stronger visual identity and imagery, specifically for the Vision Pro work and a Roblox-related project.
5. **Unfamiliar language:** The term “heuristic” was not understood, and Josh found it hard to explain in the moment. More broadly, the visitor struggled to understand what many sections were communicating.

These are reported observations, not quantified findings. We have not established precisely which layout, wording, or artwork caused each problem.

## What Josh recognized

- A core strength of Josh's Apple Genius work is simplifying complex technology for people without talking down to them. The site should demonstrate that strength in its writing.
- The portfolio currently risks speaking more like an engineer explaining a system to engineers than Josh explaining an idea to a customer.
- His spontaneous explanation of **MindHub** was a notebook passed among a team of AI assistants. Each assistant can access and update the notebook so the next assistant does not lose the thread.
- The notebook metaphor includes a record of interactions and reasons behind decisions. Related projects extend what is remembered (context, for example) or what can be done with it (emotional context for interaction adjustments, agent personalities, for example). **The exact responsibility of MindHub versus MindMeld and other projects must be checked against their source material before published copy changes.**
- Visitors should be treated as experts in their *own experience* and offered a way to correct or improve the presentation.

## Ideas generated in the conversation, not yet decisions

### Entry and navigation
- Put the name at the top as the visual anchor.
- Consider placing the glass controls immediately below the name, then allowing the controls to float/stick near the top as the visitor scrolls. Another option is a smaller name integrated into the sticky cluster after scrolling.
- Alternative considered: make the name itself a floating glass surface. Open question: this may make identity look like another action.
- Potentially frame the whole main portfolio as a subtly bounded **Adaptive Portfolio** card or canvas. Avoid introducing a visually overwhelming card within another card.

### Visual variety
- Break up repeated project cards with richer screenshots, varied scale and whitespace, recognizable platform cues, and individual project marks.
- Explore a Vision Pro/device image or appropriate visual for the spatial project and a Roblox platform cue for BunkerBattle; RelicWorld should maintain its own distinct identity.
- Create coherent but nonidentical visual identities for MindHub, MindMeld, Attune, and other original projects.
- A logo helps recognition; an actual prototype screenshot helps understanding. Both may be useful; visual decoration must not increase cognitive load.
- Review ownership and permitted use before shipping third-party logos.

### Language and depth
- Introduce a global **Language** slider labeled **Simple** on the left and **Expert** on the right, starting near the middle.
- “What is this?” gives an immediate plainer explanation. “Dive deeper” reveals more technical or detailed explanation.
- Language preference and visitor purpose are different axes. A beginner may want detail and an expert may prefer a quick plain-language explanation.
- Avoid inventing new product claims or losing meaning when moving across language levels.

### Discovery and consent
- “What brings you here?” is preferred as an open, welcoming entry point to choose interests or a visitor perspective.
- An optional, small conversational questionnaire could refine this choice.
- “Can I guess?” is an appealing playful prompt once the visitor has given sufficient interaction signals. The site's guess should concern **what they want to see**, not their personal identity.
- Signals considered: deliberate project opens, deeper exploration, and weaker evidence from hover or dwell. Mobile has no hover; scrolling past is not intentional engagement.
- A little Liquid Glass bloom can indicate a helpful suggestion. Ignoring the suggestion should make it disappear without pressure or repetition.
- Visitor feedback could immediately simplify a section or suggest a more relevant view. Any message actually sent to Josh should be opt-in and clearly disclosed.

## Design risks to keep visible

- More logos, animations, controls, and nested cards could amplify the initial overwhelm.
- A “prediction” might seem invasive or condescending if it asserts who someone is.
- Inferring ability from a language preference would be inappropriate.
- Auto-changing the page without consent could be disorienting.
- Tests must include touch, keyboard, assistive technology, and reduced-motion use.
- Preserve the existing New/Classic version interaction and audience lenses as independent concepts while evaluating improvements.

## What to test next

Ask fresh visitors to do these without instruction:
1. Identify who created the portfolio.
2. Find and describe the site-version and visitor-perspective controls.
3. Explain what MindHub, Attune, and the Vision Pro work are in their own words.
4. Find one project relevant to their interests.
5. Request an easier explanation and then more technical depth.
6. Decline or correct a suggested interest without friction.
7. Describe whether the portfolio feels calm and understandable on mobile.

Capture observed behaviors and exact confusing terms before proposing fixes. Do not count one successful test as conclusive validation.

## Related design proposal

See [Adaptive portfolio: language and visitor discovery](../design/adaptive-portfolio-language-and-discovery.md).
