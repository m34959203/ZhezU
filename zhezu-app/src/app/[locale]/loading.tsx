export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Skeleton Hero Section */}
      <div className="relative overflow-hidden bg-bg-light dark:bg-bg-dark px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-6 w-32 animate-pulse rounded-full bg-border-light dark:bg-border-dark" />
            <div className="mb-3 h-10 w-full max-w-xl animate-pulse rounded-lg bg-border-light dark:bg-border-dark sm:h-12" />
            <div className="mb-6 h-10 w-full max-w-md animate-pulse rounded-lg bg-border-light dark:bg-border-dark sm:h-12" />
            <div className="mb-2 h-5 w-full max-w-lg animate-pulse rounded bg-border-light dark:bg-border-dark" />
            <div className="mb-8 h-5 w-full max-w-sm animate-pulse rounded bg-border-light dark:bg-border-dark" />
            <div className="flex gap-4">
              <div className="h-12 w-36 animate-pulse rounded-xl bg-border-light dark:bg-border-dark" />
              <div className="h-12 w-36 animate-pulse rounded-xl bg-border-light dark:bg-border-dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Cards Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 h-8 w-48 animate-pulse rounded-lg bg-border-light dark:bg-border-dark" />
          <div className="h-4 w-72 animate-pulse rounded bg-border-light dark:bg-border-dark" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="premium-card overflow-hidden p-6"
            >
              <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-border-light dark:bg-border-dark" />
              <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-border-light dark:bg-border-dark" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-border-light dark:bg-border-dark" />
              <div className="mb-2 h-4 w-5/6 animate-pulse rounded bg-border-light dark:bg-border-dark" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-border-light dark:bg-border-dark" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
