import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import AttuneDetail from "@/components/AttuneDetail";

export const metadata: Metadata = {
  title: "Attune — Josh Rosenkranz",
  description:
    "A design exploration for real-time tone controls, emotional consent, and gentle modes — the human side of emotionally-aware technology.",
};

export default function Attune() {
  return (
    <CaseStudy
      name="Attune"
      tagline="Tone, consent, and emotional bandwidth as first-class controls."
      maturity="exploration"
      maturityLabel="Design exploration"
    >
      <AttuneDetail />
    </CaseStudy>
  );
}
