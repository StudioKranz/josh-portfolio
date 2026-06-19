"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PORTFOLIO_DATABASE,
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
  featured: "sbx_featured",
  featuredManual: "sbx_featured_manual",
  forceAutoWave: "sbx_forceautowave",
};

type Theme = "light" | "dark";
type ThemeMode = "light" | "dark" | "auto";
type Cluster = "a" | "b" | "c";
type Bloom = "identity" | "view" | "theme" | null;

// Featured Artifact Spotlight — which project anchors the top of the V2 feed.
// In Auto mode it tracks the active "Who are you?" audience; the Tuning Lab
// selector can manually override (and lock) it to one of these options.
const FEATURED_OPTIONS = [
  "roombridge",
  "relicworld",
  "attune",
  "apple-experience-systems",
] as const;
type FeaturedId = (typeof FEATURED_OPTIONS)[number];
const FEATURED_IDS: readonly string[] = FEATURED_OPTIONS;
function isFeatured(v: string | null): v is FeaturedId {
  return v != null && FEATURED_IDS.includes(v);
}

// Auto-binding: the active audience identity maps to the project that anchors
// the top of the feed. Returns a project id (may be outside FEATURED_OPTIONS).
// "Stronger active visual" tie-breaks resolved to: eval audiences → RelicWorld
// (the only visual-evidence option of that pair), musician → Sonic Experience.
function autoFeaturedId(identityId: string | null): string {
  switch (identityId) {
    case "engineering-manager":
    case "recruiter":
    case "hiring-manager":
      return "relicworld";
    case "music-collaborator":
      return "sonic-experience-design";
    // incubation-team, design-leader, curious-human, product-leader, default:
    default:
      return "roombridge";
  }
}

function isRenderer(v: string): v is Renderer {
  return v === "classic" || v === "enhanced";
}
function isThemeMode(v: string | null): v is ThemeMode {
  return v === "light" || v === "dark" || v === "auto";
}
const THEME_MODES: { id: ThemeMode; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "auto", label: "Auto", icon: "💻" },
];
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
  depth: 0, // % arc bow — 0 = a perfectly flat horizontal wavefront
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
  { key: "depth", label: "Wave arc depth (0 = flat)", min: 0, max: 6, step: 0.5 },
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

// Explicit "asset expected" tile — names the exact path a missing image should
// live at, so it's actionable (drop the file in) rather than a silent gray box.
function MissingAsset({ path }: { path: string }) {
  return (
    <div className="media-missing" role="note">
      <span className="mm-label">Image asset expected at</span>
      <code className="mm-path">{path}</code>
    </div>
  );
}

