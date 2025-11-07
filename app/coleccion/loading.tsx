export default function Loading() {
  return (
    <div className="min-h-screen bg-black pb-24 md:pb-8 md:pt-24">
      <section className="relative py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-12 bg-zinc-800 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-zinc-800 rounded w-48 mx-auto animate-pulse"></div>
          </div>

          {/* Search Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="h-14 bg-zinc-900 rounded-lg animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-10 w-32 bg-zinc-900 rounded animate-pulse"></div>
              <div className="h-10 w-48 bg-zinc-900 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-zinc-800"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-20"></div>
                  <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-800 rounded w-full"></div>
                  <div className="h-8 bg-zinc-800 rounded w-24"></div>
                  <div className="h-12 bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
