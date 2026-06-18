"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PORTFOLIO_DATABASE,
  LENSES,
  IDENTITIES,
  EXPERIENCES,
  MASTER,
  MATURITY_COLORS,
  type Evidence,
  type ExperienceOption,
  type Perspective,
  type Renderer,
  type SandboxProject,
} from "./data";

const IDENTITY_IDS = IDENTITIES.map((i) => i.id);
const STORAGE = {
  identity: "sbx_identity",
  renderer: "sbx_renderer",
  theme: "sbx_theme",
  cluster: "sbx_cluster",
};

type Theme = "light" | "dark";
type Cluster = "a" | "b" | "c";
type Bloom = "identity" | "view" | null;

function isRenderer(v: string): v is Renderer {
  return v === "classic" || v === "enhanced";
}
function isTheme(v: string | null): v is Theme {
  return v === "light" || v === "dark";
}
function isCluster(v: string | null): v is Cluster {
  return v === "a" || v === "b" || v === "c";
}
function isKnownIdentity(v: string | null): v is string {
  return v != null && IDENTITY_IDS.includes(v);
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const WAVE_MS = 1400;

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
  const [identityId, setIdentityId] = useState<string | null>(null);
  const [renderer, setRenderer] = useState<Renderer>("classic");
  const [theme, setTheme] = useState<Theme>("dark");
  const [cluster, setCluster] = useState<Cluster>("b"); // tight constellation default
  const [openBloom, setOpenBloom] = useState<Bloom>(null);
  const [hydrated, setHydrated] = useState(false);
  // Wave transition between Classic <-> Enhanced (dual-layer, runs on toggle).
  const [waving, setWaving] = useState(false);
  const [prevRenderer, setPrevRenderer] = useState<Renderer | null>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  // Restore persisted choices after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const id = localStorage.getItem(STORAGE.identity);
      const r = localStorage.getItem(STORAGE.renderer);
      const c = localStorage.getItem(STORAGE.cluster);
      if (isKnownIdentity(id)) setIdentityId(id);
      if (r && isRenderer(r)) setRenderer(r);
      if (c && isCluster(c)) setCluster(c);
    } catch {
      /* localStorage unavailable — fall back to defaults */
    }
    setHydrated(true);
  }, []);

  // Persist the chosen identity site-wide.
  useEffect(() => {
    if (!hydrated || identityId == null) return;
    try {
      localStorage.setItem(STORAGE.identity, identityId);
    } catch {
      /* ignore */
    }
  }, [identityId, hydrated]);

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
    setOpenBloom(null);
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

  function toggleBloom(node: Exclude<Bloom, null>) {
    setOpenBloom((prev) => (prev === node ? null : node));
  }

  function selectIdentity(id: string) {
    setIdentityId(id); // persisted by effect
    setOpenBloom(null);
  }

  function selectExperience(opt: ExperienceOption) {
    if (!opt.available || !opt.renderer) return;
    setOpenBloom(null);
    if (opt.renderer === renderer) return; // already there — no-op
    if (waving) {
      // mid-transition: just settle on the new renderer without re-waving
      setRenderer(opt.renderer);
      return;
    }
    if (prefersReducedMotion()) {
      setRenderer(opt.renderer); // honor reduced motion: instant swap
      return;
    }
    // Explicit toggle → run the reinterpretation wave.
    setPrevRenderer(renderer);
    setRenderer(opt.renderer);
    setWaving(true);
  }

  // Tear down the dual-layer once the scan line finishes.
  function endWave() {
    setWaving(false);
    setPrevRenderer(null);
  }

  // Safety net: never leave the overlay stuck if animationEnd doesn't fire.
  useEffect(() => {
    if (!waving) return;
    const t = setTimeout(endWave, WAVE_MS + 300);
    return () => clearTimeout(t);
  }, [waving]);

  // Close an open bloom on outside click / Escape.
  useEffect(() => {
    if (!openBloom) return;
    function onDown(e: PointerEvent) {
      if (clusterRef.current && !clusterRef.current.contains(e.target as Node)) {
        setOpenBloom(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenBloom(null);
    }
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openBloom]);

  // Node 1 maps the chosen audience identity to an underlying lens; the
  // renderers sort/spotlight by that lens exactly as before.
  const identity =
    identityId != null
      ? IDENTITIES.find((i) => i.id === identityId) ?? null
      : null;
  const perspective: Perspective = identity ? identity.lens : "curious";
  const activeLens = LENSES.find((l) => l.id === perspective) ?? LENSES[0];
  const activeExperience =
    EXPERIENCES.find((e) => e.renderer === renderer) ?? EXPERIENCES[0];

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

  // Either renderer, on demand — so the wave can mount both at once.
  function renderMain(r: Renderer) {
    if (r === "classic") {
      return (
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
      );
    }
    return (
      <main className="sbx-main">
        <header className="sbx-header">
          <h1 className="sbx-name">{MASTER.name}</h1>
          <p className="sbx-role">{MASTER.role}</p>
          <p className="sbx-thesis">{MASTER.thesis}</p>
          <p className="sbx-lens-intro">{lensIntro}</p>
        </header>

        <div className="sbx-banner">
          <b>Phase 1 proof of concept.</b> One content source, multiple
          renderers. Tap the floating glass keys to choose an <b>audience</b>{" "}
          and an <b>experience</b> (V1–V4); choices persist across reloads.
          RoomBridge&rsquo;s images are real; RelicWorld&rsquo;s are
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
          re-expressed by a swappable renderer. Museum renderer and the AI
          curator build on top of this exact foundation.{" "}
          <a href="/">← Back to the live portfolio</a>
        </footer>
      </main>
    );
  }

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
        data-bloom={openBloom ?? undefined}
        role="group"
        aria-label="Controls"
        ref={clusterRef}
      >
        {/* Node 1 — Identity (blooms the audience taxonomy). */}
        <div className="kc-slot">
          <button
            type="button"
            className="kc kc-identity"
            aria-haspopup="true"
            aria-expanded={openBloom === "identity"}
            onClick={() => toggleBloom("identity")}
            aria-label={`Audience: ${
              identity ? identity.label : "not chosen"
            }. Tap to choose.`}
          >
            {identity ? identity.label : "Who are you?"}
          </button>
          {openBloom === "identity" && (
            <div className="kc-bloom" role="listbox" aria-label="Audience">
              {IDENTITIES.map((opt, i) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={identityId === opt.id}
                  className="kc-chip"
                  data-active={identityId === opt.id ? "true" : undefined}
                  style={{ animationDelay: `${i * 30}ms` }}
                  onClick={() => selectIdentity(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="kc-row2">
          {/* Node 2 — Experience (blooms V1–V4). */}
          <div className="kc-slot">
            <button
              type="button"
              className="kc kc-view"
              aria-haspopup="true"
              aria-expanded={openBloom === "view"}
              onClick={() => toggleBloom("view")}
              aria-label={`Experience: ${activeExperience.label}. Tap to choose.`}
            >
              {activeExperience.label}
            </button>
            {openBloom === "view" && (
              <div className="kc-bloom" role="listbox" aria-label="Experience">
                {EXPERIENCES.map((opt, i) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={opt.renderer === renderer}
                    aria-disabled={!opt.available}
                    disabled={!opt.available}
                    className="kc-chip"
                    data-active={opt.renderer === renderer ? "true" : undefined}
                    data-soon={!opt.available ? "true" : undefined}
                    style={{ animationDelay: `${i * 30}ms` }}
                    onClick={() => selectExperience(opt)}
                  >
                    {opt.label}
                    {!opt.available && (
                      <span className="kc-chip-soon">Upcoming</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Node 3 — Theme (simple toggle, no bloom). */}
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

      {waving && prevRenderer ? (
        // Reinterpretation wave: incoming renders in flow (defines final
        // height → no end shift); outgoing overlays on top and is clipped
        // away top-to-bottom by a sharp amber scan line.
        <div className="sbx-stage" data-from={prevRenderer} data-to={renderer}>
          <div className="sbx-layer sbx-layer-in">{renderMain(renderer)}</div>
          <div
            className="sbx-layer sbx-layer-out"
            aria-hidden="true"
            onAnimationEnd={endWave}
          >
            {renderMain(prevRenderer)}
          </div>
        </div>
      ) : (
        renderMain(renderer)
      )}
    </div>
  );
}
