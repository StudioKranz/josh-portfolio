"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PORTFOLIO_DATABASE,
  LENSES,
  MASTER,
  MATURITY_COLORS,
  type Evidence,
  type Perspective,
  type Renderer,
  type SandboxProject,
} from "./data";

const PERSPECTIVE_IDS = LENSES.map((l) => l.id);
const STORAGE = {
  perspective: "sbx_perspective",
  renderer: "sbx_renderer",
  theme: "sbx_theme",
  cluster: "sbx_cluster",
};

type Theme = "light" | "dark";
type Cluster = "a" | "b" | "c";

function isPerspective(v: string): v is Perspective {
  return (PERSPECTIVE_IDS as string[]).includes(v);
}
function isRenderer(v: string): v is Renderer {
  return v === "classic" || v === "enhanced";
}
function isTheme(v: string | null): v is Theme {
  return v === "light" || v === "dark";
}
function isCluster(v: string | null): v is Cluster {
  return v === "a" || v === "b" || v === "c";
}

// ---------------------------------------------------------------------------
// Evidence (Layer 0) renderers — identical data, shown by both view engines.
// ---------------------------------------------------------------------------

function EvidenceImage({ item }: { item: Evidence }) {
  const [errored, setErrored] = useState(false);
  return (
    <figure className="evidence-figure">
      {errored ? (
        <div className="media-placeholder">
          <span className="ph-label">Image placeholder</span>
          <span className="ph-sub">{item.label}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.path}
          alt={item.label}
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
      <figcaption>{item.label}</figcaption>
    </figure>
  );
}

function EvidenceItem({ item }: { item: Evidence }) {
  // Gated artifacts stay visible — the description proves depth exists; the
  // file itself is withheld until an explicit unlock (future phase).
  if (item.securityTier === "private") {
    return (
      <div className="gated-asset-vault">
        <span className="vault-glyph" aria-hidden="true">
          🔒
        </span>
        <div>
          <p className="vault-head">Gated evidence · {item.type}</p>
          <p className="vault-desc">{item.label}</p>
          <p className="vault-hint">Available for deep evaluation on request.</p>
        </div>
      </div>
    );
  }
  if (item.type === "image") {
    return <EvidenceImage item={item} />;
  }
  // Public non-image artifact (no broken frames — render a labeled placeholder).
  return (
    <div className="media-placeholder">
      <span className="ph-label">{item.type}</span>
      <span className="ph-sub">{item.label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// A single project. The markup is the SAME in both renderers — CSS keyed off
// `data-renderer` re-interprets it (classic hides the visual layers).
// ---------------------------------------------------------------------------

function ProjectCard({
  project,
  spotlight,
  lensLabel,
}: {
  project: SandboxProject;
  spotlight: boolean;
  lensLabel: string;
}) {
  return (
    <article className="project-card" data-spotlight={spotlight ? "true" : "false"}>
      <div className="card-header">
        <span className="project-type-badge">{project.type}</span>
        <span className="provenance-tag">id: {project.id}</span>
      </div>

      <div className="card-titles">
        <h2>{project.title}</h2>
        <p className="editorial-subtitle">{project.subtitle}</p>
      </div>

      <p className="status-line">{project.status}</p>

      {spotlight && <p className="spotlight-chip">Relevant to {lensLabel}</p>}

      <div className="evidence-container">
        <div className="evidence-grid">
          {project.evidence.map((ev) => (
            <EvidenceItem key={ev.id} item={ev} />
          ))}
        </div>
      </div>

      <div className="human-insight-callout">
        <p>&ldquo;{project.narrative.insight}&rdquo;</p>
      </div>

      <div className="narrative-body">
        <h4>The problem</h4>
        <p>{project.narrative.problem}</p>
        <h4>What I directed, built, and tested</h4>
        <p>{project.narrative.execution}</p>
      </div>

      <div className="card-technical-footer tech-tags">
        {project.metadata.tags.map((tag) => (
          <span className="tech-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// The page — control surface + renderer.
// ---------------------------------------------------------------------------

export default function SandboxV2() {
  const [perspective, setPerspective] = useState<Perspective>("builder");
  const [renderer, setRenderer] = useState<Renderer>("classic");
  const [theme, setTheme] = useState<Theme>("dark");
  const [cluster, setCluster] = useState<Cluster>("b"); // tight constellation default
  const [identityChosen, setIdentityChosen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore persisted choices after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const p = localStorage.getItem(STORAGE.perspective);
      const r = localStorage.getItem(STORAGE.renderer);
      const c = localStorage.getItem(STORAGE.cluster);
      if (p && isPerspective(p)) {
        setPerspective(p);
        setIdentityChosen(true);
      }
      if (r && isRenderer(r)) setRenderer(r);
      if (c && isCluster(c)) setCluster(c);
    } catch {
      /* localStorage unavailable — fall back to defaults */
    }
    setHydrated(true);
  }, []);

  // Persist site-wide so the choice carries across pages and sessions.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE.perspective, perspective);
    } catch {
      /* ignore */
    }
  }, [perspective, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE.renderer, renderer);
    } catch {
      /* ignore */
    }
  }, [renderer, hydrated]);

  // Persist the cluster layout choice (temporary spit-test control).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE.cluster, cluster);
    } catch {
      /* ignore */
    }
  }, [cluster, hydrated]);

  // Theme: honor a saved manual override, otherwise follow the OS preference
  // and keep following it live until the visitor explicitly toggles.
  // Scoped to this sandbox only — the production homepage is untouched.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE.theme);
    } catch {
      /* ignore */
    }

    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    if (isTheme(saved)) {
      setTheme(saved);
    } else if (mq) {
      setTheme(mq.matches ? "dark" : "light");
    }

    if (!mq) return;
    const onSystemChange = (e: MediaQueryListEvent) => {
      let override: string | null = null;
      try {
        override = localStorage.getItem(STORAGE.theme);
      } catch {
        /* ignore */
      }
      if (!isTheme(override)) setTheme(e.matches ? "dark" : "light");
    };
    // addEventListener is the modern API; addListener supports older Safari.
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else mq.addListener(onSystemChange);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", onSystemChange);
      else mq.removeListener(onSystemChange);
    };
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE.theme, next); // explicit override lock
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  // Each keycap advances its own state on press. The bloom/menu selection
  // (Coke-Freestyle style) and contextual label mutation come in a later pass;
  // for now cycling keeps perspective switching alive without a dropdown.
  function cycleIdentity() {
    setIdentityChosen(true);
    setPerspective((prev) => {
      const i = PERSPECTIVE_IDS.indexOf(prev);
      return PERSPECTIVE_IDS[(i + 1) % PERSPECTIVE_IDS.length];
    });
  }

  function toggleView() {
    setRenderer((prev) => (prev === "classic" ? "enhanced" : "classic"));
  }

  const activeLens = LENSES.find((l) => l.id === perspective) ?? LENSES[0];

  const matches = useMemo(
    () =>
      perspective === "curious"
        ? []
        : PORTFOLIO_DATABASE.filter((p) => p.perspectives.includes(perspective)),
    [perspective],
  );

  // Keep every project visible; sort matching exhibits to the front.
  const ordered = useMemo(() => {
    if (perspective === "curious") return PORTFOLIO_DATABASE;
    const rest = PORTFOLIO_DATABASE.filter(
      (p) => !p.perspectives.includes(perspective),
    );
    return [...matches, ...rest];
  }, [perspective, matches]);

  const lensIntro =
    perspective === "curious" ? (
      <>Showing every exhibit. Pick a lens to re-sort by who the work matters to.</>
    ) : matches.length > 0 ? (
      <>
        Lens: <strong>{activeLens.label}</strong> — spotlighting {matches.length}{" "}
        {matches.length === 1 ? "exhibit" : "exhibits"} most relevant to this
        view. {activeLens.blurb}
      </>
    ) : (
      <>
        Lens: <strong>{activeLens.label}</strong> — no exhibits are tagged for
        this view yet. {activeLens.blurb} (Apple Experience Systems and Sonic
        Experience Design are next in the build queue.)
      </>
    );

  return (
    <div
      className="sbx"
      data-renderer={renderer}
      data-perspective={perspective}
      data-theme={theme}
    >
      {/* Independent glass "typewriter key" artifacts (cluster spit-test).
          Each key advances its own state on press — no dropdowns yet. */}
      <div
        className="kc-cluster"
        data-cluster={cluster}
        role="group"
        aria-label="Controls"
      >
        <button
          type="button"
          className="kc kc-identity"
          onClick={cycleIdentity}
          aria-label={`Audience lens: ${
            identityChosen ? activeLens.label : "not set"
          }. Tap to change.`}
        >
          {identityChosen ? activeLens.label : "Who are you?"}
        </button>
        <div className="kc-row2">
          <button
            type="button"
            className="kc kc-view"
            onClick={toggleView}
            aria-label={`View: ${
              renderer === "classic" ? "Classic" : "Enhanced"
            }. Tap to switch.`}
          >
            {renderer === "classic" ? "Classic" : "Enhanced"}
          </button>
          <button
            type="button"
            className="kc kc-theme"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            title={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          </button>
        </div>
      </div>

      {/* Temporary layout spit-test switch — removed once a cluster wins. */}
      <div
        className="kc-switcher"
        role="group"
        aria-label="Cluster layout (temporary)"
      >
        <span className="kc-switcher-label">cluster</span>
        {(["a", "b", "c"] as const).map((c) => (
          <button
            key={c}
            type="button"
            className="kc-switcher-btn"
            data-active={cluster === c}
            aria-pressed={cluster === c}
            onClick={() => setCluster(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {renderer === "classic" ? (
        // CLASSIC — closely mirrors the live production homepage so the
        // baseline reads as today's published portfolio, not a new design.
        <main className="sbx-classic">
          <header>
            <h1 className="cl-name">{MASTER.name}</h1>
            <p className="cl-role">{MASTER.role}</p>
            <p className="cl-thesis">{MASTER.thesis}</p>
            <p className="cl-capabilities">{MASTER.capabilities}</p>
            <p className="cl-links">
              <a href="/why">Why this work</a>
              <span className="sep" aria-hidden="true">
                ·
              </span>
              <a href="/how-i-work">How I work</a>
            </p>
          </header>

          <h2 className="cl-section-label">Selected work</h2>
          <ul className="cl-list">
            {ordered.map((project) => (
              <li key={project.id}>
                <a className="cl-row" href={project.href}>
                  <span className="cl-thumb">{project.thumbLabel}</span>
                  <span className="cl-row-body">
                    <span className="cl-row-name">{project.title}</span>
                    <span className="cl-row-summary">{project.summary}</span>
                  </span>
                  <span className="cl-maturity">
                    <span
                      className="dot"
                      style={{ background: MATURITY_COLORS[project.maturity] }}
                      aria-hidden="true"
                    />
                    {project.maturityLabel}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="cl-footer">
            <a href="/">Work</a>
            <a href="/how-i-work">How I work</a>
            <a href="/why">Why this work</a>
            <a href="/Josh_Rosenkranz_Resume.pdf">Résumé</a>
            <a href="mailto:joshrosenkranz@mac.com">joshrosenkranz@mac.com</a>
            <a
              href="https://www.linkedin.com/in/joshrosenkranz/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </footer>
        </main>
      ) : (
        // ENHANCED — the experimental editorial renderer.
        <main className="sbx-main">
          <header className="sbx-header">
            <h1 className="sbx-name">{MASTER.name}</h1>
            <p className="sbx-role">{MASTER.role}</p>
            <p className="sbx-thesis">{MASTER.thesis}</p>
            <p className="sbx-lens-intro">{lensIntro}</p>
          </header>

          <div className="sbx-banner">
            <b>Phase 1 proof of concept.</b> One content source, two renderers.
            Use the floating control to switch <b>View</b> (Classic ↔ Enhanced)
            and <b>Lens</b> (Builder, Inventor, …). Choices persist across
            reloads. RoomBridge&rsquo;s images are real; RelicWorld&rsquo;s are
            intentionally absent to show the graceful placeholder, and every 🔒
            item shows the gated-vault treatment.
          </div>

          <h2 className="sbx-grid-label">Selected work</h2>
          <section className="portfolio-grid">
            {ordered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                spotlight={
                  perspective !== "curious" &&
                  project.perspectives.includes(perspective)
                }
                lensLabel={activeLens.label}
              />
            ))}
          </section>

          <footer className="sbx-footer">
            Isolated architecture sandbox — the same Layer 0 / Layer 1 content,
            re-expressed by a swappable renderer. Wave transition, Museum
            renderer, and the AI curator build on top of this exact foundation.{" "}
            <a href="/">← Back to the live portfolio</a>
          </footer>
        </main>
      )}
    </div>
  );
}
