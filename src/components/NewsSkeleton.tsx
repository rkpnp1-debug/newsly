export function NewsSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card ${
        featured ? "md:col-span-2 md:flex" : ""
      }`}
    >
      <div
        className={`skeleton ${
          featured ? "md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[280px]" : "aspect-[16/10]"
        }`}
      />
      <div className={`p-5 space-y-3 ${featured ? "md:w-1/2" : ""}`}>
        <div className="h-3 w-24 skeleton rounded" />
        <div className="h-6 w-full skeleton rounded" />
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-4 w-5/6 skeleton rounded" />
      </div>
    </div>
  );
}

export function NewsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NewsSkeleton featured />
      <NewsSkeleton />
      <NewsSkeleton />
      <NewsSkeleton />
      <NewsSkeleton />
      <NewsSkeleton />
    </div>
  );
}