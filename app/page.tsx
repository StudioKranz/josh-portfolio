// Live root — promoted from the hardened /sandbox-v2 architecture (Phase 5.0).
// The previous flat homepage is preserved at /legacy-home as a rollback point.
// sandbox.css is scoped entirely under `.sbx`, so importing it here is safe.
import "./sandbox-v2/sandbox.css";
import SandboxV2 from "./sandbox-v2/SandboxExperience";

export default function Home() {
  return <SandboxV2 />;
}
