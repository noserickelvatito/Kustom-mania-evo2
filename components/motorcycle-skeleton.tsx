export function MotorcycleSkeleton() {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-zinc-800 rounded-xl shadow-xl animate-pulse">
      {/* Image skeleton */}
      <div className="h-64 bg-zinc-800 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-zinc-800 rounded-full" />
          <div className="h-6 w-24 bg-zinc-800 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-8 bg-zinc-800 rounded mb-3 w-3/4" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-800 rounded w-5/6" />
        </div>

        {/* Price */}
        <div className="h-10 bg-zinc-800 rounded mb-6 w-1/2" />

        {/* Button */}
        <div className="h-12 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  )
}

export function MotorcycleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MotorcycleSkeleton key={i} />
      ))}
    </div>
  )
}
