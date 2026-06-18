"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PORTFOLIO_DATABASE,
  LENSES,
  RENDERERS,
  MASTER,
  type Evidence,
  type Perspective,
  type Renderer,
  type SandboxProject,
} from "./data";

const PERSPECTIVE_IDS = LENSES.map((l) => l.id);
const STORAGE = { perspective: "sbx_perspective", renderer: "sbx_renderer" };

function isPerspective(v: string): v is Perspective {
  return (PERSPECTIVE_IDS as string[]).includes(v);
}
function isRenderer(v: string): v is Renderer {
  return v === "classic" || v === "enhanced";
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
  const [openTray, setOpenTray] = useState<"lens" | "view" | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const fixedRef = useRef<HTMLDivElement>(null);

  // Restore persisted choices after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const p = localStorage.getItem(STORAGE.perspective);
      const r = localStorage.getItem(STORAGE.renderer);
      if (p && isPerspective(p)) setPerspective(p);
      if (r && isRenderer(r)) setRenderer(r);
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

  // Close trays on outside click / Escape.
  useEffect(() => {
    if (!openTray) return;
    function onDown(e: PointerEvent) {
      if (fixedRef.current && !fixedRef.current.contains(e.target as Node)) {
        setOpenTray(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenTray(null);
    }
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTray]);

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
    <div className="sbx" data-renderer={renderer} data-perspective={perspective}>
      {/* Liquid Glass capsule — persistent, site-wide control surface */}
      <div className="lg-fixed" ref={fixedRef}>
        <div className="lg-dock" role="group" aria-label="View controls">
          <div className="lg-control">
            <button
              type="button"
              className="lg-pill"
              aria-haspopup="listbox"
              aria-expanded={openTray === "lens"}
              onClick={() =>
                setOpenTray((t) => (t === "lens" ? null : "lens"))
              }
            >
              <span className="lg-key">Lens</span>
              <span className="lg-value">{activeLens.label}</span>
              <span className="lg-caret" aria-hidden="true">
                ▾
              </span>
            </button>
            {openTray === "lens" && (
              <ul className="lg-tray" role="listbox" aria-label="Perspective">
                {LENSES.map((lens) => (
                  <li key={lens.id} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={lens.id === perspective}
                      className="lg-option"
                      onClick={() => {
                        setPerspective(lens.id);
                        setOpenTray(null);
                      }}
                    >
                      <span className="opt-label">{lens.label}</span>
                      <span className="opt-blurb">{lens.blurb}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg-divider" aria-hidden="true" />

          <div className="lg-control">
            <button
              type="button"
              className="lg-pill"
              aria-haspopup="listbox"
              aria-expanded={openTray === "view"}
              onClick={() =>
                setOpenTray((t) => (t === "view" ? null : "view"))
              }
            >
              <span className="lg-key">View</span>
              <span className="lg-value">
                {renderer === "classic" ? "Classic" : "Enhanced"}
              </span>
              <span className="lg-caret" aria-hidden="true">
                ▾
              </span>
            </button>
            {openTray === "view" && (
              <ul className="lg-tray" role="listbox" aria-label="Renderer">
                {RENDERERS.map((opt) => (
                  <li key={opt.id} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={opt.id === renderer}
                      disabled={!opt.available}
                      className="lg-option"
                      onClick={() => {
                        if (!opt.available) return;
                        if (isRenderer(opt.id)) setRenderer(opt.id);
                        setOpenTray(null);
                      }}
                    >
                      <span className="opt-label">{opt.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className="lg-subhint" aria-live="polite">
          <span className="dot" aria-hidden="true">
            ●
          </span>{" "}
          {renderer === "classic"
            ? "Classic view — Enhanced available"
            : "Enhanced view active"}
        </p>
      </div>

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
          and <b>Lens</b> (Builder, Inventor, …). Choices persist across reloads.
          RoomBridge&rsquo;s images are real; RelicWorld&rsquo;s are intentionally
          absent to show the graceful placeholder, and every 🔒 item shows the
          gated-vault treatment.
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
          re-expressed by a swappable renderer. Wave transition, Museum renderer,
          and the AI curator build on top of this exact foundation.{" "}
          <a href="/">← Back to the live portfolio</a>
        </footer>
      </main>
    </div>
  );
}
