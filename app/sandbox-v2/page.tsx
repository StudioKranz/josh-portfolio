"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  tune: "sbx_tune",
  wavefront: "sbx_wavefront",
  scrollStart: "sbx_scrollstart",
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

// --- Tuning Lab: live CSS-variable controls (set on :root, read by .sbx) -----
type TuneKey =
  | "depth"
  | "duration"
  | "delay"
  | "glow"
  | "drift"
  | "attack"
  | "release";
const TUNE_DEFAULTS: Record<TuneKey, number> = {
  depth: 6, // % arc smile
  duration: 3.1, // s wave sweep (dialed-in default)
  delay: 700, // ms before the intro wave starts
  glow: 6, // px amber edge blur
  drift: 15, // px companion drift
  attack: 0.95, // ease-in handle (cubic-bezier x1)
  release: 0.36, // ease-out handle (cubic-bezier x2)
};
const TUNE_VAR: Record<TuneKey, string> = {
  depth: "--wave-arc-depth",
  duration: "--wave-duration",
  delay: "--wave-start-delay", // mirrored to :root for reference (JS reads state)
  glow: "--wave-glow-intensity",
  drift: "--bloom-drift-distance",
  attack: "--wave-attack",
  release: "--wave-release",
};
const TUNE_UNIT: Record<TuneKey, string> = {
  depth: "%",
  duration: "s",
  delay: "ms",
  glow: "px",
  drift: "px",
  attack: "",
  release: "",
};
const TUNE_FIELDS: {
  key: TuneKey;
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "depth", label: "Wave arc depth", min: 0, max: 15, step: 0.5 },
  { key: "duration", label: "Wave duration", min: 0.5, max: 6, step: 0.1 },
  { key: "delay", label: "Intro start delay", min: 0, max: 3000, step: 50 },
  { key: "attack", label: "Wave attack (ease-in)", min: 0, max: 1, step: 0.01 },
  { key: "release", label: "Wave release (ease-out)", min: 0, max: 1, step: 0.01 },
  { key: "glow", label: "Amber edge glow", min: 2, max: 25, step: 1 },
  { key: "drift", label: "Bloom drift spread", min: 5, max: 40, step: 1 },
];

