import Link from "next/link";

export default function BackLink() {
  return (
    <Link href="/" className="glass-keycap" aria-label="Back to portfolio">
      <span aria-hidden="true">←</span> Portfolio
    </Link>
  );
}
