import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pb-16 pt-6 text-[13px] text-muted">
      <Link href="/" className="transition-colors hover:text-ink">
        Work
      </Link>
      <Link href="/how-i-work" className="transition-colors hover:text-ink">
        How I work
      </Link>
      <Link href="/why" className="transition-colors hover:text-ink">
        Why this work
      </Link>
      <a href="/Josh_Rosenkranz_Resume.pdf" className="transition-colors hover:text-ink">
        Résumé
      </a>
      <a href="mailto:joshrosenkranz@mac.com" className="transition-colors hover:text-ink">
        joshrosenkranz@mac.com
      </a>
      <a
        href="https://www.linkedin.com/in/joshrosenkranz/"
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-ink"
      >
        LinkedIn
      </a>
    </footer>
  );
}
