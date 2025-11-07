export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b87333] mb-4"></div>
        <h2 className="text-2xl font-serif text-[#b87333] animate-pulse">Cargando...</h2>
      </div>
    </div>
  )
}
