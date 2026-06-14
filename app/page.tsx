import Link from "next/link";
import Container from "@/components/Container";
import MaturityTag from "@/components/MaturityTag";
import SiteFooter from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <Container className="pt-20 sm:pt-28">
      <header>
        <h1 className="text-[40px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[46px]">
          Josh Rosenkranz
        </h1>
        <p className="mt-3 text-[15px] font-medium text-muted">
          Apple technologist and experience systems designer
        </p>
        <p className="mt-7 max-w-[34rem] text-[19px] leading-8 text-ink sm:text-[21px]">
          I turn long-term human observation into prototypeable experience
          systems — across visionOS, AI continuity, and the web.
        </p>
        <p className="mt-5 max-w-[40rem] text-[13px] leading-6 text-faint">
          AI-driven interaction · spatial presence · emotional context and
          consent · agentic workflows · multimodal prototyping
        </p>
      </header>

      <h2 className="mt-20 text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
        Selected work
      </h2>
      <ul className="mt-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group flex items-center gap-5 border-t border-line py-6"
            >
              <div className="flex h-[78px] w-[120px] flex-none items-center justify-center rounded-md bg-surface text-[10px] tracking-wide text-faint">
                {p.thumbLabel}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-medium text-ink underline-offset-4 group-hover:underline">
                  {p.name}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-muted">
                  {p.summary}
                </p>
              </div>
              <div className="hidden flex-none sm:block">
                <MaturityTag maturity={p.maturity} label={p.maturityLabel} />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <SiteFooter />
    </Container>
  );
}
