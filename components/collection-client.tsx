"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal, Grid3x3, List, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PricingDisplay } from "@/components/pricing-display"
import type { Motorcycle } from "@/lib/types"

interface CollectionClientProps {
  motorcycles: (Motorcycle & { image: string | null })[]
  brands: string[]
  types: string[]
}

export function CollectionClient({ motorcycles, brands, types }: CollectionClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("display_order")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort motorcycles
  const filteredMotorcycles = useMemo(() => {
    const filtered = motorcycles.filter((moto) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        moto.name.toLowerCase().includes(searchLower) ||
        moto.description.toLowerCase().includes(searchLower) ||
        moto.engine.toLowerCase().includes(searchLower) ||
        moto.modifications.toLowerCase().includes(searchLower) ||
        moto.brand?.toLowerCase().includes(searchLower)

      // Brand filter
      const matchesBrand = selectedBrand === "all" || moto.brand === selectedBrand

      // Type filter
      const matchesType = selectedType === "all" || moto.motorcycle_type === selectedType

      // Status filter
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "available" && (!moto.status || moto.status === "stock")) ||
        moto.status === selectedStatus

      return matchesSearch && matchesBrand && matchesType && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return a.display_order - b.display_order
      }
    })

    return filtered
  }, [motorcycles, searchQuery, selectedBrand, selectedType, selectedStatus, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand("all")
    setSelectedType("all")
    setSelectedStatus("all")
    setSortBy("display_order")
  }

  const hasActiveFilters = searchQuery || selectedBrand !== "all" || selectedType !== "all" || selectedStatus !== "all"

  const getStatusBadge = (status: string | null) => {
    if (!status || status === "stock") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Disponible</Badge>
    }
    if (status === "reserved") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Reservada</Badge>
    }
    if (status === "sold") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vendida</Badge>
    }
    return null
  }

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-8 md:pt-24">
      <section className="relative py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-4 tracking-wider"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: "#b87333",
                textShadow: "0 0 30px rgba(184, 115, 51, 0.5)",
              }}
            >
              NUESTRA COLECCIÓN
            </h1>
            <p className="text-center text-gray-400 text-lg">
              {filteredMotorcycles.length} {filteredMotorcycles.length === 1 ? "motocicleta" : "motocicletas"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre, marca, motor, modificaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-[#b87333] focus:ring-[#b87333]"
              />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              {/* Quick Filters */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="display_order">Destacadas</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`${
                    viewMode === "grid"
                      ? "bg-[#b87333] border-[#b87333] text-white"
                      : "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`${
                    viewMode === "list"
                      ? "bg-[#b87333] border-[#b87333] text-white"
                      : "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Marca</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-black border-zinc-800 text-white">
                      <SelectValue placeholder="Todas las marcas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las marcas</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Tipo</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-black border-zinc-800 text-white">
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Disponibilidad</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-black border-zinc-800 text-white">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="available">Disponibles</SelectItem>
                      <SelectItem value="reserved">Reservadas</SelectItem>
                      <SelectItem value="sold">Vendidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-400">Filtros activos:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Búsqueda: {searchQuery}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {selectedBrand !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Marca: {selectedBrand}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedBrand("all")} />
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Tipo: {selectedType}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedStatus !== "all" && (
                  <Badge variant="secondary" className="bg-zinc-800 text-white">
                    Estado: {selectedStatus}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedStatus("all")} />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-[#b87333] hover:text-[#d4a574]"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Motorcycles Grid/List */}
          {filteredMotorcycles.length > 0 ? (
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"
              }
            >
              {filteredMotorcycles.map((moto) => (
                <div
                  key={moto.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-[#b87333]/30 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-[#b87333]/20 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-black/50 ${viewMode === "list" ? "w-80" : "h-64"}`}>
                    {moto.image ? (
                      <Image
                        src={moto.image || "/placeholder.svg"}
                        alt={moto.name}
                        fill
                        sizes={
                          viewMode === "list" ? "320px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">Sin imagen</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">{getStatusBadge(moto.status)}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    {/* Brand and Type */}
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {moto.brand && (
                        <Badge variant="outline" className="border-[#b87333]/50 text-[#b87333]">
                          {moto.brand}
                        </Badge>
                      )}
                      {moto.motorcycle_type && (
                        <Badge variant="outline" className="border-zinc-700 text-gray-400">
                          {moto.motorcycle_type}
                        </Badge>
                      )}
                      {moto.year && (
                        <Badge variant="outline" className="border-zinc-700 text-gray-400">
                          {moto.year}
                        </Badge>
                      )}
                    </div>

                    <h2
                      className="text-xl md:text-2xl font-bold mb-3 tracking-wide font-serif text-[#b87333]"
                      style={{
                        textShadow: "0 0 15px rgba(184, 115, 51, 0.4)",
                      }}
                    >
                      {moto.name}
                    </h2>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{moto.description}</p>

                    <div className="mb-6">
                      <PricingDisplay
                        priceARS={moto.price}
                        priceUSD={moto.price_usd}
                        offerPercentage={moto.offer_percentage}
                        size="small"
                      />
                    </div>

                    <Link
                      href={`/coleccion/${moto.slug}`}
                      className="block w-full py-3 px-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 relative overflow-hidden group/btn text-center border border-[#b87333] text-[#d4a574] hover:text-black"
                      style={{ minHeight: "44px" }}
                    >
                      <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                        VER DETALLES
                      </span>
                      <div className="absolute inset-0 bg-[#b87333] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                No se encontraron motocicletas con los filtros seleccionados.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-[#b87333] text-[#b87333] bg-transparent"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
