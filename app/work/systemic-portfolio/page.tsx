import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Systemic Portfolio Engine — Josh Rosenkranz",
  description:
    "An adaptive portfolio platform that reshapes project evidence around reviewer intent — one project database feeding a detailed narrative view and a compact executive brief.",
};

export default function SystemicPortfolio() {
  return (
    <CaseStudy
      name="Systemic Portfolio Engine"
      tagline="Engineering an adaptive canvas for executive judgment."
      maturity="deployed"
      maturityLabel="Production Preview"
    >
      <Section label="The intent">
        <p>
          A portfolio should not only describe the work. It should behave like
          proof of the work. This system was designed to help different reviewers
          quickly find the evidence that matters to them, whether they care most
          about product judgment, technical execution, invention, leadership, or
          creative range.
        </p>
      </Section>

      <Section label="The architecture">
        <p>
          The platform is structured around a single project database that feeds
          multiple renderers. A detailed narrative view preserves chronology and
          context, while an executive brief view reorganizes the same source
          material into a faster, higher signal path. Audience lenses adjust
          emphasis without duplicating content.
        </p>
      </Section>

      <Section label="The interface">
        <p>
          The visual system uses restrained glass layers, tactile controls,
          responsive grids, and motion details to make the site feel intentional
          without overwhelming the content. The goal is to create a premium
          interface that still reads quickly on a hiring manager&rsquo;s first
          pass.
        </p>
      </Section>

      <Section label="The lesson">
        <p>
          The strongest version of this portfolio is not a static archive. It is
          a working product surface that demonstrates how I structure ambiguity,
          prototype ideas, and translate complex experience into something
          another person can evaluate quickly.
        </p>
      </Section>
    </CaseStudy>
  );
}
