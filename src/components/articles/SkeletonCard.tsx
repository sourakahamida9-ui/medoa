export function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden border border-[#DEDBD4] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e]">
      <div className="skeleton w-full aspect-[16/10]" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="flex items-center gap-2 pt-2">
          <div className="skeleton w-6 h-6 rounded-full" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="py-10 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-lg overflow-hidden">
            <div className="skeleton w-full aspect-[16/9]" />
            <div className="p-6 space-y-3">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-8 w-full rounded" />
              <div className="skeleton h-8 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e]">
                <div className="skeleton w-20 h-20 rounded shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-12 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonArticlePage() {
  return (
    <div className="py-12 lg:py-16 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-[820px] mx-auto px-6 space-y-6">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-10 w-full rounded" />
        <div className="skeleton h-10 w-3/4 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="flex items-center gap-3 py-5 border-t border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
          <div className="skeleton w-11 h-11 rounded-full" />
          <div className="space-y-2">
            <div className="skeleton h-3 w-32 rounded" />
            <div className="skeleton h-3 w-24 rounded" />
          </div>
        </div>
        <div className="skeleton w-full aspect-[16/9] rounded-lg" />
        <div className="space-y-4 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton h-4 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
