import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://joshrosenkranz.info"),
  title: "Josh Rosenkranz — Apple technologist & experience systems designer",
  description:
    "I turn long-term human observation into prototypeable experience systems — across iOS, visionOS, AI continuity, and the web.",
  openGraph: {
    title: "Josh Rosenkranz",
    description:
      "Apple technologist and experience systems designer exploring AI-driven, spatial, emotional, and context-aware interaction.",
    url: "https://joshrosenkranz.info",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
