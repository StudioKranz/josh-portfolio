import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./sandbox.css";

// Isolated prototype route. Kept out of search indexes — this is an internal
// proof of concept, not part of the public portfolio yet.
export const metadata: Metadata = {
  title: "Sandbox · Multi-Renderer Engine (Phase 1)",
  description:
    "Isolated proof of concept for the perspective × renderer portfolio engine.",
  robots: { index: false, follow: false },
};

export default function SandboxLayout({ children }: { children: ReactNode }) {
  return children;
}
