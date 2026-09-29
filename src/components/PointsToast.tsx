"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

export function PointsToast() {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setAmount(e.detail?.earned || 0);
      setVisible(true);
      setTimeout(() => setVisible(false), 2200);
    };

    window.addEventListener("newsly-points-earned" as any, handler as any);
    return () => window.removeEventListener("newsly-points-earned" as any, handler as any);
  }, []);

  if (!visible || amount <= 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-primary-foreground shadow-lg">
        <Trophy className="h-4 w-4" />
        <span className="font-semibold">+{amount} points!</span>
      </div>
    </div>
  );
}