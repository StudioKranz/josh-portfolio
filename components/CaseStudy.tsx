import type { ReactNode } from "react";
import type { Maturity } from "@/lib/projects";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import MaturityTag from "@/components/MaturityTag";
import SiteFooter from "@/components/SiteFooter";

export default function CaseStudy({
  name,
  eyebrow,
  tagline,
  maturity,
  maturityLabel,
  children,
}: {
  name: string;
  eyebrow?: string;
  tagline: string;
  maturity: Maturity;
  maturityLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Persistent universal glass header — fixed, centered, matches the
          sandbox control bar's placement for cross-site continuity. */}
      <div className="site-nav">
        <BackLink />
      </div>
      <Container className="pt-24">
        <header>
          <MaturityTag maturity={maturity} label={maturityLabel} />
          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight text-ink">
            {name}
          </h1>
          {eyebrow && (
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
              {eyebrow}
            </p>
          )}
          <p className="mt-2 text-[17px] text-muted">{tagline}</p>
        </header>
        {children}
        <SiteFooter />
      </Container>
    </>
  );
}
