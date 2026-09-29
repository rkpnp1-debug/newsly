"use client";

import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "top", label: "Top Stories" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
            active === cat.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}