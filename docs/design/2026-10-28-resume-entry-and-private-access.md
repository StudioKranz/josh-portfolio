# Resume-aware entry and invitation-only portfolio access

**Recorded:** October 28, 2026
**Status:** Product exploration. No implementation or disclosure of private data authorized.

## Josh's proposed experience

The **What brings you here?** control presents these five intents, using this exact tentative wording:

1. **Curious about Josh**
2. **Recruiting**
3. **Collaboration**
4. **Hiring**
5. **Investing**

A resume could carry a portfolio code or QR link that starts the site in a perspective chosen for that resume's audience. It could also grant access to additional private or proprietary project details, subject to permissions. Someone without a grant could see a code prompt while exploring a card. Entering a valid code anywhere could establish access across the site within that code's privileges. A QR could make entry convenient.

The intent selector is not necessarily an identity selector. Recruiting, hiring, collaborating, and investing describe why someone is here, not who they are. They can overlap, and the visitor can switch paths freely.

## 1. Two separate functions

**Public adaptation:** A publicly shareable link indicates initial viewing context, for example `?intent=hiring&focus=spatial`. These are illustrative parameter names, not live routes. It can prioritize relevant work, customize introductory language, or suggest next steps. The user can change it without permission checks.

**Private access:** An individually granted invitation is checked by the server and specifies exactly which nonpublic materials may be delivered. Picking Hiring or Investing cannot unlock anything on its own.

Keep both independent of the existing **Classic / New** renderer, chosen interest/perspective, and the proposed **Simple ↔ Expert** language preference. An initial resume adaptation can suggest a preferred perspective without locking it in.

## 2. Suggested first experiences for the five intents

| Intent | Emphasis |
| --- | --- |
| Curious about Josh | The person, background, varied interests, creative work, and broad catalog |
| Recruiting | Resume, qualifications, job fit, and rapid scanning |
| Collaboration | Shared interests, creative and technical work, ways to work together |
| Hiring | Evidence of execution, design decisions, working demos, problem solving |
| Investing | Ideas, prototypes, stage of validation, potential, constraints, open questions |

Existing data in `app/sandbox-v2/data.ts` has identities and perspectives already. Reuse or map to that schema carefully; for example Recruiter and Hiring Manager both currently map to `leader`. Collaboration and Investing may need their own higher-level *intent* definitions, not duplicate identities.

Do not imply every project is a startup, solicitation, or validated commercial opportunity. Do not invent business performance or financial forecasts.

## 3. QR and resume choices

### General resume
Use an ordinary URL/QR carrying **public, nonsecret** adaptation parameters. This can remain in resumes uploaded to job portals or forwarded widely. Example only: `https://your-domain.example/?intent=hiring`.

### Individually shared invitation
A separate QR or long, random invitation link can contain a temporary bearer secret. It is **not safe** to treat a code printed on a broadly distributed resume as confidential. People can share PDFs, screenshots, and QR images.

On opening the invitation, redeem the token over HTTPS on the server, create a scoped, secure session, and redirect to a clean URL with no token. Prevent token leakage through analytics, logs, referrers, browser history, or caches where possible. Do not place third-party analytics on the redemption flow. Scanning a QR does **not** prove someone's identity.

For particularly sensitive documents, require a verified identity or separate approval rather than relying only on possession of a shared code.

## 4. Cards and sitewide unlock

A public case study remains useful without a code. If approved private material exists, an optional “Enter code” / “Request access” affordance can appear at card level. Offer the same entry control somewhere globally. After successful server validation, the visitor returns to the same project and retains access across the site **only to the resources covered by their grant**.

Possible permissions include a single project, a curated set of projects, and (exceptionally) all designated private materials. “Sitewide” means the grant works from any eligible page, not that every grant can read every restricted project. Explain when access is enabled and allow a visitor to leave the private session.

Protected data, documents, screenshots, image URLs, and APIs must be checked server-side. Hiding buttons, blurring text, checking codes in client JavaScript, or bundling private data into public HTML is not access control. Never put protected material in a public GitHub repo, client bundle, public assets, or publicly cached pages.

Use server-side stored invitation records with high-entropy tokens, expiry and revocation, hashed verification, careful session management, and rate limits for manually entered codes. A short, human-friendly code needs particularly strong guessing defenses. Decide whether an invite is reusable across devices or limited-use before distributing a static printed QR.

Proprietary details owned by Apple or other employers or clients should not be published without appropriate permission. An access code does not substitute for authorization to disclose.

## 5. Unresolved design decisions

- Which of the five labels are clear to actual visitors? Especially the difference between Recruiting and Hiring.
- Should public resume links encode an intent only, or a named focus relevant to a specific job application?
- Should the résumé provide a general QR while private invitations are sent separately?
- Which private materials exist, who owns them, and who is permitted to see them?
- Should a card reveal the existence of private content, or should some content be entirely undiscoverable before authorization?
- Is a one-time QR appropriate for a reusable PDF? How will cross-device use and forwarding work?
- Who approves requested access and how is an invite delivered?
- What happens when a code expires, is revoked, or is entered incorrectly?
- How should session scope be shown without cluttering the Liquid Glass header?

## 6. Safer staged work

1. Prototype the five-intent chooser and public resume link adaptation, with no confidential materials or authentication.
2. Test visitor understanding and ensure intent, language preference, and renderer remain separate.
3. Inventory proposed private artifacts, their owners, permission to share, and required scopes.
4. Threat-model invitation redemption, session storage, cookies, data and asset protection, and revocation.
5. Implement authenticated server-gated material only after explicit approval and verify direct URLs, downloads, caches, APIs, and forwarded links.
6. Test the QR journey and manual-code journey with real devices and visitors.

This is a documentation-only proposal; nothing here is implemented on the live site.
