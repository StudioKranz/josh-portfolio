import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="text-[13px] text-muted transition-colors hover:text-ink"
    >
      ← Back
    </Link>
  );
}