// Wavefront spectacle styles (set as data-wavefront on the .sbx root).
type Wavefront = "crisp" | "chromatic" | "volumetric";
const WAVEFRONTS: { id: Wavefront; label: string }[] = [
  { id: "crisp", label: "Crisp Amber Shadow" },
  { id: "chromatic", label: "Chromatic Prism Fringe" },
  { id: "volumetric", label: "Volumetric Glass Mist" },
];
function isWavefront(v: string | null): v is Wavefront {
  return v === "crisp" || v === "chromatic" || v === "volumetric";
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
      <figcaption>
        {item.eyebrow && <span className="ev-eyebrow">{item.eyebrow}</span>}
        {item.label}
      </figcaption>
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

      {project.evidence.length > 0 && (
        <div className="evidence-container">
          <div className="evidence-grid">
            {project.evidence.map((ev) => (
              <EvidenceItem key={ev.id} item={ev} />
            ))}
          </div>
        </div>
      )}

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
  const [introArmed, setIntroArmed] = useState(false);
  // When true, the first-visit intro wave waits for the visitor to scroll
  // before it begins (otherwise it plays as a normal cold open). First-visit
  // only — it has no effect on returning visits or manual switching.
  const [scrollStart, setScrollStart] = useState(false);
  // Tuning Lab — live physics controls mapped to :root CSS variables.
  const [tune, setTune] = useState<Record<TuneKey, number>>(TUNE_DEFAULTS);
  const [tuneOpen, setTuneOpen] = useState(false);
  const [wavefront, setWavefront] = useState<Wavefront>("crisp");
  const clusterRef = useRef<HTMLDivElement>(null);

  // Restore persisted choices after mount (avoids hydration mismatch).
  useEffect(() => {
    let savedRenderer: string | null = null;
    try {
      const id = localStorage.getItem(STORAGE.identity);
      savedRenderer = localStorage.getItem(STORAGE.renderer);
      const c = localStorage.getItem(STORAGE.cluster);
      const w = localStorage.getItem(STORAGE.wavefront);
      if (isKnownIdentity(id)) setIdentityId(id);
      if (savedRenderer && isRenderer(savedRenderer)) setRenderer(savedRenderer);
      if (c && isCluster(c)) setCluster(c);
      if (isWavefront(w)) setWavefront(w);
      if (localStorage.getItem(STORAGE.scrollStart) === "true")
        setScrollStart(true);
    } catch {
      /* localStorage unavailable — fall back to defaults */
    }
    setHydrated(true);

    // Intro-only wave: a first cold open (no saved view) opens in V1 Classic and
    // sweeps to V2 Enhanced exactly once. Returning visits open directly in the
    // saved view; manual switching is always instant.
    const firstVisit = !(savedRenderer && isRenderer(savedRenderer));
    if (firstVisit) {
      if (prefersReducedMotion()) {
        setRenderer("enhanced"); // arrive in V2 without the animation
      } else {
        setIntroArmed(true);
      }
    }
  }, []);

  // Fire the one-time intro sweep after a first cold open. Timing is tunable
  // (Tuning Lab "Intro start delay"). When "Start intro wave on scroll" is on,
  // the sweep holds in V1 until the visitor's first scroll, then plays after
  // the same start delay; otherwise it plays as an automatic cold open.
  useEffect(() => {
    if (!introArmed) return;
    const delayMs = Math.max(0, tune.delay);
    const fire = () => {
      setPrevRenderer("classic");
      setRenderer("enhanced");
      setWaving(true);
      setIntroArmed(false);
    };

    if (scrollStart) {
      let timer: ReturnType<typeof setTimeout> | null = null;
      const onScroll = () => {
        timer = setTimeout(fire, delayMs);
      };
      window.addEventListener("scroll", onScroll, { passive: true, once: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (timer) clearTimeout(timer);
      };
    }

    const t = setTimeout(fire, delayMs);
    return () => clearTimeout(t);
  }, [introArmed, scrollStart, tune.delay]);

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
    // Manual switching is instant; the wave is reserved for the intro only.
    setRenderer(opt.renderer);
  }

  // Tear down the dual-layer once the scan line finishes.
  function endWave() {
    setWaving(false);
    setPrevRenderer(null);
  }

  // Hold the stage at least as tall as the OUTGOING content during the sweep,
  // so the page never shrinks mid-transition (the V2 -> V1 "jump"). scrollHeight
  // reports the content height even though the layer is height:100%. The reflow
  // to the incoming height then happens after teardown, below the fold.
  const setOutRef = useCallback((node: HTMLDivElement | null) => {
    if (node && node.parentElement) {
      node.parentElement.style.minHeight = `${node.scrollHeight}px`;
    }
  }, []);

  // Safety net: never leave the overlay stuck if animationEnd doesn't fire.
  // Tracks the live (tunable) wave duration.
  useEffect(() => {
    if (!waving) return;
    const t = setTimeout(endWave, Math.round(tune.duration * 1000) + 300);
    return () => clearTimeout(t);
  }, [waving, tune.duration]);

  function applyTuneVar(key: TuneKey, value: number) {
    document.documentElement.style.setProperty(
      TUNE_VAR[key],
      `${value}${TUNE_UNIT[key]}`,
    );
  }

  function updateTune(key: TuneKey, value: number) {
    setTune((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE.tune, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    applyTuneVar(key, value);
  }

  function resetTune() {
    setTune(TUNE_DEFAULTS);
    try {
      localStorage.setItem(STORAGE.tune, JSON.stringify(TUNE_DEFAULTS));
    } catch {
      /* ignore */
    }
    (Object.keys(TUNE_DEFAULTS) as TuneKey[]).forEach((k) =>
      applyTuneVar(k, TUNE_DEFAULTS[k]),
    );
  }

  function selectWavefront(value: Wavefront) {
    setWavefront(value);
    try {
      localStorage.setItem(STORAGE.wavefront, value);
    } catch {
      /* ignore */
    }
  }

  function updateScrollStart(value: boolean) {
    setScrollStart(value);
    try {
      localStorage.setItem(STORAGE.scrollStart, value ? "true" : "false");
    } catch {
      /* ignore */
    }
  }

  // Restore Tuning Lab values from storage and apply them to :root on mount.
  useEffect(() => {
    let restored: Record<TuneKey, number> = TUNE_DEFAULTS;
    try {
      const raw = localStorage.getItem(STORAGE.tune);
      if (raw) restored = { ...TUNE_DEFAULTS, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    setTune(restored);
    (Object.keys(restored) as TuneKey[]).forEach((k) =>
      document.documentElement.style.setProperty(
        TUNE_VAR[k],
        `${restored[k]}${TUNE_UNIT[k]}`,
      ),
    );
  }, []);

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
      data-wavefront={wavefront}
      data-dim={openBloom ? "true" : undefined}
    >
      {/* Independent glass "typewriter key" artifacts. Sequence (left → right):
          [ ☾ ] | [ Enhanced ] | [ Who are you? ] — identity sits at the right
          so its dense bloom opens over clean margin space, not the hero copy. */}
      <div
        className="kc-cluster"
        data-cluster={cluster}
        data-bloom={openBloom ?? undefined}
        role="group"
        aria-label="Controls"
        ref={clusterRef}
      >
        {/* Theme (leftmost; simple toggle, no bloom). */}
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

        {/* Experience (blooms V1–V4). */}
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

        {/* Identity (rightmost; blooms the audience taxonomy over the margin). */}
        <div className="kc-slot kc-slot-identity">
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
            <div
              className="kc-bloom kc-bloom-right"
              role="listbox"
              aria-label="Audience"
            >
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

      {/* Tuning Lab — live physics controls (bottom-right). */}
      <div className="tune-lab" data-open={tuneOpen ? "true" : undefined}>
        <button
          type="button"
          className="tune-toggle"
          aria-expanded={tuneOpen}
          onClick={() => setTuneOpen((o) => !o)}
        >
          <span aria-hidden="true">🛠️</span> Tune Physics
        </button>
        {tuneOpen && (
          <div className="tune-body">
            {TUNE_FIELDS.map((f) => (
              <label key={f.key} className="tune-row">
                <span className="tune-name">{f.label}</span>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={tune[f.key]}
                  onChange={(e) => updateTune(f.key, parseFloat(e.target.value))}
                  aria-label={f.label}
                />
                <span className="tune-val">
                  {tune[f.key]}
                  {TUNE_UNIT[f.key]}
                </span>
              </label>
            ))}
            <label className="tune-row tune-select-row">
              <span className="tune-name">Wavefront spectacle</span>
              <select
                className="tune-select"
                value={wavefront}
                onChange={(e) => selectWavefront(e.target.value as Wavefront)}
                aria-label="Wavefront spectacle style"
              >
                {WAVEFRONTS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="tune-row tune-check-row">
              <input
                type="checkbox"
                className="tune-check"
                checked={scrollStart}
                onChange={(e) => updateScrollStart(e.target.checked)}
                aria-label="Start the first-visit intro wave only after the visitor scrolls"
              />
              <span className="tune-name tune-check-name">
                Start intro wave on scroll
              </span>
              <span className="tune-check-hint">
                First visit only — holds in V1 until the first scroll.
              </span>
            </label>
            <button type="button" className="tune-reset" onClick={resetTune}>
              Reset to defaults
            </button>
          </div>
        )}
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
            ref={setOutRef}
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
