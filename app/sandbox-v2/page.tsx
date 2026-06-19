import SandboxV2 from "./SandboxExperience";

// The experience now also powers the live root (/). This route is retained as
// a noindex mirror (see layout.tsx) for continuity and quick comparison.
export default function SandboxV2Page() {
  return <SandboxV2 />;
}
