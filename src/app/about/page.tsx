import { Linkedin, Newspaper, Trophy, Clock, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About — Newsly",
  description: "Learn about Newsly and its creator.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Newspaper className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Newsly</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A beautifully designed news reader that rewards focused reading instead of endless scrolling.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Most news apps are designed to keep you scrolling forever. Newsly is different.
            We believe reading should feel calm, intentional, and rewarding. That’s why we
            built a clean interface and a points system that gives you credit for the time
            you actually spend reading — not just clicking.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Reading Time</h3>
              <p className="text-sm text-muted-foreground">
                Earn points for every 30 seconds you spend focused on an article.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Clicks</h3>
              <p className="text-sm text-muted-foreground">
                Get +2 points every time you open an article. Simple and fair.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Your Score</h3>
              <p className="text-sm text-muted-foreground">
                Track your points locally (or in the cloud when logged in).
              </p>
            </div>
          </div>
        </section>

        {/* Creator */}
        <section className="rounded-2xl border bg-card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Created by</h2>
          <p className="text-muted-foreground mb-6">
            Newsly was built by <strong>RKP</strong> — a developer who cares about clean design,
            great UX, and tools that respect your attention.
          </p>
          <a
            href="https://www.linkedin.com/in/rkpnp1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-white font-medium hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            Connect on LinkedIn
          </a>
        </section>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            ← Back to news
          </Link>
        </div>
      </div>
    </div>
  );
}