function EvidenceImage({ item }: { item: Evidence }) {
  const [errored, setErrored] = useState(false);
  return (
    <figure className="evidence-figure">
      {errored ? (
        <MissingAsset path={item.path} />
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

// Every artifact is presented fully open — no padlocks, vaults, or gating.
function EvidenceItem({ item }: { item: Evidence }) {
  if (item.type === "image") {
    return <EvidenceImage item={item} />;
  }
  // Non-image artifact — shown openly as a readable, described asset.
  return (
    <div className="evidence-artifact">
      <span className="evidence-artifact-type">{item.type}</span>
      <p className="evidence-artifact-label">{item.label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// A single project. The markup is the SAME in both renderers — CSS keyed off
// `data-renderer` re-interprets it (classic hides the visual layers).
// ---------------------------------------------------------------------------

// Foundation for future Attune tone modes — a static, non-interactive preview
// (Balanced is the default). The live tone slider is a later phase.
function ToneModes({ modes }: { modes: string[] }) {
  return (
    <div className="tone-modes" role="group" aria-label="Tone modes (preview)">
      <span className="tone-modes-label">Tone</span>
      {modes.map((m) => (
        <span
          key={m}
          className="tone-mode"
          data-active={m === "Balanced" ? "true" : undefined}
        >
          {m}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  spotlight,
}: {
  project: SandboxProject;
  spotlight: boolean;
}) {
  return (
    <article className="project-card" data-spotlight={spotlight ? "true" : "false"}>
      <div className="card-header">
        <span className="project-type-badge">{project.type}</span>
      </div>

      <div className="card-titles">
        <h2>{project.title}</h2>
        <p className="editorial-subtitle">{project.subtitle}</p>
      </div>

      <p className="status-line">{project.status}</p>

      {project.evidence.length > 0 && (
        <div className="evidence-container">
          <div className="evidence-grid">
            {project.evidence.map((ev) => (
              <EvidenceItem key={ev.id} item={ev} />
            ))}
          </div>
        </div>
      )}

      <blockquote className="human-insight-callout">
        <p>{project.narrative.insight}</p>
      </blockquote>

      <div className="narrative-body">
        <h4>The problem</h4>
        <p>{project.narrative.problem}</p>
        <h4>What I directed, built, and tested</h4>
        <p>{project.narrative.execution}</p>
      </div>

      {project.toneModes && <ToneModes modes={project.toneModes} />}

      <div className="card-technical-footer tech-tags">
        {project.metadata.tags.map((tag) => (
          <span className="tech-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      {project.href && project.href !== "#" && (
        <a className="card-cta" href={project.href}>
          Explore {project.title} <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Featured artifact — anchors the top of the V2 feed as a premium, low-profile
// product brief: a compact horizontal image strip rather than one tall hero.
// ---------------------------------------------------------------------------

function FeaturedShot({ item }: { item: Evidence }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="featured-shot">
      {errored ? (
        <MissingAsset path={item.path} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.path}
          alt={item.label}
          title={item.label}
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: SandboxProject }) {
  const kicker = project.featuredKicker ?? project.subtitle;
  const highlights =
    project.highlights && project.highlights.length > 0
      ? project.highlights
      : project.metadata.tags;
  const shots = project.evidence.filter((e) => e.type === "image");
  return (
    <article className="featured-card" data-featured="true">
      <div className="featured-head">
        <p className="featured-eyebrow">Featured work</p>
        <h2 className="featured-title">{project.title}</h2>
        <p className="featured-kicker">{kicker}</p>
      </div>

      {shots.length > 0 && (
        <div
          className="featured-strip"
          role="group"
          aria-label={`${project.title} gallery`}
        >
          {shots.map((s) => (
            <FeaturedShot key={s.id} item={s} />
          ))}
        </div>
      )}

      {project.toneModes && <ToneModes modes={project.toneModes} />}

      <div className="featured-meta">
        <ul className="featured-highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        {project.href && project.href !== "#" && (
          <a className="featured-cta" href={project.href}>
            Explore {project.title} <span aria-hidden="true">→</span>
          </a>
        )}
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
  // Three-state theme: an explicit Light/Dark choice, or Auto which follows the
  // OS preference live. The effective theme drives data-theme on the root.
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [systemTheme, setSystemTheme] = useState<Theme>("dark");
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
  // Invitation model (default): a fresh cold open stays in V1 and, after a beat,
  // the experience keycap pulses with a gentle "try Enhanced" invitation rather
  // than force-sweeping. Auto-wave is opt-in via forceAutoWave (Tuning Lab).
  const [forceAutoWave, setForceAutoWave] = useState(false);
  const [invite, setInvite] = useState(false);
  // Tuning Lab — live physics controls mapped to :root CSS variables.
  const [tune, setTune] = useState<Record<TuneKey, number>>(TUNE_DEFAULTS);
  const [tuneOpen, setTuneOpen] = useState(false);
  const [wavefront, setWavefront] = useState<Wavefront>("crisp");
  // Featured spotlight: `featured` is the manual choice; `featuredManual` says
  // whether it overrides the audience auto-binding. Default = Auto (track lens).
  const [featured, setFeatured] = useState<FeaturedId>("roombridge");
  const [featuredManual, setFeaturedManual] = useState(false);
  // Whether the lens-filtered "More Projects" section is expanded.
  const [moreOpen, setMoreOpen] = useState(false);
  // Bumped on each audience selection to scroll the feed into focus + replay the
  // featured artifact's entry-flash (confidence cue that the engine responded).
  const [feedSignal, setFeedSignal] = useState(0);
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
      const f = localStorage.getItem(STORAGE.featured);
      if (isFeatured(f)) setFeatured(f);
      if (localStorage.getItem(STORAGE.featuredManual) === "true")
        setFeaturedManual(true);
      if (localStorage.getItem(STORAGE.forceAutoWave) === "true")
        setForceAutoWave(true);
    } catch {
      /* localStorage unavailable — fall back to defaults */
    }
    setHydrated(true);

    // A first cold open (no saved view) arms the cold-open behavior; the effect
    // below decides between the invitation (default) and the auto-wave (opt-in).
    // Returning visits open directly in the saved view.
    const firstVisit = !(savedRenderer && isRenderer(savedRenderer));
    if (firstVisit) setIntroArmed(true);
  }, []);

  // Cold-open behavior after a first visit. Default (invitation): stay in V1 and,
  // after the tunable delay, pulse the experience keycap with a gentle "try
  // Enhanced" invitation. Opt-in (Force Auto-Wave): play the original V1->V2
  // sweep instead, optionally gated on first scroll. Reduced motion never sweeps.
  useEffect(() => {
    if (!introArmed) return;
    const delayMs = Math.max(0, tune.delay);

    if (!forceAutoWave) {
      // Respectful default — invite, never interrupt.
      const t = setTimeout(() => {
        setInvite(true);
        setIntroArmed(false);
      }, delayMs);
      return () => clearTimeout(t);
    }

    if (prefersReducedMotion()) {
      setRenderer("enhanced"); // arrive in V2 without the animation
      setIntroArmed(false);
      return;
    }

    const fire = () => {
      // Camera correction: ensure the wavefront sweeps in view (see selectExperience).
      window.scrollTo({ top: 0, behavior: "auto" });
      setInvite(false);
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
  }, [introArmed, forceAutoWave, scrollStart, tune.delay]);

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

  // Theme: restore the saved mode (Light / Dark / Auto), and always track the OS
  // preference live so Auto stays in sync. Scoped to this sandbox only.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE.theme);
    } catch {
      /* ignore */
    }
    if (isThemeMode(saved)) setThemeMode(saved);

    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    if (!mq) return;
    setSystemTheme(mq.matches ? "dark" : "light");
    const onSystemChange = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light");
    // addEventListener is the modern API; addListener supports older Safari.
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else mq.addListener(onSystemChange);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", onSystemChange);
      else mq.removeListener(onSystemChange);
    };
  }, []);

  function updateThemeMode(mode: ThemeMode) {
    setThemeMode(mode);
    try {
      localStorage.setItem(STORAGE.theme, mode);
    } catch {
      /* ignore */
    }
  }

  function dismissInvite() {
    setInvite(false);
  }

  function toggleBloom(node: Exclude<Bloom, null>) {
    if (node === "view") setInvite(false); // engaging the control answers the invite
    setOpenBloom((prev) => (prev === node ? null : node));
  }

  function selectIdentity(id: string) {
    setIdentityId(id); // persisted by effect
    setOpenBloom(null);
    setInvite(false);
    // Drive the scroll-to-feed + featured entry-flash (effect below).
    setFeedSignal((n) => n + 1);
  }

  function selectExperience(opt: ExperienceOption) {
    if (!opt.available || !opt.renderer) return;
    setOpenBloom(null);
    setInvite(false);
    if (opt.renderer === renderer) return; // already there — no-op

    // V1 -> V2 plays the dramatic rolling-arc reinterpretation sweep.
    // V2 -> V1 is instant and animation-free for a fast, high-performance exit.
    const enteringEnhanced =
      renderer === "classic" && opt.renderer === "enhanced";
    if (enteringEnhanced && !prefersReducedMotion()) {
      // Camera correction: snap the viewport to the top before the sweep so the
      // flat wavefront always runs in front of the viewer, not off-screen above.
      window.scrollTo({ top: 0, behavior: "auto" });
      setPrevRenderer("classic");
      setRenderer("enhanced");
      setWaving(true);
      return;
    }
    setRenderer(opt.renderer);
  }

  // Portfolio keycap (#1): smoothly return to the top of the feed.
  function scrollToTop() {
    setOpenBloom(null);
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
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

  // "auto" returns the spotlight to audience auto-binding; any specific id is a
  // manual override that explicitly wins over the audience mapping.
  function selectFeatured(value: "auto" | FeaturedId) {
    if (value === "auto") {
      setFeaturedManual(false);
      try {
        localStorage.setItem(STORAGE.featuredManual, "false");
      } catch {
        /* ignore */
      }
      return;
    }
    setFeatured(value);
    setFeaturedManual(true);
    try {
      localStorage.setItem(STORAGE.featured, value);
      localStorage.setItem(STORAGE.featuredManual, "true");
    } catch {
      /* ignore */
    }
  }

  function updateForceAutoWave(value: boolean) {
    setForceAutoWave(value);
    try {
      localStorage.setItem(STORAGE.forceAutoWave, value ? "true" : "false");
    } catch {
      /* ignore */
    }
  }

  // Clear the cold-open / onboarding flag and reload so the first-visit behavior
  // replays — a quick loop for benchmarking the invitation pulse (or auto-wave).
  function resetFirstVisit() {
    try {
      localStorage.removeItem(STORAGE.renderer);
    } catch {
      /* ignore */
    }
    window.location.reload();
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
    // Clamp into the current field ranges so stale persisted values from earlier
    // phases (e.g. a deeper arc depth) can't reintroduce the old V-shaped wave.
    restored = (Object.keys(restored) as TuneKey[]).reduce(
      (acc, k) => {
        const f = TUNE_FIELDS.find((x) => x.key === k);
        const v = restored[k];
        acc[k] = f ? Math.min(f.max, Math.max(f.min, v)) : v;
        return acc;
      },
      { ...restored },
    );
    setTune(restored);
    (Object.keys(restored) as TuneKey[]).forEach((k) =>
      document.documentElement.style.setProperty(
        TUNE_VAR[k],
        `${restored[k]}${TUNE_UNIT[k]}`,
      ),
    );
  }, []);

  // Close an open bloom on outside click / Escape. Controls now span three
  // zones (Portfolio left, cluster center, theme right), so match any of them.
  useEffect(() => {
    if (!openBloom) return;
    function onDown(e: PointerEvent) {
      const el = e.target as Element | null;
      if (!el?.closest?.(".kc-cluster, .kc-theme-nav, .kc-portfolio-nav")) {
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

  // On an audience selection, smoothly center the feed (V2 only). The featured
  // card replays its entry-flash via its key. Reduced motion stays instant.
  useEffect(() => {
    if (feedSignal === 0) return; // skip the initial mount
    if (prefersReducedMotion()) return;
    const t = setTimeout(() => {
      const el = document.querySelector(".featured-card");
      if (!el) return; // no feed in V1 Classic
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }, 60);
    return () => clearTimeout(t);
  }, [feedSignal]);

  // Node 1 maps the chosen audience identity to an underlying lens; the
  // renderers sort/spotlight by that lens exactly as before.
  const identity =
    identityId != null
      ? IDENTITIES.find((i) => i.id === identityId) ?? null
      : null;
  const perspective: Perspective = identity ? identity.lens : "curious";
  const activeExperience =
    EXPERIENCES.find((e) => e.renderer === renderer) ?? EXPERIENCES[0];

  // Effective theme: Auto follows the OS; Light/Dark are explicit locks.
  const theme: Theme = themeMode === "auto" ? systemTheme : themeMode;

  // The invitation only shows in V1 Classic and steps aside once any bloom opens.
  const inviteActive = invite && renderer === "classic" && openBloom == null;

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

  // V2 executive feed: the spotlight is a manual override when set, otherwise it
  // auto-binds to the active audience. It anchors the absolute top of the feed.
  const effectiveFeaturedId = featuredManual
    ? featured
    : autoFeaturedId(identityId);
  const featuredProject = useMemo(
    () =>
      PORTFOLIO_DATABASE.find((p) => p.id === effectiveFeaturedId) ?? ordered[0],
    [effectiveFeaturedId, ordered],
  );

  // Lens filtering: with a specific audience, the matching high-relevance work
  // leads the primary list and everything else collapses into "More Projects".
  // With no lens ("curious"), the whole catalog flows as the primary list.
  const feedPrimary = useMemo(() => {
    const pool = perspective === "curious" ? ordered : matches;
    return pool.filter((p) => p.id !== featuredProject.id);
  }, [perspective, ordered, matches, featuredProject]);

  const feedMore = useMemo(() => {
    if (perspective === "curious") return [];
    return PORTFOLIO_DATABASE.filter(
      (p) =>
        !p.perspectives.includes(perspective) && p.id !== featuredProject.id,
    );
  }, [perspective, featuredProject]);

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
              <a href="/why">Core Philosophy</a>
              <span className="sep" aria-hidden="true">
                ·
              </span>
              <a href="/how-i-work">Inside My Process</a>
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
            <a href="/how-i-work">Inside My Process</a>
            <a href="/why">Core Philosophy</a>
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
        {/* Executive split: V2 keeps a compact-but-present introduction — name,
            role, and a tight discipline summary — on tighter margins so the
            featured artifact still lands high in the first viewport. */}
        <header className="sbx-header sbx-header-exec">
          <h1 className="sbx-exec-name">{MASTER.name}</h1>
          <p className="sbx-exec-role">{MASTER.role}</p>
          <p className="sbx-exec-thesis">{MASTER.thesis}</p>
          <p className="sbx-exec-links">
            <a href="/why">Core Philosophy</a>
            <span className="sep" aria-hidden="true">
              ·
            </span>
            <a href="/how-i-work">Inside My Process</a>
          </p>
        </header>

        {/* The feed leads with the strongest artifact; the lens-matched primary
            work flows beneath in a balanced two-column catalog (natural card
            heights, no stretched half-blanks). */}
        <FeaturedCard
          key={`feat-${featuredProject.id}-${feedSignal}`}
          project={featuredProject}
        />

        {feedPrimary.length > 0 && (
          <section className="catalog-columns">
            {feedPrimary.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                spotlight={
                  perspective !== "curious" &&
                  project.perspectives.includes(perspective)
                }
              />
            ))}
          </section>
        )}

        {feedMore.length > 0 && (
          <div className="more-projects">
            <button
              type="button"
              className="more-toggle"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((o) => !o)}
            >
              <span aria-hidden="true">📂</span> More Projects ({feedMore.length})
              <span className="more-chevron" aria-hidden="true">
                {moreOpen ? "▲" : "▼"}
              </span>
            </button>
            {moreOpen && (
              <section className="catalog-columns">
                {feedMore.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    spotlight={false}
                  />
                ))}
              </section>
            )}
          </div>
        )}

        <footer className="sbx-footer">
          One content source, re-expressed by a swappable renderer — the same
          evidence and narrative behind every view.{" "}
          <a href="/Josh_Rosenkranz_Resume.pdf">Résumé</a>
          <span className="sep" aria-hidden="true">
            ·
          </span>
          <a href="mailto:joshrosenkranz@mac.com">joshrosenkranz@mac.com</a>
          <span className="sep" aria-hidden="true">
            ·
          </span>
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
    <div
      className="sbx"
      data-renderer={renderer}
      data-perspective={perspective}
      data-theme={theme}
      data-wavefront={wavefront}
      data-cluster={cluster}
      data-dim={openBloom ? "true" : undefined}
      data-invite={inviteActive ? "true" : undefined}
    >
      {/* Persistent glass header, three zones:
          LEFT  → Portfolio (scroll-to-top)
          CENTER → Detailed Story / Executive Brief + Who are you?  (A/B/C cluster)
          RIGHT → one theme keycap that blooms into Light / Dark / Auto */}

      {/* LEFT zone — Portfolio scroll-to-top. */}
      <div className="kc-portfolio-nav">
        <button
          type="button"
          className="kc kc-portfolio"
          onClick={scrollToTop}
          aria-label="Scroll to the top of the portfolio"
        >
          Portfolio <span className="kc-caret" aria-hidden="true">▲</span>
        </button>
      </div>

      {/* CENTER zone — experience + audience (A/B/C geometry preserved). */}
      <div
        className="kc-cluster"
        data-cluster={cluster}
        data-bloom={openBloom ?? undefined}
        role="group"
        aria-label="Controls"
        ref={clusterRef}
      >
        {/* Experience (blooms the modes). On a fresh cold open this key gently
            pulses and shows a low-profile invitation toast instead of an
            auto-sweep — the transition stays user-initiated. */}
        <div className="kc-slot">
          <button
            type="button"
            className="kc kc-view kc-toggle"
            data-invite={inviteActive ? "true" : undefined}
            aria-haspopup="true"
            aria-expanded={openBloom === "view"}
            onClick={() => toggleBloom("view")}
            aria-label={`View mode: ${activeExperience.label}. Tap to switch.`}
          >
            {activeExperience.label}
          </button>
          {inviteActive && (
            <div className="kc-invite" role="status">
              <span className="kc-invite-text">
                Experience the evolution — switch to the Evolutionary Brief for
                high-density systemic evidence.
              </span>
              <button
                type="button"
                className="kc-invite-dismiss"
                onClick={dismissInvite}
              >
                Dismiss
              </button>
            </div>
          )}
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
            data-chosen={identity ? "true" : undefined}
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

      {/* RIGHT zone — one theme keycap that blooms into Light / Dark / Auto. */}
      <div
        className="kc-theme-nav"
        data-bloom={openBloom === "theme" ? "theme" : undefined}
      >
        <button
          type="button"
          className="kc kc-theme"
          aria-haspopup="true"
          aria-expanded={openBloom === "theme"}
          onClick={() => toggleBloom("theme")}
          aria-label={`Theme: ${themeMode}. Tap to choose.`}
          title="Theme"
        >
          {THEME_MODES.find((m) => m.id === themeMode)?.label ?? "Theme"}
        </button>
        {openBloom === "theme" && (
          <div className="kc-bloom kc-bloom-theme" role="listbox" aria-label="Theme">
            {THEME_MODES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={themeMode === m.id}
                className="kc-chip"
                data-active={themeMode === m.id ? "true" : undefined}
                style={{ animationDelay: `${i * 30}ms` }}
                onClick={() => {
                  updateThemeMode(m.id);
                  setOpenBloom(null);
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
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
            <label className="tune-row tune-select-row">
              <span className="tune-name">Featured artifact spotlight</span>
              <select
                className="tune-select"
                value={featuredManual ? featured : "auto"}
                onChange={(e) =>
                  selectFeatured(e.target.value as "auto" | FeaturedId)
                }
                aria-label="Featured artifact anchoring the top of the feed"
              >
                <option value="auto">Auto (match audience)</option>
                {FEATURED_OPTIONS.map((id) => (
                  <option key={id} value={id}>
                    {PORTFOLIO_DATABASE.find((p) => p.id === id)?.title ?? id}
                  </option>
                ))}
              </select>
            </label>
            <label className="tune-row tune-check-row">
              <input
                type="checkbox"
                className="tune-check"
                checked={forceAutoWave}
                onChange={(e) => updateForceAutoWave(e.target.checked)}
                aria-label="Force the original auto-wave sweep on a fresh cold open"
              />
              <span className="tune-name tune-check-name">
                Force Auto-Wave on Cold Open
              </span>
              <span className="tune-check-hint">
                Off = invitation pulse (default). On = auto-sweep into the Quick
                Executive Brief.
              </span>
            </label>
            <label className="tune-row tune-check-row">
              <input
                type="checkbox"
                className="tune-check"
                checked={scrollStart}
                onChange={(e) => updateScrollStart(e.target.checked)}
                aria-label="Start the first-visit auto-wave only after the visitor scrolls"
              />
              <span className="tune-name tune-check-name">
                Start auto-wave on scroll
              </span>
              <span className="tune-check-hint">
                Applies only when Auto-Wave is on — holds in the Full Narrative
                View until first scroll.
              </span>
            </label>
            <button
              type="button"
              className="tune-firstvisit"
              onClick={resetFirstVisit}
            >
              <span aria-hidden="true">🔄</span> Reset First Visit State
            </button>
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
