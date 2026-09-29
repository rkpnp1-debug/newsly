"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Newspaper, Trophy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getPoints } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [points, setPoints] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPoints(getPoints().total);

    // Listen for points updates
    const handler = () => setPoints(getPoints().total);
    window.addEventListener("newsly-points-updated", handler);
    return () => window.removeEventListener("newsly-points-updated", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Newspaper className="h-6 w-6 text-primary" />
            <span>Newsly</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Points Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" />
            <span>{mounted ? points : 0}</span>
            <span className="hidden sm:inline text-xs opacity-70">pts</span>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-2">
          <Link
            href="/"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}